import MOOD_MAP from './moodMap.js'

const MOOD_KEYWORDS = {
  Sleepy: ['tired', 'sleepy', 'exhausted', 'bedtime', 'drowsy', 'fatigue', 'rest', 'nap', 'insomnia'],
  Motivated: ['motivated', 'workout', 'gym', 'energy', 'pump', 'exercise', 'fitness', 'power', 'determined'],
  Emotional: ['emotional', 'heartbreak', 'feelings', 'vulnerable', 'sentimental', 'touching', 'moving', 'deep'],
  Happy: ['happy', 'joyful', 'upbeat', 'sunshine', 'great', 'good', 'positive', 'cheerful', 'excited', 'joy'],
  Chill: ['chill', 'calm', 'relaxed', 'peaceful', 'mellow', 'easy', 'laid-back', 'tranquil', 'serene'],
  Party: ['party', 'dance', 'club', 'celebration', 'hype', 'fun', 'festive', 'energetic', 'night'],
  Angry: ['angry', 'rage', 'furious', 'intense', 'mad', 'aggressive', 'frustrated', 'annoyed'],
  Focus: ['focus', 'study', 'concentrate', 'work', 'productive', 'concentration', 'attention', 'task'],
  Sad: ['sad', 'lonely', 'depressed', 'melancholy', 'crying', 'down', 'unhappy', 'grief', 'sorrow'],
}

function parseMood(text) {
  // Direct chip lookup
  if (MOOD_MAP[text]) {
    return { features: MOOD_MAP[text], detected: text }
  }

  // Handle empty string
  if (!text || text.trim() === '') {
    return { features: MOOD_MAP['Chill'], detected: 'Chill' }
  }

  // Keyword matching for free text
  const lowerText = text.toLowerCase()
  const scores = {}
  
  for (const [mood, keywords] of Object.entries(MOOD_KEYWORDS)) {
    let moodScore = 0
    const words = lowerText.split(/\s+/)
    
    for (const word of words) {
      // Only match if the word contains the keyword (more strict matching)
      if (keywords.some(keyword => word.includes(keyword) && word.length >= keyword.length * 0.7)) {
        moodScore += 1
      }
    }
    
    scores[mood] = moodScore
  }

  // Find highest score
  let detected = null
  let maxScore = 0
  
  for (const [mood, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score
      detected = mood
    }
  }

  // Fall back to Chill if no match or all scores are 0
  if (!detected || maxScore === 0) {
    detected = 'Chill'
  }

  return { features: MOOD_MAP[detected], detected }
}

export { parseMood, MOOD_KEYWORDS }
export default parseMood
