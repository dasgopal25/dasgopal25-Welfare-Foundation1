const Settings = require('../../models/Settings');
const Gallery = require('../../models/Gallery');

const getPublicSettings = async (req, res) => {
  try {
    const settings = await Settings.find();
    const settingsObj = {};
    settings.forEach(s => { settingsObj[s.key] = s.value; });
    res.json({ success: true, data: settingsObj });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getGallery = async (req, res) => {
  try {
    const { featured } = req.query;
    const query = featured === 'true' ? { featured: true } : {};
    const images = await Gallery.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getPublicSettings, getGallery };
