const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  session: {type: String, default: () => {
    const currentYear = new Date().getFullYear();
    const prevYear = currentYear - 1;
    return `${prevYear}-${currentYear}`;
  }, },
  name: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  addmissionNo: {type: String},
  className: { type: String, required: true },
  section: { type: String, default: '' },
  fatherName: { type: String, required: true },
  motherName: { type: String, default: '' },
  dob: { type: Date },
  admissionNo: { type: String },
  
  // Attendance and School Days
  totalPresentDays: { type: Number, default: 0 },
  totalSchoolDays: { type: Number, required: true }, // 👈 New field
  attendancePercentage: { 
    type: Number, 
    default: function() { 
      return Math.round((this.totalPresentDays / this.totalSchoolDays) * 100) || 0 
    }
  },

  // Result Information
  resultDeclarationDate: { type: Date, required: true }, // 👈 New field
  promotedToNextClass: { type: Boolean, default: false },
  
  // Academic Performance
  subjects: [{
    name: { type: String, required: true },
    annualExam: {
      obtained: { type: Number, required: true }, // Changed from marksObtained to match your error
      total: { type: Number, required: true }    // Changed from totalMarks to match your error
    },
    grade: { type: String, required: true }
  }],
  
  // Co-curricular Activities
  coScholasticAreas: [{
    name: { type: String, required: true }, // Changed from 'area' to match your error
    grade: { type: String },
    remarks: { type: String }
  }],

  // Administrative
  photo: {
    url: { type: String },
    publicId: { type: String }
  },
  feesPaid: { type: Boolean, default: false },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { 
  timestamps: true // 👈 Auto-manage createdAt/updatedAt
});

// Auto-calculate attendance percentage before saving
studentSchema.pre('save', function(next) {
  if (this.isModified('totalPresentDays') || this.isModified('totalSchoolDays')) {
    this.attendancePercentage = Math.round((this.totalPresentDays / this.totalSchoolDays) * 100) || 0;
  }
  next();
});

module.exports = mongoose.model("Student", studentSchema); // 👈 Changed from "Admin" to "Student"