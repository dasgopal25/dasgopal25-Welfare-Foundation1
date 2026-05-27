# Gazipur Kismat Welfare Foundation — MERN Stack Website

A full-featured NGO/Foundation website with admin dashboard.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd server && npm install
cd ../client && npm install
```

### 2. Configure Environment
Edit `server/.env` with your values:
```
MONGO_URI=mongodb://localhost:27017/gazipur-kismat
JWT_SECRET=your_very_secure_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Start Development
**Terminal 1 (Backend):**
```bash
cd server && npm run dev
```
**Terminal 2 (Frontend):**
```bash
cd client && npm run dev
```

### 4. Access
- **Website:** http://localhost:5173
- **Admin Panel:** http://localhost:5173/admin/login
- **API:** http://localhost:5000/api

## 🔑 Default Admin Credentials
- **Email:** admin@gazipurkismat.org
- **Password:** Admin@123456

> ⚠️ Change the password after first login!

## 📁 Tech Stack
| Part | Technology |
|------|-----------|
| Frontend | React.js + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Images | Cloudinary |
| Auth | JWT |

## 🌐 Features
- ✅ Bilingual (English + বাংলা)
- ✅ Dark/Light Mode
- ✅ Fully Responsive
- ✅ Admin Dashboard
- ✅ Blog Management (CRUD)
- ✅ Gallery Management
- ✅ Contact & Join Forms
- ✅ Cloudinary Image Upload
- ✅ JWT Protected Admin Routes
- ✅ WhatsApp Float Button
- ✅ SEO-ready structure

## 🏠 Pages
### Public
- `/` — Home
- `/our-work` — Our Activities
- `/blogs` — Blog listing
- `/blogs/:slug` — Single blog
- `/gallery` — Photo gallery
- `/contact` — Contact form
- `/join` — Volunteer registration

### Admin (Protected)
- `/admin/login` — Login
- `/admin/dashboard` — Stats overview
- `/admin/blogs` — Manage blogs
- `/admin/gallery` — Manage gallery
- `/admin/messages` — View contact messages
- `/admin/settings` — Website settings

## 📍 Foundation
Gazipur Kismat, Dantan, Paschim Medinipur - 721426
