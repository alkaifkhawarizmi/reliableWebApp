const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./database/db');
const adminRoutes = require('./routes/adminRoutes');
const cloudinary = require('cloudinary').v2;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })) 

// Configure CORS properly (combine your two cors usages


// Mount router
app.use('/api/v1/', adminRoutes);

// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Started`);
  connectDB().then(() => console.log('DB Connected!'));
});
