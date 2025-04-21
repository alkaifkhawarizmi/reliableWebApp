const multer = require('multer');
const cloudinary = require('../config/cloudnaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuration for media uploads
const mediaStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'media_uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 800, crop: 'limit' }],
    resource_type: 'auto'
  }
});

// Configuration for result uploads (student photos)
const resultStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'student_photos',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'fill' }],
    resource_type: 'auto'
  }
});

const annoucementStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'annoucement_uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 800, crop: 'limit' }],
    resource_type: 'auto'
  }
});

const ResumeStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'annoucement_uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 800, crop: 'limit' }],
    resource_type: 'auto'
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Create separate upload instances
exports.mediaUpload = multer({ 
  storage: mediaStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

exports.resultUpload = multer({ 
  storage: resultStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter
});

exports.annoucementUpload = multer({ 
  storage: annoucementStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

exports.ResumeUpload = multer({ 
  storage: ResumeStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});