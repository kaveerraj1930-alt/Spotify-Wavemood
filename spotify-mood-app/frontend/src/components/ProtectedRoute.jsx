import { Navigate, useLocation } from 'react-router-dom';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useSpotifyAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-spotify-black font-spotify text-spotify-gray">
        Checking your Spotify session...
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
