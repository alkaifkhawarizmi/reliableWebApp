const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  vacancyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vacancy', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  resume: { type: String, required: true },
  coverLetter: { type: String },
  status: { type: String, enum: ['pending', 'reviewed', 'rejected', 'shortlisted'], default: 'pending' },
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);