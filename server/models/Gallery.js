const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleBn: { type: String, default: '' },
  caption: { type: String, default: '' },
  captionBn: { type: String, default: '' },
  image: { type: String, required: true },
  imagePublicId: { type: String, default: '' },
  category: { type: String, default: 'general' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
