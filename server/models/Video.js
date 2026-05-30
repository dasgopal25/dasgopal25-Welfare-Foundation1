const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleBn: { type: String, default: '' },
  description: { type: String, default: '' },
  descriptionBn: { type: String, default: '' },
  youtubeUrl: { type: String, default: '' },
  youtubeId: { type: String, default: '' },
  thumbnail: { type: String, default: '' },
  category: { type: String, default: 'general', enum: ['general','events','social-work','education','donation'] },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Auto-extract YouTube ID from URL before save
videoSchema.pre('save', function(next) {
  if (this.youtubeUrl) {
    const match = this.youtubeUrl.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (match) this.youtubeId = match[1];
  }
  next();
});

module.exports = mongoose.model('Video', videoSchema);