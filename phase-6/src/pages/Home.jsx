import { Play } from 'lucide-react'
import MoodBanner from '../components/MoodBanner'

const featuredPlaylists = [
  {
    id: 1,
    title: 'Today\'s Top Hits',
    description: 'The hottest tracks right now',
    image: 'https://picsum.photos/seed/playlist1/200/200',
  },
  {
    id: 2,
    title: 'RapCaviar',
    description: 'New music from Drake, Travis Scott and more',
    image: 'https://picsum.photos/seed/playlist2/200/200',
  },
  {
    id: 3,
    title: 'All Out 2010s',
    description: 'The biggest songs of the 2010s',
    image: 'https://picsum.photos/seed/playlist3/200/200',
  },
  {
    id: 4,
    title: 'Rock Classics',
    description: 'Rock legends & epic songs',
    image: 'https://picsum.photos/seed/playlist4/200/200',
  },
  {
    id: 5,
    title: 'Chill Hits',
    description: 'Kick back to the best chill hits',
    image: 'https://picsum.photos/seed/playlist5/200/200',
  },
  {
    id: 6,
    title: 'Viva Latino',
    description: 'Today\'s top Latin hits',
    image: 'https://picsum.photos/seed/playlist6/200/200',
  },
]

const recentlyPlayed = [
  {
    id: 7,
    title: 'Discover Weekly',
    description: 'Your weekly mixtape of fresh music',
    image: 'https://picsum.photos/seed/playlist7/200/200',
  },
  {
    id: 8,
    title: 'Release Radar',
    description: 'Catch all the latest music from artists you follow',
    image: 'https://picsum.photos/seed/playlist8/200/200',
  },
  {
    id: 9,
    title: 'Daily Mix 1',
    description: 'Made for you',
    image: 'https://picsum.photos/seed/playlist9/200/200',
  },
]

function Home() {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const PlaylistCard = ({ title, description, image }) => (
    <div className="group relative bg-spotify-card p-4 rounded-lg hover:bg-spotify-hover transition-all cursor-pointer">
      <div className="relative mb-4">
        <img
          src={image}
          alt={title}
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
        <button className="absolute bottom-2 right-2 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105">
          <Play size={20} className="text-black fill-black" />
        </button>
      </div>
      <h3 className="font-bold text-white mb-1 truncate">{title}</h3>
      <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
    </div>
  )

  return (
    <div className="p-4 md:p-8">
      <MoodBanner />
      
      <h1 className="text-3xl font-bold text-white mb-6">{getGreeting()}</h1>

      {/* Recently Played */}
      <section className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {recentlyPlayed.map((playlist) => (
            <PlaylistCard key={playlist.id} {...playlist} />
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {featuredPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} {...playlist} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
