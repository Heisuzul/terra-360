import Login from './pages/login/Login.jsx'

import Deforestation from './pages/deforestation/Deforestation.jsx';
import Loading from './pages/deforestation/Loading.jsx';
import Biodiversity from './pages/biodiversity/Biodiversity.jsx';
import Erosion from './pages/Erosion/erosion.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/world" element={<Login />} />

        <Route path="/Erosion" element={<Erosion />} />
        <Route path="/deforestation" element={<Loading><Deforestation /></Loading>} />
        <Route path="/biodiversity" element={<Biodiversity />} />

      </Routes>
    </Router>
  )
}

export default App