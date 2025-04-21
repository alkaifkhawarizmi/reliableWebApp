const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./database/db');
const adminRoutes = require('./routes/adminRoutes');
const cloudinary = require('cloudinary').v2;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const allowedOrigins = [
  'http://rpssuket.com',
  'https://rpssuket.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Mount router
app.use('/api/v1/', adminRoutes);

// Handle SPA routing - must come after static files but before error handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB().then(() => console.log('DB Connected!'));
});