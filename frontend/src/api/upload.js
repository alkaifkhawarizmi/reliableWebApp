import axios from 'axios';

const BASE_URL = import.meta.env;

export async function uploadMedia(data) {

  try {

    const formData = new FormData();
    formData.append("mediaType", data.mediaType);
    formData.append("title", data.title);
    
    if (data.image) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (allowedTypes.includes(data.image.type)) {
        formData.append("file", data.image);
      } else {
        throw new Error("Invalid file type. Only PNG, JPEG, and JPG are allowed.");
      }
    }

    const res = await axios.post(BASE_URL.VITE_BASE_ADMIN_UPLOAD, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteMedia(id){
  console.log(id)
  try {
    const res = await axios.delete(`${BASE_URL.VITE_BASE_ADMIN_DELETE_MEDIA}/${id}`)
    if(res){
      return true
    } else {
      return false
    }
  } catch (error) {
    
  }
}

export const uploadStudentResult = async (studentData) => {
  try {
    // Validate required fields
    const requiredFields = [
      'name', 
      'rollNo', 
      'className', 
      'section',
      'fatherName',
      'motherName'
    ];
    
    const missingFields = requiredFields.filter(field => !studentData[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Validate subjects
    if (!studentData.subjects || studentData.subjects.length === 0) {
      throw new Error('At least one subject is required');
    }

    // Validate each subject
    const subjectErrors = [];
    studentData.subjects.forEach((subject) => {
      if (!subject.name) {
        subjectErrors.push(`Subject name is required`);
      }
      if (!subject.annualExam || 
          subject.annualExam.obtained === undefined || 
          subject.annualExam.obtained === "" ||
          subject.annualExam.total === undefined || 
          subject.annualExam.total === "") {
        subjectErrors.push(`${subject.name}: Annual exam marks are required`);
      }
      if (isNaN(parseFloat(subject.annualExam.obtained))) {
        subjectErrors.push(`${subject.name}: Obtained marks must be a number`);
      }
      if (isNaN(parseFloat(subject.annualExam.total))) {
        subjectErrors.push(`${subject.name}: Total marks must be a number`);
      }
    });

    if (subjectErrors.length > 0) {
      throw new Error(subjectErrors.join('\n'));
    }

    // Prepare FormData
    const formData = new FormData();
    
    // Append student information
    formData.append('name', studentData.name);
    formData.append('rollNo', studentData.rollNo);
    formData.append('className', studentData.className);
    formData.append('section', studentData.section);
    formData.append('fatherName', studentData.fatherName);
    formData.append('motherName', studentData.motherName);
    formData.append('dob', studentData.dob || '');
    formData.append('totalPresentDays', studentData.totalPresentDays || 0);
    formData.append('promotedToNextClass', studentData.promotedToNextClass || false);
    formData.append('feesPaid', studentData.feesPaid || false);
    
    // Handle photo upload
    if (studentData.photo) {
      formData.append('photo', studentData.photo);
    }

    // Process subjects data
    const processedSubjects = studentData.subjects.map(subject => ({
      name: subject.name,
      annualExam: {
        obtained: parseFloat(subject.annualExam.obtained) || 0,
        total: parseFloat(subject.annualExam.total) || 0
      },
      grade: subject.grade || calculateGrade(subject.annualExam.obtained)
    }));
    formData.append('subjects', JSON.stringify(processedSubjects));

    // Process co-scholastic areas
    const processedCoScholasticAreas = studentData.coScholasticAreas || [];
    formData.append('coScholasticAreas', JSON.stringify(processedCoScholasticAreas));

    // Make API request
    const response = await axios.post(
      import.meta.env.VITE_BASE_ADMIN_UPLOAD_RESULT,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem('token')}` // Add if needed
        },
        withCredentials: true // Add if needed
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to upload result');
    }

    return {
      success: true,
      data: response.data,
      message: 'Result uploaded successfully'
    };

  } catch (error) {
    console.error('Error uploading result:', error);
    
    // Enhanced error handling
    let errorMessage = 'Failed to upload student result';
    
    if (error.response) {
      // Server responded with error status
      errorMessage = error.response.data.message || 
                    error.response.statusText || 
                    `Server error: ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'No response from server. Please check your connection.';
    } else if (error.message) {
      // Custom validation errors
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
      error: error.response?.data || null
    };
  }
};

export const createAnnouncement = async (formData) => {
  try {
    const response = await axios.post(BASE_URL.VITE_BASE_ADMIN_UPLOAD_ANNOUCEMENT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create announcement');
  }
};

export const getActiveAnnouncements = async () => {
  try {
    const response = await axios.get(BASE_URL.VITE_BASE_ADMIN_GET_ANNOUCEMENT);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch announcements');
  }
};

export const getContacts = async () => {
  try {
    const response = await axios.get(BASE_URL.VITE_BASE_ADMIN_GET_CONTACTS);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch contacts');
  }
};

export const submitContactForm = async (contactData) => {
  try {
    const response = await fetch(BASE_URL.VITE_BASE_ADMIN_CONTACT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Failed to submit contact form');

    return { success: true, data };
  } catch (error) {
    console.error('Contact form error:', error.message);
    return { success: false, message: error.message };
  }
};
