import { Routes, Route } from 'react-router-dom'
import CheckBox from './components/Checkbox'
import Terms from './components/Terms'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CheckBox />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  )
}

export default App