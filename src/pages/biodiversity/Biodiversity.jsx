import { useState, Suspense, useEffect, useRef } from 'react'
import styles from './Biodiversity.module.css'
import {Canvas} from '@react-three/fiber'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer} from '@react-three/postprocessing'
import Forest from '../../r3f/biodiversity/forest/Forest'
import Bee from '../../r3f/biodiversity/bee/Bee'
import Orchid from '../../r3f/biodiversity/orchid/Orchid'
import Wolf from '../../r3f/biodiversity/wolf/Wolf'
import Crocodile from '../../r3f/biodiversity/crocodile/Crocodile'
import Condor from '../../r3f/biodiversity/condor/Condor'
import Frog from '../../r3f/biodiversity/frog/Frog'
import Navbar from './components/navbar/navbar'
import * as THREE from 'three'
import keyboardControls from './components/controllers/keyboardControls';
import { handleBeeClick, handleWolfClick, handleOrchidClick, handlePointerOrchidMissed, handlePointerBeeMissed, handlePointerWolfMissed, handleCrocClick, handlePointerCrocMissed, handleCondorClick, handlePointerCondorMissed, handleFrogClick, handlePointerFrogMissed} from './components/controllers/cameraController';


function Biodiversity() {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [isBeeHovered, setIsBeeHovered] = useState(false);
  const [isOrchidHovered, setIsOrchidHovered] = useState(false);
  const [isWolfHovered, setIsWolfHovered] = useState(false);
  const [isCrocHovered, setIsCrocHovered] = useState(false);
  const [isCondorHovered, setIsCondorHovered] = useState(false);
  const [isFrogHovered, setIsFrogHovered] = useState(false);
  const [isBeeClicked, setIsBeeClicked] = useState(false);
  const [isOrchidClicked, setIsOrchidClicked] = useState(false);
  const [isWolfClicked, setIsWolfClicked] = useState(false);
  const [isCrocClicked, setIsCrocClicked] = useState(false);
  const [isCondorClicked, setIsCondorClicked] = useState(false);
  const [isFrogClicked, setIsFrogClicked] = useState(false);
  const introRef = useRef(null);
  const cameraRef = useRef();
  const [keys] = keyboardControls(cameraRef);

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

  return (
    <>
    <Navbar/>
    {isBeeHovered && (
        <div className={styles.speciesLabel}>
          Bees
        </div>
    )}
    {isOrchidHovered && (
        <div className={styles.speciesLabel}>
          Orchids
        </div>
    )}
    {isWolfHovered && (
      <div className={styles.speciesLabel}>
          Mexican wolf
      </div>
    )}
    {isCrocHovered && (
      <div className={styles.speciesLabel}>
          Mindoro crocodile
      </div>
    )}
    {isCondorHovered && (
      <div className={styles.speciesLabel}>
          California condor
      </div>
    )}
    {isFrogHovered && (
      <div className={styles.speciesLabel}>
          Golden frog
      </div>
    )}
    <div className={styles.pageContainer}>
       {isVisible && (
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
          <OrbitControls minDistance={2} maxDistance={170} maxPolarAngle={Math.PI * 0.567} minPolarAngle={-100} />
          <Suspense fallback={null}>
            <Forest color='hotpink'/>
            <Bee 
            position={[10, -23, 110]}
            onPointerOver={() => setIsBeeHovered(true)} 
            onPointerOut={() => setIsBeeHovered(false)} 
            onClick={() => handleBeeClick(cameraRef, setIsBeeClicked)}
            onPointerMissed={() => handlePointerBeeMissed(cameraRef, setIsBeeClicked)}
            />
            <Orchid 
            position={[1, -28, 123]}
            onPointerOver={() => setIsOrchidHovered(true)}
            onPointerOut={() => setIsOrchidHovered(false)}
            onClick={() => handleOrchidClick(cameraRef, setIsOrchidClicked)}
            onPointerMissed={() => handlePointerOrchidMissed(cameraRef, setIsOrchidClicked)}
            />
            <Wolf 
            position={[-11, -28, 126]}
            onPointerOver={() => setIsWolfHovered(true)} 
            onPointerOut={() => setIsWolfHovered(false)}
            onClick={() => handleWolfClick(cameraRef, setIsWolfClicked)}
            onPointerMissed={() => handlePointerWolfMissed(cameraRef, setIsWolfClicked)}
            />
            <Crocodile
            position={[0, -16, 110]}
            onPointerOver = {() => setIsCrocHovered(true)}
            onPointerOut={() => setIsCrocHovered(false)} 
            onClick={() => handleCrocClick(cameraRef, setIsCrocClicked)}
            onPointerMissed={() => handlePointerCrocMissed(cameraRef, setIsCrocClicked)}
            />
            <Condor
            position={[30, -5, 110]}
            onPointerOver={() => setIsCondorHovered(true)}
            onPointerOut={() => setIsCondorHovered(false)} 
            onClick={() => handleCondorClick(cameraRef, setIsCondorClicked)}
            onPointerMissed={() => handlePointerCondorMissed(cameraRef, setIsCondorClicked)}
            />
            <Frog 
            position={[20, -23, 126]}
            onPointerOver={() => setIsFrogHovered(true)}
            onPointerOut={() => setIsFrogHovered(false)}
            onClick={() => handleFrogClick(cameraRef, setIsFrogClicked)}
            onPointerMissed={() => handlePointerFrogMissed(cameraRef, setIsFrogClicked)}
            />
          </Suspense>
          <Environment preset='sunset' />
        </EffectComposer>
      </Canvas>
      </div>
    </div>

    {isBeeClicked && (
        <div className={`${styles.speciesInfo} ${isFading ? styles.fadeOut : ''}`}>
          <p>
          Bees are essential for biodiversity and the balance of ecosystems due to their role in pollination.
          Without this work, many plants would not be able to produce fruits or seeds, affecting the food chain and biodiversity in general.
          </p>
        </div>
      )}

    {isWolfClicked && (
        <div className={`${styles.speciesInfo} ${isFading ? styles.fadeOut : ''}`}>
          <p>
          The Mexican wolf plays an essential role in controlling populations of herbivores, such as deer and rabbits. This helps maintain balance in ecosystems, 
          avoiding overpopulation and degradation of vegetation.
          </p>
        </div>
      )}

    {isOrchidClicked && (
        <div className={`${styles.speciesInfo} ${isFading ? styles.fadeOut : ''}`}>
          <p>
          Orchids are essential for biodiversity and ecological balance due to their unique adaptations to attract pollinators, such as insects. 
          Their study in biotechnology helps preserve threatened species and improve the quality of cultivated plants.
          </p>
        </div>
      )}

      {isCrocClicked && (
        <div className={`${styles.speciesInfo} ${isFading? styles.fadeOut : ''}`}>
          <p>
          The Mindoro crocodile plays a vital role in the balance of the freshwater ecosystems where it lives. 
          As a top predator, it helps control populations of fish and other aquatic animals, maintaining the health of the ecosystem and preventing overpopulation of certain species.
          Additionally, by moving and building their nests, crocodiles help move nutrients and modify their environment in ways that benefit other species.
          </p>
        </div>
      )}

      {isCondorClicked && (
        <div className={`${styles.speciesInfo} ${isFading? styles.fadeOut : ''}`}>
          <p>
          The California condor is an essential bird species for the biodiversity of North America. It is a highly social and cooperative species,
          which helps maintain the health of ecosystems by providing nesting sites for other birds and supporting the growth of other species.
          </p>
        </div>
      )}
      
      {isFrogClicked && (
        <div className={`${styles.speciesInfo} ${isFading? styles.fadeOut : ''}`}>
          <p>
          The Panama golden frog contributes to the ecosystem mainly by controlling populations of insects and other invertebrates, helping to maintain ecological balance and prevent pests.
          It acts as a bioindicator, reflecting the quality of the environment, since its health and presence alert about changes in the ecosystem, such as pollution or diseases. 
          It is also part of the food chain and its analysis contributes to the nutrient cycle, benefiting vegetation and other organisms in the environment.
          </p>
        </div>
      )}
      
    </>
    
  )
}

export default Biodiversity
