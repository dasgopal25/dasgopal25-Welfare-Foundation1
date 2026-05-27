const Blog = require('../../models/Blog');
const { uploadToCloudinary, deleteFromCloudinary } = require('../../utils/cloudinaryUpload');

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Get all blogs (admin)
const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const query = {};
    if (category) query.category = category;
    if (search) query.$or = [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query).populate('author', 'name email').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    res.json({ success: true, data: blogs, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create blog
const createBlog = async (req, res) => {
  try {
    const { title, titleBn, description, descriptionBn, content, contentBn, category, featured, published, tags } = req.body;
    let image = '', imagePublicId = '';
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'gazipur-kismat/blogs');
      image = result.secure_url;
      imagePublicId = result.public_id;
    }
    const slug = slugify(title) + '-' + Date.now();
    const blog = await Blog.create({ title, titleBn, slug, description, descriptionBn, content, contentBn, image, imagePublicId, category, featured: featured === 'true', published: published !== 'false', tags: tags ? tags.split(',').map(t => t.trim()) : [], author: req.user._id });
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update blog
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    const { title, titleBn, description, descriptionBn, content, contentBn, category, featured, published, tags } = req.body;
    if (req.file) {
      if (blog.imagePublicId) await deleteFromCloudinary(blog.imagePublicId);
      const result = await uploadToCloudinary(req.file.buffer, 'gazipur-kismat/blogs');
      blog.image = result.secure_url;
      blog.imagePublicId = result.public_id;
    }
    blog.title = title || blog.title;
    blog.titleBn = titleBn || blog.titleBn;
    blog.description = description || blog.description;
    blog.descriptionBn = descriptionBn || blog.descriptionBn;
    blog.content = content || blog.content;
    blog.contentBn = contentBn || blog.contentBn;
    blog.category = category || blog.category;
    blog.featured = featured === 'true';
    blog.published = published !== 'false';
    if (tags) blog.tags = tags.split(',').map(t => t.trim());
    const updated = await blog.save();
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    if (blog.imagePublicId) await deleteFromCloudinary(blog.imagePublicId);
    await blog.deleteOne();
    res.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single blog (admin)
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllBlogs, createBlog, updateBlog, deleteBlog, getBlogById };
