import { describe, it, expect } from 'vitest'
import { parseMood } from '../moodParser'

describe('moodParser', () => {
  it('returns mood features for exact chip match', () => {
    const result = parseMood('Happy')
    expect(result).toHaveProperty('features')
    expect(result).toHaveProperty('detected')
    expect(result.detected).toBe('Happy')
    expect(result.features).toHaveProperty('valence')
  })

  it('detects happy mood from keywords', () => {
    const result = parseMood('I feel happy and joyful today')
    expect(result.detected).toBe('Happy')
  })

  it('detects sad mood from keywords', () => {
    const result = parseMood('I am feeling sad and lonely')
    expect(result.detected).toBe('Sad')
  })

  it('detects chill mood from keywords', () => {
    const result = parseMood('Just want to relax and be calm')
    expect(result.detected).toBe('Chill')
  })

  it('detects party mood from keywords', () => {
    const result = parseMood('Ready to dance and party')
    expect(result.detected).toBe('Party')
  })

  it('detects sleepy mood from keywords', () => {
    const result = parseMood('I am tired and need to sleep')
    expect(result.detected).toBe('Sleepy')
  })

  it('detects motivated mood from keywords', () => {
    const result = parseMood('Need energy for workout')
    expect(result.detected).toBe('Motivated')
  })

  it('detects angry mood from keywords', () => {
    const result = parseMood('I am furious and mad')
    expect(result.detected).toBe('Angry')
  })

  it('detects focus mood from keywords', () => {
    const result = parseMood('Need to study and concentrate')
    expect(result.detected).toBe('Focus')
  })

  it('detects emotional mood from keywords', () => {
    const result = parseMood('Feeling sentimental and emotional')
    expect(result.detected).toBe('Emotional')
  })

  it('falls back to Chill for unknown input', () => {
    const result = parseMood('random text with no mood keywords')
    expect(result.detected).toBe('Chill')
  })

  it('is case insensitive', () => {
    const result1 = parseMood('HAPPY')
    const result2 = parseMood('happy')
    expect(result1.detected).toBe(result2.detected)
  })

  it('handles empty string', () => {
    const result = parseMood('')
    expect(result.detected).toBe('Chill')
  })

  it('returns correct features for detected mood', () => {
    const result = parseMood('Happy')
    expect(result.features.valence).toBeGreaterThan(0.7)
  })
})
