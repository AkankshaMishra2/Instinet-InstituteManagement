const express = require('express');
const router = express.Router();
const { authenticateUser, isStaff } = require('../middleware/auth');
const announcementController = require('../controllers/announcementController');

// Staff creates announcement
router.get('/create', authenticateUser, isStaff, (req, res) => {
  res.render('createAnnouncement', { 
    user: req.user, 
    error: req.flash('error'),
    success: req.flash('success')
  });
});

router.post('/create', authenticateUser, isStaff, announcementController.createAnnouncement);

// All users view announcements
router.get('/', authenticateUser, announcementController.getAllAnnouncements);

// View single announcement
router.get('/:id', authenticateUser, announcementController.getAnnouncement);

module.exports = router;
