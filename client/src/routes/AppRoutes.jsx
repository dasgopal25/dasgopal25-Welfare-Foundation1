import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

// Public
import Home from '../pages/public/Home';
import OurWork from '../pages/public/OurWork';
import Blogs from '../pages/public/Blogs';
import BlogSingle from '../pages/public/BlogSingle';
import Gallery from '../pages/public/Gallery';
import Contact from '../pages/public/Contact';
import Join from '../pages/public/Join';

// Admin
import Login from '../pages/admin/Login';
import Dashboard from '../pages/admin/Dashboard';
import ManageBlogs from '../pages/admin/ManageBlogs';
import AddBlog from '../pages/admin/AddBlog';
import EditBlog from '../pages/admin/EditBlog';
import ManageGallery from '../pages/admin/ManageGallery';
import Messages from '../pages/admin/Messages';
import Settings from '../pages/admin/Settings';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="our-work" element={<OurWork />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:slug" element={<BlogSingle />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="join" element={<Join />} />
      </Route>

      {/* Admin Login */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="blogs" element={<ManageBlogs />} />
        <Route path="blogs/add" element={<AddBlog />} />
        <Route path="blogs/edit/:id" element={<EditBlog />} />
        <Route path="gallery" element={<ManageGallery />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950">
          <span className="text-8xl mb-4">🌿</span>
          <h1 className="font-display text-4xl font-bold text-forest dark:text-green-400 mb-2">404</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Page not found</p>
          <a href="/" className="px-6 py-3 bg-forest text-white rounded-full font-semibold hover:bg-forest-light transition-colors">Go Home</a>
        </div>
      } />
    </Routes>
  );
}
