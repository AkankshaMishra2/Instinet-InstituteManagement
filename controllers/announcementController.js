const Announcement = require('../models/Announcement');

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, content } = req.body;
    await Announcement.create({
      title,
      content,
      createdBy: req.user._id
    });
    res.redirect('/staffDashboard'); // or wherever you want to redirect
  } catch (err) {
    res.render('createAnnouncement', { error: 'Failed to create announcement', user: req.user });
  }
};

exports.getAllAnnouncements = async (req, res) => {
  const announcements = await Announcement.find().sort({ createdAt: -1 }).populate('createdBy', 'firstName lastName');
  res.render('announcements', { user: req.user, announcements, title: 'Announcements' });
};

exports.getAnnouncement = async (req, res) => {
  const announcement = await Announcement.findById(req.params.id).populate('createdBy', 'firstName lastName');
  res.render('announcementDetail', { user: req.user, announcement, title: announcement.title });
};
