const express = require('express');
const cors = require('cors');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
  /\.vercel\.app$/,
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.some(o =>
      o instanceof RegExp ? o.test(origin) : o === origin
    );
    allowed ? callback(null, true) : callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public Routes
app.use('/api/blogs',    require('./routes/public/blogRoutes'));
app.use('/api/contact',  require('./routes/public/contactRoutes'));
app.use('/api/settings', require('./routes/public/settingsRoutes'));
app.use('/api/videos',   require('./routes/public/videoRoutes'));

// Admin Routes
app.use('/api/admin/auth',      require('./routes/admin/authRoutes'));
app.use('/api/admin/blogs',     require('./routes/admin/blogRoutes'));
app.use('/api/admin/gallery',   require('./routes/admin/galleryRoutes'));
app.use('/api/admin/settings',  require('./routes/admin/settingsRoutes'));
app.use('/api/admin/dashboard', require('./routes/admin/dashboardRoutes'));
app.use('/api/admin/videos',    require('./routes/admin/videoRoutes'));

app.get('/api/health', (req, res) =>
  res.json({ status: 'OK', message: 'Server running', env: process.env.NODE_ENV })
);

app.use(notFound);
app.use(errorHandler);

module.exports = app;