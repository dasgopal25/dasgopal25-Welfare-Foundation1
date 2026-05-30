const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  email:         { type: String, required: true },
  phone:         { type: String, default: '' },
  subject:       { type: String, default: '' },
  message:       { type: String, required: true },
  type:          { type: String, enum: ['contact', 'join'], default: 'contact' },
  volunteerRole: { type: String, default: '' },
  address:       { type: String, default: '' },
  isRead:        { type: Boolean, default: false },
  isReplied:     { type: Boolean, default: false },
}, { timestamps: true });

// ── Unique validation only for type = 'join' ──────────────────────────────
contactSchema.pre('save', async function (next) {
  if (this.type !== 'join') return next(); // contact type → no check

  const existing = await this.constructor.findOne({
    type: 'join',
    $or: [
      { email: this.email.toLowerCase().trim() },
      ...(this.phone ? [{ phone: this.phone.trim() }] : []),
    ],
  });

  if (existing) {
    const field = existing.email === this.email.toLowerCase().trim() ? 'email' : 'phone number';
    const err = new Error(`This ${field} has already submitted a join application.`);
    err.statusCode = 409;
    return next(err);
  }

  // Normalize before saving
  this.email = this.email.toLowerCase().trim();
  if (this.phone) this.phone = this.phone.trim();

  next();
});

module.exports = mongoose.model('Contact', contactSchema);