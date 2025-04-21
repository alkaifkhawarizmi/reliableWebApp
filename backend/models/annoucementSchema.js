const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  attachmentUrl: { type: String },
  isImportant: { type: Boolean, default: false },
  expiryDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Announcement', announcementSchema);