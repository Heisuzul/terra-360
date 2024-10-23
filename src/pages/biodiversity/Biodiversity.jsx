import { useState, Suspense } from 'react'
import './Biodiversity.css'
import {Canvas} from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Forest from '../../../public/models-3d/biodiversity/forest/Forest.jsx'
import Bee from '../../../public/models-3d/biodiversity/bee/Bee.jsx'
import Navbar from './components/navbar/navbar'



function Biodiversity() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='intro'>
      <p>
      La biodiversidad se refiere a la variedad de formas de vida en la Tierra, incluyendo la diversidad de especies.
      Se considera fundamental para el equilibrio de los ecosistemas, ya que cada especie desempeña un papel específico en su hábitat.
      La biodiversidad contribuye a la estabilidad de los ecosistemas, a la provisión de recursos y a los servicios ambientales que sustentan la vida en el planeta.
      </p>
    </div>
    <div className='canvas-container background'>
    <Canvas className='forest' camera={ {position: [0, 3, 6], fov:50 }}>
        <ambientLight />
        <OrbitControls enableDamping={true} />
        <Suspense fallback={null}>
          <Bee />
          <Forest />
        </Suspense>
        <Environment preset='sunset' />
      </Canvas>
    </div>
    </>
    
  )
}

export default Biodiversity
