import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NurseryList } from './components/nurseryList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <NurseryList />
  </StrictMode>,
)
