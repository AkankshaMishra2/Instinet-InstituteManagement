const User = require('../models/User');
const Course = require('../models/courses');

exports.getAdminDashboard = async (req, res) => {
  const users = await User.find().select('-password');
  res.render('adminDashboard', { title: 'Admin Dashboard', user: req.user, users });
};

exports.getStaffDashboard = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).lean();
    for (let student of students) {
      if (student.studentDetails && student.studentDetails.department) {
        student.courses = await Course.find({ department: student.studentDetails.department }).lean();
      } else {
        student.courses = [];
      }
    }
    res.render('staffDashboard', {
      title: 'Staff Dashboard',
      user: req.user,
      students,
      error: req.flash('error'),
      success: req.flash('success')
    });
  } catch (err) {
    console.error('Error in getStaffDashboard:', err);
    req.flash('error', 'Error loading dashboard');
    res.redirect('/login');
  }
};

exports.getStudentDashboard = async (req, res) => {
  const department = req.user.studentDetails?.department;
  const courses = await Course.find({ department }).limit(4);
  res.render('studentDashboard', {
    title: 'Student Dashboard',
    user: req.user,
    courses
  });
}; 