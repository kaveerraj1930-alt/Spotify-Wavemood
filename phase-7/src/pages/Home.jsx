import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import MoodBanner from '../components/MoodBanner'
import { getTopArtists, getRecentlyPlayed } from '../services/homeService'
import useMoodStore from '../store/moodStore'

const defaultFeaturedPlaylists = [
  {
    id: 'feat-1',
    title: "Today's Top Hits",
    description: 'The hottest tracks right now',
    image: 'https://picsum.photos/seed/playlist1/200/200',
  },
  {
    id: 'feat-2',
    title: 'RapCaviar',
    description: 'New music from Drake, Travis Scott and more',
    image: 'https://picsum.photos/seed/playlist2/200/200',
  },
  {
    id: 'feat-3',
    title: 'All Out 2010s',
    description: 'The biggest songs of the 2010s',
    image: 'https://picsum.photos/seed/playlist3/200/200',
  },
  {
    id: 'feat-4',
    title: 'Rock Classics',
    description: 'Rock legends & epic songs',
    image: 'https://picsum.photos/seed/playlist4/200/200',
  },
  {
    id: 'feat-5',
    title: 'Chill Hits',
    description: 'Kick back to the best chill hits',
    image: 'https://picsum.photos/seed/playlist5/200/200',
  },
]

const defaultRecentlyPlayed = [
  {
    id: 'rec-1',
    title: 'Discover Weekly',
    description: 'Your weekly mixtape of fresh music',
    image: 'https://picsum.photos/seed/playlist7/200/200',
  },
  {
    id: 'rec-2',
    title: 'Release Radar',
    description: 'Catch all the latest music from artists you follow',
    image: 'https://picsum.photos/seed/playlist8/200/200',
  },
  {
    id: 'rec-3',
    title: 'Daily Mix 1',
    description: 'Made for you',
    image: 'https://picsum.photos/seed/playlist9/200/200',
  },
]

function Home() {
  const { moodHistory } = useMoodStore()
  const [topArtists, setTopArtists] = useState([])
  const [recentlyPlayed, setRecentlyPlayed] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  useEffect(() => {
    let active = true
    async function loadHomeData() {
      try {
        const [artists, tracks] = await Promise.all([
          getTopArtists(),
          getRecentlyPlayed(),
        ])
        if (active) {
          setTopArtists(artists || [])
          setRecentlyPlayed(tracks || [])
        }
      } catch (err) {
        console.error('Failed to load real home data, using fallbacks:', err)
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    loadHomeData()
    return () => {
      active = false
    }
  }, [])

  const PlaylistCard = ({ title, description, image, isCircle = false }) => (
    <div className="group relative bg-spotify-card p-4 rounded-lg hover:bg-spotify-hover transition-all cursor-pointer">
      <div className="relative mb-4">
        <img
          src={image}
          alt={title}
          className={`w-full aspect-square object-cover shadow-lg ${
            isCircle ? 'rounded-full' : 'rounded-md'
          }`}
        />
        <button className="absolute bottom-2 right-2 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105">
          <Play size={20} className="text-black fill-black" />
        </button>
      </div>
      <h3 className="font-bold text-white mb-1 truncate">{title}</h3>
      <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
    </div>
  )

  const SkeletonCard = ({ isCircle = false }) => (
    <div className="bg-spotify-card p-4 rounded-lg animate-pulse">
      <div className={`w-full aspect-square bg-spotify-hover mb-4 ${
        isCircle ? 'rounded-full' : 'rounded-md'
      }`} />
      <div className="h-4 bg-spotify-hover rounded w-3/4 mb-2" />
      <div className="h-3 bg-spotify-hover rounded w-1/2" />
    </div>
  )

  return (
    <div className="p-4 md:p-8 space-y-8">
      <MoodBanner />
      
      <h1 className="text-3xl font-bold text-white">{getGreeting()}</h1>

      {/* Your Recent Moods */}
      {moodHistory && moodHistory.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Your Recent Moods</h2>
          <div className="flex flex-wrap gap-3">
            {moodHistory.map((mood, idx) => (
              <Link
                key={`${mood}-${idx}`}
                to="/mood"
                onClick={() => {
                  useMoodStore.setState({ moodInput: mood, selectedMood: mood })
                }}
                className="px-5 py-3 bg-spotify-card hover:bg-spotify-hover text-white rounded-full font-semibold transition-all hover:scale-105"
              >
                {mood}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recently Played */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Recently Played</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, idx) => <SkeletonCard key={idx} />)
          ) : recentlyPlayed.length > 0 ? (
            recentlyPlayed.map((track) => (
              <PlaylistCard
                key={track.id}
                title={track.name}
                description={track.artists}
                image={track.image}
              />
            ))
          ) : (
            defaultRecentlyPlayed.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                title={playlist.title}
                description={playlist.description}
                image={playlist.image}
              />
            ))
          )}
        </div>
      </section>

      {/* Your Top Artists */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Your Top Artists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, idx) => <SkeletonCard key={idx} isCircle />)
          ) : topArtists.length > 0 ? (
            topArtists.map((artist) => (
              <PlaylistCard
                key={artist.id}
                title={artist.name}
                description={artist.genres ? artist.genres.join(', ') : 'Artist'}
                image={artist.image}
                isCircle
              />
            ))
          ) : (
            <div className="text-gray-400 col-span-full py-4 text-sm">
              Log in to see your top artists here.
            </div>
          )}
        </div>
      </section>

      {/* Featured Playlists */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {defaultFeaturedPlaylists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              title={playlist.title}
              description={playlist.description}
              image={playlist.image}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
