import { useSearchParams } from 'react-router-dom';
import { Music2 } from 'lucide-react';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';

export default function Login() {
  const { login, isLoading, isAuthenticated } = useSpotifyAuth();
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  if (!isLoading && isAuthenticated) {
    window.location.replace('/mood');
    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-spotify-black px-6 font-spotify">
      <section className="w-full max-w-md rounded-lg bg-spotify-card p-8 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-spotify-green text-black">
          <Music2 size={32} />
        </div>

        <h1 className="mb-2 text-3xl font-bold text-spotify-white">
          Log in to Spotify
        </h1>
        <p className="mb-8 text-sm text-spotify-gray">
          Connect your free Spotify account to get mood-based music recommendations.
        </p>

        {error && (
          <p className="mb-4 rounded-md bg-red-500/10 px-4 py-3 text-sm text-red-400">
            Login failed: {error.replaceAll('_', ' ')}
          </p>
        )}

        <button
          type="button"
          onClick={login}
          disabled={isLoading}
          className="w-full rounded-pill bg-spotify-green px-8 py-3 text-sm font-bold text-black transition hover:bg-spotify-green-dk disabled:opacity-60"
        >
          {isLoading ? 'Checking session...' : 'Log in with Spotify'}
        </button>
      </section>
    </main>
  );
}
