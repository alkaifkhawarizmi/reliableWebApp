const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  className: { type: String, required: true },
  section: { type: String, default: '' },
  fatherName: { type: String, required: true },
  motherName: { type: String, default: '' },
  dob: { type: Date },
  admissionNo: { type: String },
  totalPresentDays: { type: Number, default: 0 },
  promotedToNextClass: { type: Boolean, default: false },
  photo: {
    url: { type: String },
    publicId: { type: String }
  },
  subjects: [{
    name: { type: String, required: true },
    halfYearly: {
      marksObtained: { type: Number },
      totalMarks: { type: Number } // Total marks for half-yearly
    },
    annualExam: {
      marksObtained: { type: Number, required: true },
      totalMarks: { type: Number } // Total marks for annual exam
    },
    grade: { type: String, required: true }
  }],
  coScholasticAreas: [{
    area: { type: String, required: true },
    grade: { type: String },
    remarks: { type: String }
  }],
  feesPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", studentSchema);
