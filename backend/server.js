const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./database/db');
const adminRoutes = require('./routes/adminRoutes')
const cloudinary = require('cloudinary').v2

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://rpssuket.com", // 👈 Allow your frontend domain
    credentials: true,
  })
);

// Mount router
app.use('/api/v1/', adminRoutes);  // ✅ This makes routes work

// Basic route
app.get('/', (req, res) => {
  res.send("MERN Backend Is Running");
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