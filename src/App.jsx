import './App.css'
import Login from './pages/login/Login.jsx'
import World from './r3f/scenes/World.jsx'
import Deforestation from './pages/deforestation/Deforestation.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/world" element={<Login />} />
        <Route path="/deforestation" element={<Deforestation />} />
      </Routes>
    </Router>
  )
}

export default App