const Contact = require('../../models/Contact');

const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message, type, volunteerRole, address } = req.body;
    const contact = await Contact.create({ name, email, phone, subject, message, type: type || 'contact', volunteerRole, address });
    res.status(201).json({ success: true, message: 'Message sent successfully!', data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { page = 1, limit = 20, type, isRead } = req.query;
    const query = {};
    if (type) query.type = type;
    if (isRead !== undefined) query.isRead = isRead === 'true';
    const total = await Contact.countDocuments(query);
    const messages = await Contact.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    res.json({ success: true, data: messages, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ success: true, message: 'Marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { submitContact, getMessages, markAsRead, deleteMessage };
