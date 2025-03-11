import './App.css'
import { ApplicationView } from './components/Views/ApplicationView'
import { Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar'

function App() {


  return (
    <>
    <NavBar /> 
    <Routes>
      <Route path="/*" element={<ApplicationView />} /> 
    </Routes>
  </>
);
}

export default App
