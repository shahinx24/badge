import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/context.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter >
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
  </BrowserRouter>
)
