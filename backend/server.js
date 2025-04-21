const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./database/db');
const adminRoutes = require('./routes/adminRoutes');
const cloudinary = require('cloudinary').v2;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })) 

// Configure CORS properly (combine your two cors usages)
app.use(cors({
  origin: ['https://rpssuket.com','http://rpssuket.com'], // Frontend domains
  credentials: true
}));

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
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