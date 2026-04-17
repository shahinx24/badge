import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"

import Home from './components/home'
import { Routes , Route} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
    <Routes>
      <Route path="/home/:id" element={<Home />} />
      <Route path="/" element={<App />}/>
    </Routes>
    </StrictMode>
  </BrowserRouter>
)
