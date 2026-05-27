const Blog = require('../../models/Blog');
const Gallery = require('../../models/Gallery');
const Contact = require('../../models/Contact');

const getDashboardStats = async (req, res) => {
  try {
    const [totalBlogs, publishedBlogs, totalGallery, totalMessages, unreadMessages, recentBlogs, recentMessages] = await Promise.all([
      Blog.countDocuments(),
      Blog.countDocuments({ published: true }),
      Gallery.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ isRead: false }),
      Blog.find().sort({ createdAt: -1 }).limit(5).select('title category createdAt published'),
      Contact.find().sort({ createdAt: -1 }).limit(5).select('name email subject type createdAt isRead'),
    ]);
    res.json({
      success: true,
      data: { totalBlogs, publishedBlogs, totalGallery, totalMessages, unreadMessages, recentBlogs, recentMessages },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDashboardStats };
