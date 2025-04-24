const express = require('express');
const { 
  loginPrincipal, 
  registerAdmin, 
  verifyAdmin, 
  uploadMedia,
  getAllMedia,
  deleteMedia,
  uploadResult,
  getResult,
  getAllResults,
  createAnnouncement,
  getActiveAnnouncements,
  getContacts,
  submitContactForm,
  updateResult,
  deleteResult
} = require('../controllers/adminController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

const { mediaUpload, resultUpload , annoucementUpload , ResumeUpload } = require('../utils/multer');

// Admin authentication routes
router.post('/admin/login', loginPrincipal);
router.post('/admin/register', registerAdmin);

// Media management routes
router.post('/admin/upload', mediaUpload.single('file'), uploadMedia);
router.get('/admin/allmedia', getAllMedia);
router.delete('/admin/media/delete/:id', deleteMedia);

// Student result routes
router.post('/admin/upload/result', resultUpload.single('photo'), uploadResult);
router.get('/fetch/result/:id', getResult);
router.get('/fetch/all/results', getAllResults);
router.put('/update/result/:id' , updateResult)
router.delete('/delete/result/:id' , deleteResult)


router.post('/admin/upload/annoucement', annoucementUpload.single('attachment') , createAnnouncement);
router.get('/annoucements', getActiveAnnouncements);

router.post('/contact', submitContactForm);
router.get('/admin/contacts', getContacts);

module.exports = router;