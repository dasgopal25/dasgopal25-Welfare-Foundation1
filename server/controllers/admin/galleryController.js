const Gallery = require('../../models/Gallery');
const { uploadToCloudinary, deleteFromCloudinary } = require('../../utils/cloudinaryUpload');

const getAllImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addImage = async (req, res) => {
  try {
    const { title, titleBn, caption, captionBn, category, featured, order } = req.body;
    if (!req.file) return res.status(400).json({ success: false, message: 'Image is required' });
    const result = await uploadToCloudinary(req.file.buffer, 'gazipur-kismat/gallery');
    const image = await Gallery.create({ title, titleBn, caption, captionBn, image: result.secure_url, imagePublicId: result.public_id, category, featured: featured === 'true', order: order || 0 });
    res.status(201).json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateImage = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) return res.status(404).json({ success: false, message: 'Image not found' });
    const { title, titleBn, caption, captionBn, category, featured, order } = req.body;
    if (req.file) {
      if (galleryItem.imagePublicId) await deleteFromCloudinary(galleryItem.imagePublicId);
      const result = await uploadToCloudinary(req.file.buffer, 'gazipur-kismat/gallery');
      galleryItem.image = result.secure_url;
      galleryItem.imagePublicId = result.public_id;
    }
    galleryItem.title = title || galleryItem.title;
    galleryItem.titleBn = titleBn || galleryItem.titleBn;
    galleryItem.caption = caption || galleryItem.caption;
    galleryItem.captionBn = captionBn || galleryItem.captionBn;
    galleryItem.category = category || galleryItem.category;
    galleryItem.featured = featured === 'true';
    galleryItem.order = order || galleryItem.order;
    const updated = await galleryItem.save();
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) return res.status(404).json({ success: false, message: 'Image not found' });
    if (galleryItem.imagePublicId) await deleteFromCloudinary(galleryItem.imagePublicId);
    await galleryItem.deleteOne();
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllImages, addImage, updateImage, deleteImage };
