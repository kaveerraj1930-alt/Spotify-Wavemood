import { Search, Bell, User } from 'lucide-react'
import { useState } from 'react'

function TopBar() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-spotify-card text-white pl-10 pr-4 py-2.5 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 ml-4">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-spotify-hover rounded-full transition-colors">
            <Bell size={20} />
          </button>
          <button className="flex items-center gap-2 bg-spotify-card hover:bg-spotify-hover px-3 py-2 rounded-full transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="font-semibold text-sm hidden sm:block">User</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default TopBar
