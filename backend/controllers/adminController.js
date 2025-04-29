const Student = require('../models/studentSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;
const Media = require('../models/Media');
const Announcement = require('../models/annoucementSchema');
const Contact = require('../models/Contact');
const { default: RecentActivity } = require('../models/recentActivity');


// Constants
const SALT_ROUNDS = 10;
const TOKEN_EXPIRY = '8h';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Utility functions
const removeSensitiveData = (admin) => {
  const adminData = admin.toObject();
  delete adminData.password;
  delete adminData.__v;
  return adminData;
};

const handleError = (res, error, context) => {
  console.error(`${context} error:`, error);
  return res.status(500).json({
    success: false,
    msg: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
};

// Admin Auth Controllers
const registerAdmin = async (req, res) => {
  try {
    // Validate request using express-validator

    const { userName, password, email } = req.body;

    // Check for existing admin
    const existingAdmin = await Admin.findOne({ 
      $or: [{ userName }, { email }] 
    });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        msg: "Admin with this username or email already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new admin
    const newAdmin = new Admin({
      userName,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    await newAdmin.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newAdmin._id, role: newAdmin.role },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    return res.status(201).json({
      success: true,
      msg: "Admin registered successfully",
      token,
      admin: removeSensitiveData(newAdmin)
    });

  } catch (error) {
    return handleError(res, error, "Registration");
  }
};

const loginPrincipal = async (req, res) => {
  try {

    const { userName, password } = req.body;

    if(!userName || !password){
      return res.status(400).json({
        success:false,
        msg:"all fields required"
      })
    }

    // Find admin with password
    const admin = await Admin.findOne({ userName }).select('+password');
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        msg: "Invalid credentials"
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        msg: "Invalid credentials"
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    const activity = new RecentActivity({
      description : "Principal Logged in"
    })

    await activity.save();

    return res.status(200).json({
      success: true,
      msg: "Login successful",
      token,
      admin: removeSensitiveData(admin)
    });

  } catch (error) {
    return handleError(res, error, "Login");
  }
};

const verifyAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        msg: "Admin not found"
      });
    }

    return res.status(200).json({
      success: true,
      admin: removeSensitiveData(admin)
    });

  } catch (error) {
    return handleError(res, error, "Admin verification");
  }
};

// Media Controllers
const uploadMedia = async (req, res) => {
  // Validate required fields first
  const { mediaType, title } = req.body;
  if (!mediaType || !title) {
    return res.status(400).json({
      success: false,
      msg: 'mediaType and title are required'
    });
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      msg: 'No file uploaded'
    });
  }

  // Get the correct local file path (not Cloudinary URL)
  const tempFilePath = req.file.path;

  try {
    // Validate file size
    if (req.file.size > MAX_FILE_SIZE) {
      await fs.unlink(tempFilePath);
      return res.status(400).json({
        success: false,
        msg: 'File size exceeds limit'
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      resource_type: "auto"
    });

    // Save to DB - make sure field names match your Media model
    const newMedia = await Media.create({ 
      mediaType, 
      title, 
      imageUrl: result.secure_url, // Changed from 'url' to 'imageUrl'
      publicId: result.public_id,
      format: result.format,
      size: result.bytes
    });

    // Clean up ONLY the local temp file
    // await fs.unlink(tempFilePath).catch(err => {
    //   console.error('Temp file deletion warning:', err.message);
    // });

    const activity = new RecentActivity({
      description : "Principal Uploaded Media"
    })

    await activity.save();

    return res.status(201).json({
      success: true,
      msg: 'Media uploaded successfully',
      media: newMedia
    });

  } catch (error) {
    // Clean up ONLY if local temp file exists
    if (tempFilePath && tempFilePath.startsWith('uploads/')) { // Adjust this path check to match your temp file location
      await fs.unlink(tempFilePath).catch(err => {
        console.error('Temp file cleanup warning:', err.message);
      });
    }
    
    console.error('Upload error:', error.message);
    return res.status(500).json({
      success: false,
      msg: 'Failed to upload media',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      msg: "Media fetched successfully",
      count: media.length,
      media
    });

  } catch (error) {
    return handleError(res, error, "Fetching media");
  }
};

