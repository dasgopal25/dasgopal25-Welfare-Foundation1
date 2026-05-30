const Video = require('../../models/Video');

const getPublicVideos = async (req, res) => {
  try {
    const { featured } = req.query;
    const query = { published: true };
    if (featured === 'true') query.featured = true;
    const videos = await Video.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getPublicVideos };