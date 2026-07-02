import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import MoodRecommendation from './pages/MoodRecommendation'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mood" element={<MoodRecommendation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