const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);

    if (!media) {
      return res.status(404).json({
        success: false,
        msg: "Media not found"
      });
    }

    // Delete from Cloudinary first
    await cloudinary.uploader.destroy(media.publicId);

    // Then delete from database
    await Media.findByIdAndDelete(id);

    const activity = new RecentActivity({
      description : "Principal Deleted Media"
    })

    await activity.save();

    return res.status(200).json({
      success: true,
      msg: "Media deleted successfully"
    });

  } catch (error) {
    return handleError(res, error, "Deleting media");
  }
};

const uploadResult = async (req, res) => {
  try {
    const {
      name,
      rollNo,
      className,
      section,
      fatherName,
      motherName,
      dob,
      totalPresentDays,
      promotedToNextClass,
      feesPaid,
      subjects,
      coScholasticAreas
    } = req.body;

    const tempFilePath = req.file?.path;
    if (!tempFilePath) {
      return res.status(400).json({
        success: false,
        msg: 'No file uploaded'
      });
    }

    const cloudinaryResult = await cloudinary.uploader.upload(tempFilePath, {
      folder: 'student-photos',
      resource_type: 'auto'
    });

    // Remove halfYearly from each subject (if passed by frontend)
    const sanitizedSubjects = subjects.map(sub => ({
      name: sub.name,
      annualExam: sub.annualExam,
      grade: sub.grade
    }));

    const studentData = {
      name,
      rollNo,
      className,
      section,
      fatherName,
      motherName,
      dob: dob ? new Date(dob) : null,
      totalPresentDays: totalPresentDays ? parseInt(totalPresentDays) : 0,
      promotedToNextClass: promotedToNextClass === 'true',
      feesPaid,
      subjects: sanitizedSubjects,
      coScholasticAreas: coScholasticAreas || [],
      photo: {
        url: cloudinaryResult.secure_url,
        publicId: cloudinaryResult.public_id
      }
    };

    const student = await Student.create(studentData);

    const activity = new RecentActivity({
      description: `Principal uploaded result for rollNo: ${rollNo}`
    });
    await activity.save();

    return res.status(201).json({
      success: true,
      msg: 'Result uploaded successfully',
      student
    });

  } catch (error) {
    if (req.file?.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {
        console.error('Error deleting temp file:', e);
      }
    }

    console.error('Error uploading result:', error);
    return res.status(500).json({
      success: false,
      msg: 'Failed to upload student result'
    });
  }
};
   

const getResult = async (req, res) => {
  try {

    const student = await Student.findOne({ rollNo: req.params.id });
    
    if (!student) {
      return res.status(404).json({
        success: false,
        msg: "Student result not found"
      });
    }

    return res.status(200).json({
      success: true,
      student
    });

  } catch (error) {
    return handleError(res, error, "Fetching result");
  }
};

const getAllResults = async (req, res) => {
  try {
    const { page = 1, limit = 10, className, sortBy = 'name', sortOrder = 'asc' } = req.query;
    
    const query = {};
    if (className) query.className = className;

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const results = await Student.find(query)
      .sort(sortOptions)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Student.countDocuments(query);

    return res.status(200).json({
      success: true,
      count: results.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      results
    });

  } catch (error) {
    return handleError(res, error, "Fetching all results");
  }
};

const updateResult = async (req, res) => {
  try {
    // Remove halfYearly if present in body
    if (req.body.subjects && Array.isArray(req.body.subjects)) {
      req.body.subjects = req.body.subjects.map(sub => ({
        name: sub.name,
        annualExam: sub.annualExam,
        grade: sub.grade
      }));
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        msg: "Student not found"
      });
    }

    const activity = new RecentActivity({
      description: `Principal updated result of student ID: ${req.params.id}`
    });

    await activity.save();

    return res.status(200).json({
      success: true,
      msg: "Result updated successfully",
      student
    });

  } catch (error) {
    console.error("Error updating result:", error);
    return res.status(500).json({
      success: false,
      msg: "Failed to update student result"
    });
  }
};


const deleteResult = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        msg: "Student not found"
      });
    }

    const activity = new RecentActivity({
      description : `Principal Deleted a result of ${req.params.id}`
    })

    await activity.save();

    return res.status(200).json({
      success: true,
      msg: "Result deleted successfully"
    });

  } catch (error) {
    return handleError(res, error, "Deleting result");
  }
};


