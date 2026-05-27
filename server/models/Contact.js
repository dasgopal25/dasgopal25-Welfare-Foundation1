const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  type: { type: String, enum: ['contact', 'join'], default: 'contact' },
  volunteerRole: { type: String, default: '' },
  address: { type: String, default: '' },
  isRead: { type: Boolean, default: false },
  isReplied: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
