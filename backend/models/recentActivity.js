import mongoose from 'mongoose';

const recentActivitySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const RecentActivity = mongoose.model('RecentActivity', recentActivitySchema);

export default RecentActivity;