const createAnnouncement = async (req, res) => {
  try {
    const { title, description, isImportant, expiryDate } = req.body;
    let attachmentUrl = '';
    
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      attachmentUrl = result.secure_url;
      // Delete temp file
      // fs.unlinkSync(req.file.path);
    }

    const announcement = await Announcement.create({
      title,
      description,
      attachmentUrl,
      isImportant: isImportant === 'true',
      expiryDate: expiryDate || null,
      isActive: true
    });

    const activity = new RecentActivity({
      description : `Principal Created a Annoucement : ${title}`
    })

    await activity.save();

    res.status(201).json({
      success: true,
      data: announcement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getActiveAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({
      isActive: true,
      $or: [
        { expiryDate: null },
        { expiryDate: { $gte: new Date() } }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: announcements
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllActivity = async (req, res) => {
  try {
    
    const activity = await RecentActivity.find().sort();
    console.log(activity)

    return res.status(200).json({
      success: true,
      activity
    });

  } catch (error) {
    return handleError(res, error, "Fetching all results");
  }
};

module.exports = {
  loginPrincipal,
  registerAdmin,
  verifyAdmin,
  uploadMedia,
  const Admin = require('../models/admin');
const Student = require('../models/studentSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;
const Media = require('../models/Media');
const Announcement = require('../models/annoucementSchema');
const Contact = require('../models/Contact');
const { default: RecentActivity } = require('../models/recentActivity');


// Constants
const SALT_ROUNDS = 10;
const TOKEN_EXPIRY = '8h';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Utility functions
const removeSensitiveData = (admin) => {
  const adminData = admin.toObject();
  delete adminData.password;
  delete adminData.__v;
  return adminData;
};

const handleError = (res, error, context) => {
  console.error(`${context} error:`, error);
  return res.status(500).json({
    success: false,
    msg: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
};

// Admin Auth Controllers
const registerAdmin = async (req, res) => {
  try {
    // Validate request using express-validator

    const { userName, password, email } = req.body;

    // Check for existing admin
    const existingAdmin = await Admin.findOne({ 
      $or: [{ userName }, { email }] 
    });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        msg: "Admin with this username or email already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new admin
    const newAdmin = new Admin({
      userName,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    await newAdmin.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newAdmin._id, role: newAdmin.role },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    return res.status(201).json({
      success: true,
      msg: "Admin registered successfully",
      token,
      admin: removeSensitiveData(newAdmin)
    });

  } catch (error) {
    return handleError(res, error, "Registration");
  }
};

const loginPrincipal = async (req, res) => {
  try {

    const { userName, password } = req.body;

    if(!userName || !password){
      return res.status(400).json({
        success:false,
        msg:"all fields required"
      })
    }

    // Find admin with password
    const admin = await Admin.findOne({ userName }).select('+password');
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        msg: "Invalid credentials"
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        msg: "Invalid credentials"
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    const activity = new RecentActivity({
      description : "Principal Logged in"
    })

    await activity.save();

    return res.status(200).json({
      success: true,
      msg: "Login successful",
      token,
      admin: removeSensitiveData(admin)
    });

  } catch (error) {
    return handleError(res, error, "Login");
  }
};

const verifyAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        msg: "Admin not found"
      });
    }

    return res.status(200).json({
      success: true,
      admin: removeSensitiveData(admin)
    });

  } catch (error) {
    return handleError(res, error, "Admin verification");
  }
};

// Media Controllers
const uploadMedia = async (req, res) => {
  // Validate required fields first
  const { mediaType, title } = req.body;
  if (!mediaType || !title) {
    return res.status(400).json({
      success: false,
      msg: 'mediaType and title are required'
    });
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      msg: 'No file uploaded'
    });
  }

  // Get the correct local file path (not Cloudinary URL)
  const tempFilePath = req.file.path;

  try {
    // Validate file size
    if (req.file.size > MAX_FILE_SIZE) {
      await fs.unlink(tempFilePath);
      return res.status(400).json({
        success: false,
        msg: 'File size exceeds limit'
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      resource_type: "auto"
    });

    // Save to DB - make sure field names match your Media model
    const newMedia = await Media.create({ 
      mediaType, 
      title, 
      imageUrl: result.secure_url, // Changed from 'url' to 'imageUrl'
      publicId: result.public_id,
      format: result.format,
      size: result.bytes
    });

    // Clean up ONLY the local temp file
    // await fs.unlink(tempFilePath).catch(err => {
    //   console.error('Temp file deletion warning:', err.message);
    // });

    const activity = new RecentActivity({
      description : "Principal Uploaded Media"
    })

    await activity.save();

    return res.status(201).json({
      success: true,
      msg: 'Media uploaded successfully',
      media: newMedia
    });

  } catch (error) {
    // Clean up ONLY if local temp file exists
    if (tempFilePath && tempFilePath.startsWith('uploads/')) { // Adjust this path check to match your temp file location
      await fs.unlink(tempFilePath).catch(err => {
        console.error('Temp file cleanup warning:', err.message);
      });
    }
    
    console.error('Upload error:', error.message);
    return res.status(500).json({
      success: false,
      msg: 'Failed to upload media',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      msg: "Media fetched successfully",
      count: media.length,
      media
    });

  } catch (error) {
    return handleError(res, error, "Fetching media");
  }
};

const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);

    if (!media) {
      return res.status(404).json({
        success: false,
        msg: "Media not found"
      });
    }

    // Delete from Cloudinary first
    await cloudinary.uploader.destroy(media.publicId);

    // Then delete from database
    await Media.findByIdAndDelete(id);

    const activity = new RecentActivity({
      description : "Principal Deleted Media"
    })

    await activity.save();

    return res.status(200).json({
      success: true,
      msg: "Media deleted successfully"
    });

  } catch (error) {
    return handleError(res, error, "Deleting media");
  }
};


   

const getResult = async (req, res) => {
  try {

    const student = await Student.findOne({ rollNo: req.params.id });
    
    if (!student) {
      return res.status(404).json({
        success: false,
        msg: "Student result not found"
      });
    }

    return res.status(200).json({
      success: true,
      student
    });

  } catch (error) {
    return handleError(res, error, "Fetching result");
  }
};

const getAllResults = async (req, res) => {
  try {
    const { page = 1, limit = 10, className, sortBy = 'name', sortOrder = 'asc' } = req.query;
    
    const query = {};
    if (className) query.className = className;

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const results = await Student.find(query)
      .sort(sortOptions)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Student.countDocuments(query);

    return res.status(200).json({
      success: true,
      count: results.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      results
    });

  } catch (error) {
    return handleError(res, error, "Fetching all results");
  }
};

const updateResult = async (req, res) => {
  try {

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        msg: "Student not found"
      });
    }

    const activity = new RecentActivity({
      description : `Principal Updated result of ${req.params.id}`
    })

    await activity.save();

    return res.status(200).json({
      success: true,
      msg: "Result updated successfully",
      student
    });

  } catch (error) {
    return handleError(res, error, "Updating result");
  }
};

