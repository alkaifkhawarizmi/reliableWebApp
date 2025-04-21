require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Synchronous configuration (no need for async)
function configureCloudinary() {
  // Validate environment variables first
  if (!process.env.CLOUDINARY_CLOUD_NAME || 
      !process.env.CLOUDINARY_API_KEY || 
      !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Missing Cloudinary configuration in .env file');
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
    timeout: 60000,
  });

  console.log('Cloudinary configured for cloud:', cloudinary.config().cloud_name);
  return cloudinary;
}

// Immediately configure and export
module.exports = configureCloudinary();