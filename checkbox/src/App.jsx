import { Routes, Route } from 'react-router-dom'
import CheckBox from './components/Checkbox'
import Terms from './components/Terms'
import "./App.css"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CheckBox />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  )
}