const deleteResult = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        msg: "Student not found"
      });
    }

    const activity = new RecentActivity({
      description : `Principal Deleted a result of ${req.params.id}`
    })

    await activity.save();

    return res.status(200).json({
      success: true,
      msg: "Result deleted successfully"
    });

  } catch (error) {
    return handleError(res, error, "Deleting result");
  }
};


const createAnnouncement = async (req, res) => {
  try {
    const { title, description, isImportant, expiryDate } = req.body;
    let attachmentUrl = '';
    
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      attachmentUrl = result.secure_url;
      // Delete temp file
      // fs.unlinkSync(req.file.path);
    }

    const announcement = await Announcement.create({
      title,
      description,
      attachmentUrl,
      isImportant: isImportant === 'true',
      expiryDate: expiryDate || null,
      isActive: true
    });

    const activity = new RecentActivity({
      description : `Principal Created a Annoucement : ${title}`
    })

    await activity.save();

    res.status(201).json({
      success: true,
      data: announcement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getActiveAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({
      isActive: true,
      $or: [
        { expiryDate: null },
        { expiryDate: { $gte: new Date() } }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: announcements
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllActivity = async (req, res) => {
  try {
    
    const activity = await RecentActivity.find().sort();
    console.log(activity)

    return res.status(200).json({
      success: true,
      activity
    });

  } catch (error) {
    return handleError(res, error, "Fetching all results");
  }
};

module.exports = {
  loginPrincipal,
  registerAdmin,
  verifyAdmin,
  uploadMedia,
  getAllMedia,
  deleteMedia,
  uploadResult,
  getResult,
  getAllResults,
  updateResult,
  deleteResult,
  createAnnouncement,
  getActiveAnnouncements,
  submitContactForm,
  getContacts,
  getAllActivity
};
getAllMedia,
  deleteMedia,
  uploadResult,
  getResult,
  getAllResults,
  updateResult,
  deleteResult,
  createAnnouncement,
  getActiveAnnouncements,
  submitContactForm,
  getContacts,
  getAllActivity
};
