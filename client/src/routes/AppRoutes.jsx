import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

// Public
import Home       from '../pages/public/Home';
import OurWork    from '../pages/public/OurWork';
import Blogs      from '../pages/public/Blogs';
import BlogSingle from '../pages/public/BlogSingle';
import Gallery    from '../pages/public/Gallery';
import Videos     from '../pages/public/Videos';
import Contact    from '../pages/public/Contact';
import Join       from '../pages/public/Join';

// Admin
import Login         from '../pages/admin/Login';
import Dashboard     from '../pages/admin/Dashboard';
import ManageBlogs   from '../pages/admin/ManageBlogs';
import AddBlog       from '../pages/admin/AddBlog';
import EditBlog      from '../pages/admin/EditBlog';
import ManageGallery from '../pages/admin/ManageGallery';
import ManageVideos  from '../pages/admin/ManageVideos';
import Messages      from '../pages/admin/Messages';
import Settings      from '../pages/admin/Settings';
import ThemeManager  from '../pages/admin/ThemeManager';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="our-work"    element={<OurWork />} />
        <Route path="blogs"       element={<Blogs />} />
        <Route path="blogs/:slug" element={<BlogSingle />} />
        <Route path="gallery"     element={<Gallery />} />
        <Route path="videos"      element={<Videos />} />
        <Route path="contact"     element={<Contact />} />
        <Route path="join"        element={<Join />} />
      </Route>

      {/* Admin Login (no layout) */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute><AdminLayout /></ProtectedRoute>
      }>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="blogs"           element={<ManageBlogs />} />
        <Route path="blogs/add"       element={<AddBlog />} />
        <Route path="blogs/edit/:id"  element={<EditBlog />} />
        <Route path="gallery"         element={<ManageGallery />} />
        <Route path="videos"          element={<ManageVideos />} />
        <Route path="messages"        element={<Messages />} />
        <Route path="settings"        element={<Settings />} />
        <Route path="themes"          element={<ThemeManager />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={
        <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor:'var(--c-bg)' }}>
          <span className="text-8xl mb-4">🌿</span>
          <h1 className="font-display text-4xl font-bold mb-2" style={{ color:'var(--c-primary)' }}>404</h1>
          <p className="mb-6" style={{ color:'var(--c-text-muted)' }}>Page not found</p>
          <a href="/" className="px-6 py-3 rounded-full font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor:'var(--c-primary)' }}>Go Home</a>
        </div>
      } />
    </Routes>
  );
}