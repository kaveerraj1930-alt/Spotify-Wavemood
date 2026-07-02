import { Home, Search, Library, Plus, Heart } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Search', path: '/search' },
]

const libraryItems = [
  { icon: Library, label: 'Your Library', path: '/library' },
  { icon: Plus, label: 'Create Playlist', path: '/playlist/create' },
  { icon: Heart, label: 'Liked Songs', path: '/collection/tracks' },
]

const playlists = [
  'Chill Vibes',
  'Workout Mix',
  'Focus Music',
  'Party Hits',
  'Sleep Sounds',
]

function Sidebar() {
  const location = useLocation()

  const NavItem = ({ icon: Icon, label, path }) => {
    const isActive = location.pathname === path
    return (
      <Link
        to={path}
        className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
          isActive ? 'bg-spotify-hover text-white' : 'text-gray-400 hover:text-white hover:bg-spotify-hover'
        }`}
      >
        <Icon size={24} />
        <span className="font-semibold">{label}</span>
      </Link>
    )
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-black h-screen fixed left-0 top-0 p-2 gap-2">
      {/* Navigation */}
      <nav className="bg-spotify-dark rounded-lg p-4">
        <div className="flex items-center gap-2 mb-6 px-2">
          <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-sm">S</span>
          </div>
          <span className="font-bold text-lg">WaveMood</span>
        </div>
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </div>
      </nav>

      {/* Library */}
      <div className="bg-spotify-dark rounded-lg p-4 flex-1 overflow-hidden flex flex-col">
        <div className="space-y-1 mb-4">
          {libraryItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </div>

        <div className="border-t border-gray-700 my-4" />

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="space-y-1">
            {playlists.map((playlist) => (
              <button
                key={playlist}
                className="w-full text-left px-2 py-2 text-gray-400 hover:text-white hover:bg-spotify-hover rounded-md transition-colors text-sm"
              >
                {playlist}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar