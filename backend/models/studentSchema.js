const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Student name is required'] 
  },
  rollNo: { 
    type: String, 
    required: [true, 'Roll number is required'], 
    unique: true 
  },
  className: { 
    type: String, 
    required: [true, 'Class is required'] 
  },
  section: { 
    type: String, 
    default: '' 
  },
  fatherName: { 
    type: String, 
    default: '' 
  },
  photo: {
    url: { type: String, default: '' },
    publicId: { type: String, default: '' }
  },
  subjects: [{
    name: { 
      type: String, 
      required: [true, 'Subject name is required'] 
    },
    maxMarks: { 
      type: Number, 
      required: [true, 'Maximum marks are required'], 
      min: [1, 'Maximum marks must be at least 1'] 
    },
    marksObtained: { 
      type: Number, 
      required: [true, 'Marks obtained are required'], 
      min: [0, 'Marks cannot be negative'] 
    },
    grade: { 
      type: String, 
      required: [true, 'Grade is required'] 
    }
  }],
  feesPaid: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Student", studentSchema);