import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen"><div className="w-10 h-10 border-4 border-forest border-t-transparent rounded-full animate-spin" /></div>;
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}
