import { useState, Suspense, useEffect, useRef } from 'react'
import styles from './Biodiversity.module.css'
import {Canvas} from '@react-three/fiber'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer} from '@react-three/postprocessing'
import Forest from '../../r3f/biodiversity/forest/Forest'
import Bee from '../../r3f/biodiversity/bee/Bee'
import Orchid from '../../r3f/biodiversity/orchid/Orchid'
import Wolf from '../../r3f/biodiversity/wolf/Wolf'
import Navbar from './components/navbar/navbar'


function Biodiversity() {
  const [count, setCount] = useState(0)
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [isBeeHovered, setIsBeeHovered] = useState(false);
  const [isOrchidHovered, setIsOrchidHovered] = useState(false);
  const [isWolfHovered, setIsWolfHovered] = useState(false);
  const introRef = useRef(null);
  const cameraRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (introRef.current && !introRef.current.contains(event.target)) {
        setIsFading(true); 
        setTimeout(() => setIsVisible(false), 500); 
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {document.removeEventListener("mousedown", handleClickOutside);};
  }, []);

  const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  };

  function onKeyDown(event) {
    if (keys.hasOwnProperty(event.key)) {
      keys[event.key] = true;
    }
  }

  function onKeyUp(event) {
    if (keys.hasOwnProperty(event.key)) {
      keys[event.key] = false;
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Actualizar la cámara cuando las teclas estén presionadas
    const moveCamera = () => {
      if (cameraRef.current) {
        const camera = cameraRef.current;

        // Movimiento de la cámara en función de las teclas de flecha
        if (keys.ArrowUp) camera.position.z -= 1.7;  // Movimiento hacia adelante
        if (keys.ArrowDown) camera.position.z += 1.7; // Movimiento hacia atrás
        if (keys.ArrowLeft) camera.position.x -= 1.7; // Movimiento hacia la izquierda
        if (keys.ArrowRight) camera.position.x += 1.7; // Movimiento hacia la derecha
      }
    };

    // Animación continua usando requestAnimationFrame
    const animate = () => {
      moveCamera();
      requestAnimationFrame(animate); // Llama a la función de nuevo en el siguiente frame
    };

    animate(); // Iniciar la animación

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [keys]);

  return (
    <>
    <Navbar/>
    {isBeeHovered && (
        <div className={styles.speciesInfo}>
          Bees are essential for biodiversity and the balance of ecosystems due to their role in pollination.
          Without this work, many plants would not be able to produce fruits or seeds, affecting the food chain and biodiversity in general.
        </div>
    )}
    {isOrchidHovered && (
        <div className={styles.speciesInfo}>
          Orchids are essential for biodiversity and ecological balance due to their unique adaptations to attract pollinators, such as insects. 
          Their study in biotechnology helps preserve threatened species and improve the quality of cultivated plants.
        </div>
    )}
    {isWolfHovered && (
      <div className={styles.speciesInfo}>
        The Mexican wolf plays an essential role in controlling populations of herbivores, such as deer and rabbits. This helps maintain balance in ecosystems, 
        avoiding overpopulation and degradation of vegetation.
      </div>
    )}
    <div className={styles.pageContainer}>
       {isIntroVisible && (
        <div ref={introRef} className={`${styles.intro} ${isFading ? styles.fadeOut : ''}`}>
          <p >
            The loss of biodiversity is one of the most critical environmental problems of our time. It refers to the decrease in the variety of life on Earth,
            encompassing animal and plant species, and entire ecosystems. This phenomenon is being accelerated by human activity, mainly due to the destruction of habitats,
            climate change, pollution, overexploitation of natural resources, and the introduction of invasive species.
          </p>
          <p className={styles.continueText}>
            <em>Click <b>outside</b> to continue...</em>
          </p>
        </div>
      )}
      <div className={`${styles.canvasContainer} ${styles.background}`}>
      <Canvas shadowMap>
        <EffectComposer>
        <PerspectiveCamera ref={cameraRef} makeDefault fov={70} position={[10, -20, 150]} rotation={[-Math.PI / 6, 0, 0]} />
          <ambientLight intensity={0.9} color="#ffc199"/>
          <directionalLight position={[10, 20, 100]} intensity={0.5} castShadow shadow-camera-far={50}/>
          <OrbitControls minDistance={2} maxDistance={170} maxPolarAngle={Math.PI * 0.55} minPolarAngle={-100} />
          <Suspense fallback={null}>
            <Forest color='hotpink'/>
            <Bee 
            position={[10, -23, 110]}
            onPointerOver={() => setIsBeeHovered(true)} 
            onPointerOut={() => setIsBeeHovered(false)} 
            />
            <Orchid 
            position={[1, -28, 123]}
            onPointerOver={() => setIsOrchidHovered(true)} // Muestra el div
            onPointerOut={() => setIsOrchidHovered(false)}  // Oculta el div
            />
            <Wolf 
            position={[-11, -28, 126]}
            onPointerOver={() => setIsWolfHovered(true)} // Muestra el div
            onPointerOut={() => setIsWolfHovered(false)}
            />
          </Suspense>
          <Environment preset='sunset' />
        </EffectComposer>
      </Canvas>
      </div>
    </div>
    </>
    
  )
}

export default Biodiversity
