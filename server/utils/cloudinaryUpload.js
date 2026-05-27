const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (buffer, folder = 'gazipur-kismat') => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
};

const deleteFromCloudinary = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };
