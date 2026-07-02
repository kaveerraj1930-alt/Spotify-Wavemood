import { describe, it, expect, vi } from 'vitest'
import { getRecommendations } from '../recommendationService'

describe('recommendationService', () => {
  it('returns recommendations with mood and features', async () => {
    const result = await getRecommendations('Happy')
    expect(result).toHaveProperty('mood')
    expect(result).toHaveProperty('features')
    expect(result).toHaveProperty('tracks')
    expect(Array.isArray(result.tracks)).toBe(true)
  })

  it('returns tracks array', async () => {
    const result = await getRecommendations('Chill')
    expect(result.tracks).toHaveLength(8)
  })

  it('each track has required properties', async () => {
    const result = await getRecommendations('Happy')
    result.tracks.forEach(track => {
      expect(track).toHaveProperty('id')
      expect(track).toHaveProperty('name')
      expect(track).toHaveProperty('artists')
      expect(track).toHaveProperty('album')
    })
  })

  it('simulates API delay', async () => {
    const start = Date.now()
    await getRecommendations('Happy')
    const duration = Date.now() - start
    expect(duration).toBeGreaterThanOrEqual(1000)
  })

  it('returns detected mood', async () => {
    const result = await getRecommendations('Happy')
    expect(result.mood).toBe('Happy')
  })

  it('returns audio features', async () => {
    const result = await getRecommendations('Happy')
    expect(result.features).toHaveProperty('valence')
    expect(result.features).toHaveProperty('energy')
    expect(result.features).toHaveProperty('danceability')
  })
})
