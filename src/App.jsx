import './App.css'
import Login from './pages/login/Login.jsx'
import Deforestation from './pages/deforestation/Deforestation.jsx';
import Biodiversity from './pages/biodiversity/Biodiversity.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/world" element={<Login />} />
        <Route path="/deforestation" element={<Deforestation />} />
        <Route path="/biodiversity" element={<Biodiversity />} />
      </Routes>
    </Router>
  )
}

export default App