import './App.css'
import Login from './pages/login/Login.jsx'
import World from './r3f/scenes/World.jsx'
import Erosion from './r3f/Erosion/scenes/scene.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/world" element={<Login />} />
        <Route path="/Erosion" element={<Erosion />} />
      </Routes>
    </Router>
  )
}

export default App