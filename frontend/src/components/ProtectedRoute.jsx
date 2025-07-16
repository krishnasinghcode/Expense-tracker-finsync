import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // Or a loading spinner
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
}
