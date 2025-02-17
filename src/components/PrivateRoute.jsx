import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { isAuthenticated } from '../lib/auth';

const PrivateRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const user = isAuthenticated();
    if (!user) {
      setError('Não autorizado');
    } else {
      setSession(user);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#11CD80] animate-spin" />
      </div>
    );
  }

  if (error) {
    return <Navigate to="/admin" state={{ error }} replace />;
  }

  if (!session) {
    return <Navigate to="/admin" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default PrivateRoute;