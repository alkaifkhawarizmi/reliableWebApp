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
    if (!studentData.name || !studentData.rollNo || !studentData.className) {
      throw new Error('Name, Roll Number, and Class are required');
    }

    // Validate subjects
    if (!studentData.subjects || studentData.subjects.length === 0) {
      throw new Error('At least one subject is required');
    }

    // Validate each subject
    const subjectErrors = [];
    studentData.subjects.forEach((subject, index) => {
      if (!subject.name || subject.marksObtained === undefined) {
        subjectErrors.push(`Subject ${index + 1}: Name and marks are required`);
      }
      if (subject.marksObtained > subject.maxMarks) {
        subjectErrors.push(`Subject ${subject.name}: Marks cannot exceed maximum`);
      }
    });

    if (subjectErrors.length > 0) {
      throw new Error(subjectErrors.join('\n'));
    }

    const formData = new FormData();
      formData.append('name', studentData.name);
      formData.append('rollNo', studentData.rollNo);
      formData.append('className', studentData.className);
      formData.append('section', studentData.section);
      formData.append('fatherName', studentData.fatherName);
      formData.append('feesPaid', studentData.feesPaid);
      
      if (studentData.photo) {
        formData.append('photo', studentData.photo.file);
      }

      formData.append('subjects', JSON.stringify(studentData.subjects));
    // Make API request
    const response = await axios.post(BASE_URL.VITE_BASE_ADMIN_UPLOAD_RESULT, formData ,  {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    
    return response.data;

  } catch (error) {

    console.error('Error uploading result:', error);

    return error
    
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
