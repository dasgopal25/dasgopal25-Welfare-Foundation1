import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--c-bg-alt)', color: 'var(--c-text)' }}>
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}