const Blog = require('../../models/Blog');

const getPublicBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 9, category, search } = req.query;
    const query = { published: true };
    if (category && category !== 'all') query.category = category;
    if (search) query.$or = [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query).populate('author', 'name').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)).select('-content -contentBn');
    res.json({ success: true, data: blogs, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true }).populate('author', 'name');
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    blog.views += 1;
    await blog.save();
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getFeaturedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true, featured: true }).populate('author', 'name').sort({ createdAt: -1 }).limit(3).select('-content -contentBn');
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getLatestBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).populate('author', 'name').sort({ createdAt: -1 }).limit(6).select('-content -contentBn');
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getPublicBlogs, getBlogBySlug, getFeaturedBlogs, getLatestBlogs };
