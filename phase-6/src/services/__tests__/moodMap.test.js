import { describe, it, expect } from 'vitest'
import MOOD_MAP from '../moodMap'

describe('moodMap', () => {
  it('has all 9 moods defined', () => {
    const moods = Object.keys(MOOD_MAP)
    expect(moods).toHaveLength(9)
    expect(moods).toContain('Sleepy')
    expect(moods).toContain('Motivated')
    expect(moods).toContain('Emotional')
    expect(moods).toContain('Happy')
    expect(moods).toContain('Chill')
    expect(moods).toContain('Party')
    expect(moods).toContain('Angry')
    expect(moods).toContain('Focus')
    expect(moods).toContain('Sad')
  })

  it('has required audio features for each mood', () => {
    for (const mood of Object.keys(MOOD_MAP)) {
      const features = MOOD_MAP[mood]
      expect(features).toHaveProperty('valence')
      expect(features).toHaveProperty('energy')
      expect(features).toHaveProperty('danceability')
      expect(features).toHaveProperty('tempo')
      expect(features).toHaveProperty('acousticness')
      expect(features).toHaveProperty('seed_genres')
    }
  })

  it('valence is between 0 and 1', () => {
    for (const mood of Object.keys(MOOD_MAP)) {
      const { valence } = MOOD_MAP[mood]
      expect(valence).toBeGreaterThanOrEqual(0)
      expect(valence).toBeLessThanOrEqual(1)
    }
  })

  it('energy is between 0 and 1', () => {
    for (const mood of Object.keys(MOOD_MAP)) {
      const { energy } = MOOD_MAP[mood]
      expect(energy).toBeGreaterThanOrEqual(0)
      expect(energy).toBeLessThanOrEqual(1)
    }
  })

  it('danceability is between 0 and 1', () => {
    for (const mood of Object.keys(MOOD_MAP)) {
      const { danceability } = MOOD_MAP[mood]
      expect(danceability).toBeGreaterThanOrEqual(0)
      expect(danceability).toBeLessThanOrEqual(1)
    }
  })

  it('acousticness is between 0 and 1', () => {
    for (const mood of Object.keys(MOOD_MAP)) {
      const { acousticness } = MOOD_MAP[mood]
      expect(acousticness).toBeGreaterThanOrEqual(0)
      expect(acousticness).toBeLessThanOrEqual(1)
    }
  })

  it('tempo is a positive number', () => {
    for (const mood of Object.keys(MOOD_MAP)) {
      const { tempo } = MOOD_MAP[mood]
      expect(tempo).toBeGreaterThan(0)
    }
  })

  it('seed_genres is an array', () => {
    for (const mood of Object.keys(MOOD_MAP)) {
      const { seed_genres } = MOOD_MAP[mood]
      expect(Array.isArray(seed_genres)).toBe(true)
      expect(seed_genres.length).toBeGreaterThan(0)
    }
  })

  it('Happy has high valence', () => {
    const { valence } = MOOD_MAP.Happy
    expect(valence).toBeGreaterThan(0.7)
  })

  it('Sad has low valence', () => {
    const { valence } = MOOD_MAP.Sad
    expect(valence).toBeLessThan(0.3)
  })

  it('Party has high energy', () => {
    const { energy } = MOOD_MAP.Party
    expect(energy).toBeGreaterThan(0.8)
  })

  it('Sleepy has low energy', () => {
    const { energy } = MOOD_MAP.Sleepy
    expect(energy).toBeLessThan(0.4)
  })
})
