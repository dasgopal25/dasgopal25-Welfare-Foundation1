const Video = require('../../models/Video');

const extractYoutubeId = (url) => {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : '';
};

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createVideo = async (req, res) => {
  try {
    const { title, titleBn, description, descriptionBn, youtubeUrl, category, featured, published, order } = req.body;
    const youtubeId = extractYoutubeId(youtubeUrl || '');
    const thumbnail = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : '';
    const video = await Video.create({
      title, titleBn, description, descriptionBn, youtubeUrl, youtubeId,
      thumbnail, category, featured: featured === 'true' || featured === true,
      published: published !== 'false' && published !== false,
      order: order || 0,
    });
    res.status(201).json({ success: true, data: video });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ success: false, message: 'Video not found' });
    const { title, titleBn, description, descriptionBn, youtubeUrl, category, featured, published, order } = req.body;
    if (youtubeUrl) {
      video.youtubeUrl = youtubeUrl;
      video.youtubeId = extractYoutubeId(youtubeUrl);
      video.thumbnail = video.youtubeId ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg` : '';
    }
    video.title = title || video.title;
    video.titleBn = titleBn !== undefined ? titleBn : video.titleBn;
    video.description = description !== undefined ? description : video.description;
    video.descriptionBn = descriptionBn !== undefined ? descriptionBn : video.descriptionBn;
    video.category = category || video.category;
    video.featured = featured === 'true' || featured === true;
    video.published = published !== 'false' && published !== false;
    video.order = order !== undefined ? order : video.order;
    const updated = await video.save();
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllVideos, createVideo, updateVideo, deleteVideo };