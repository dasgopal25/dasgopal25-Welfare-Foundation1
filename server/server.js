require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const seedAdmin = async () => {
  try {
    const User = require('./models/User');
    const Settings = require('./models/Settings');

    const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existing) {
      await User.create({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL || 'admin@gazipurkismat.org',
        password: process.env.ADMIN_PASSWORD || 'Admin@123456',
        role: 'admin',
      });
      console.log('✅ Admin user created');
    }

    const defaultSettings = [
      { key: 'site_title',       value: 'Gazipur Kismat Welfare Foundation', group: 'general' },
      { key: 'site_title_bn',    value: 'গাজীপুর কিসমত ওয়েলফেয়ার ফাউন্ডেশন', group: 'general' },
      { key: 'site_description', value: 'A professional NGO dedicated to social service and human welfare', group: 'general' },
      { key: 'hero_title',       value: 'Serving Humanity with Compassion', group: 'hero' },
      { key: 'hero_title_bn',    value: 'মমতার সাথে মানবতার সেবা', group: 'hero' },
      { key: 'hero_subtitle',    value: 'Gazipur Kismat Welfare Foundation helps people through social service and human welfare activities.', group: 'hero' },
      { key: 'hero_subtitle_bn', value: 'গাজীপুর কিসমত ওয়েলফেয়ার ফাউন্ডেশন সামাজিক সেবা ও মানব কল্যাণ কার্যক্রমের মাধ্যমে মানুষকে সাহায্য করে।', group: 'hero' },
      { key: 'address',          value: 'Gazipur Kismat, Dantan, Paschim Medinipur, 721426', group: 'contact' },
      { key: 'email',            value: 'welfarefoundationgazipurkismat@gmail.com', group: 'contact' },
      { key: 'phone',            value: '+91 9002036590', group: 'contact' },
      { key: 'established_year', value: '2026', group: 'general' },
      { key: 'facebook_url',     value: '#', group: 'social' },
      { key: 'whatsapp_number',  value: '+91 9002036590', group: 'social' },
      // Theme setting — default: forest-green
      { key: 'active_theme',     value: 'forest-green', group: 'theme' },
    ];

    for (const setting of defaultSettings) {
      await Settings.findOneAndUpdate({ key: setting.key }, setting, { upsert: true });
    }
    console.log('✅ Default settings seeded');
  } catch (err) {
    console.error('Seed error:', err.message);
  }
};

connectDB().then(() => seedAdmin());

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;