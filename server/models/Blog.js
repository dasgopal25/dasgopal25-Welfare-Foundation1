const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleBn: { type: String, default: '' },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  descriptionBn: { type: String, default: '' },
  content: { type: String, required: true },
  contentBn: { type: String, default: '' },
  image: { type: String, default: '' },
  imagePublicId: { type: String, default: '' },
  category: { type: String, required: true, enum: ['news', 'events', 'social-work', 'education', 'donation', 'general'], default: 'general' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  tags: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
