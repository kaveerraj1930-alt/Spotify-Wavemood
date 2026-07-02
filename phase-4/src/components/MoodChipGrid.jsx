import MoodChip from './MoodChip'
import useMoodStore from '../store/moodStore'

const moods = [
  'Sleepy',
  'Motivated',
  'Emotional',
  'Happy',
  'Chill',
  'Party',
  'Angry',
  'Focus',
  'Sad',
]

function MoodChipGrid() {
  const { selectedMood, setSelectedMood, setMoodInput } = useMoodStore()

  const handleChipClick = (mood) => {
    setSelectedMood(mood)
    setMoodInput(mood)
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {moods.map((mood) => (
        <MoodChip
          key={mood}
          mood={mood}
          isSelected={selectedMood === mood}
          onClick={() => handleChipClick(mood)}
        />
      ))}
    </div>
  )
}

export default MoodChipGrid
