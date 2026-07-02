import { X, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const BANNER_DISMISS_KEY = 'mood-banner-dismissed'

function MoodBanner() {
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(BANNER_DISMISS_KEY)
    if (dismissed === 'true') {
      setIsDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem(BANNER_DISMISS_KEY, 'true')
  }

  if (isDismissed) return null

  return (
    <div className="relative mb-8 bg-gradient-to-r from-purple-900 via-pink-800 to-orange-700 rounded-lg p-6 md:p-8 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-spotify-green rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Discover Music by Mood</h2>
            <p className="text-white/80">Let AI find the perfect tracks for how you're feeling</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/mood"
            className="px-6 py-3 bg-spotify-green text-black font-bold rounded-full hover:scale-105 hover:bg-green-400 transition-all"
          >
            Try Mood Finder
          </Link>
          <button
            onClick={handleDismiss}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Dismiss banner"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MoodBanner
