import { describe, it, expect } from 'vitest'
import { getTopArtists, getRecentlyPlayed } from '../homeService'

describe('homeService', () => {
  it('getTopArtists fetches user top artists list', async () => {
    const artists = await getTopArtists()
    expect(artists).toBeInstanceOf(Array)
    expect(artists.length).toBeGreaterThan(0)
    
    const artist = artists[0]
    expect(artist).toHaveProperty('id')
    expect(artist).toHaveProperty('name')
    expect(artist).toHaveProperty('image')
    expect(artist).toHaveProperty('genres')
  })

  it('getRecentlyPlayed fetches user recently played tracks list', async () => {
    const tracks = await getRecentlyPlayed()
    expect(tracks).toBeInstanceOf(Array)
    expect(tracks.length).toBeGreaterThan(0)
    
    const track = tracks[0]
    expect(track).toHaveProperty('id')
    expect(track).toHaveProperty('name')
    expect(track).toHaveProperty('artists')
    expect(track).toHaveProperty('image')
    expect(track).toHaveProperty('duration_ms')
    expect(track).toHaveProperty('preview_url')
    expect(track).toHaveProperty('externalUrl')
  })
})
