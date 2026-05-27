const Settings = require('../../models/Settings');

const getSettings = async (req, res) => {
  try {
    const settings = await Settings.find();
    const settingsObj = {};
    settings.forEach(s => { settingsObj[s.key] = s.value; });
    res.json({ success: true, data: settingsObj });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSetting = async (req, res) => {
  try {
    const { key, value, group } = req.body;
    const setting = await Settings.findOneAndUpdate({ key }, { value, group: group || 'general' }, { upsert: true, new: true });
    res.json({ success: true, data: setting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateMultipleSettings = async (req, res) => {
  try {
    const { settings } = req.body;
    const updates = settings.map(({ key, value, group }) =>
      Settings.findOneAndUpdate({ key }, { value, group: group || 'general' }, { upsert: true, new: true })
    );
    await Promise.all(updates);
    res.json({ success: true, message: 'Settings updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSettings, updateSetting, updateMultipleSettings };
