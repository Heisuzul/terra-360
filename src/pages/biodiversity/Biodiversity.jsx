import { useState, Suspense, useEffect, useRef } from 'react'
import styles from './Biodiversity.module.css'
import {Canvas, useFrame} from '@react-three/fiber'
import { Physics, usePlane} from '@react-three/cannon'
import { Environment, OrbitControls, PerspectiveCamera, Text3D} from '@react-three/drei'
import { EffectComposer} from '@react-three/postprocessing'
import Plane from '../../r3f/biodiversity/forest/Plane'
import Forest from '../../r3f/biodiversity/forest/Forest'
import Bee from '../../r3f/biodiversity/bee/Bee'
import Orchid from '../../r3f/biodiversity/orchid/Orchid'
import Wolf from '../../r3f/biodiversity/wolf/Wolf'
import Crocodile from '../../r3f/biodiversity/crocodile/Crocodile'
import Condor from '../../r3f/biodiversity/condor/Condor'
import Frog from '../../r3f/biodiversity/frog/Frog'
import Butterflies from '../../r3f/biodiversity/butterflies/Butterflies'
import Butterflies2 from '../../r3f/biodiversity/butterflies/Butterflies2'
import DustParticles from '../../r3f/biodiversity/dust/DustParticles'
import Navbar from './components/navbar/navbar'
import * as THREE from 'three'
import keyboardControls from './components/controllers/keyboardControls';
import { handleBeeClick, handleWolfClick, handleOrchidClick, handlePointerOrchidMissed, handlePointerBeeMissed, handlePointerWolfMissed, handleCrocClick, handlePointerCrocMissed, handleCondorClick, handlePointerCondorMissed, handleFrogClick, handlePointerFrogMissed, handleButterflyClick, handlePointerButterflyMissed} from './components/controllers/cameraController';



function Biodiversity() {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [showLeaves, setShowLeaves] = useState(true);
  const [isBeeHovered, setIsBeeHovered] = useState(false);
  const [isOrchidHovered, setIsOrchidHovered] = useState(false);
  const [isWolfHovered, setIsWolfHovered] = useState(false);
  const [isCrocHovered, setIsCrocHovered] = useState(false);
  const [isCondorHovered, setIsCondorHovered] = useState(false);
  const [isFrogHovered, setIsFrogHovered] = useState(false);
  const [isButterflyHovered, setIsButterflyHovered] = useState(false);
  const [isBeeClicked, setIsBeeClicked] = useState(false);
  const [isOrchidClicked, setIsOrchidClicked] = useState(false);
  const [isWolfClicked, setIsWolfClicked] = useState(false);
  const [isCrocClicked, setIsCrocClicked] = useState(false);
  const [isCondorClicked, setIsCondorClicked] = useState(false);
  const [isFrogClicked, setIsFrogClicked] = useState(false);
  const [isButterflyClicked, setIsButterflyClicked] = useState(false);
  const [showButterflies, setShowButterflies] = useState(true);
  const introRef = useRef(null);
  const cameraRef = useRef();
  const [keys] = keyboardControls(cameraRef);
  const [currentText, setCurrentText] = useState('biodiversity');
  const [backgroundImage, setBackgroundImage] = useState('/images/backgrounds/biodiversity-background.jpg');
  const [lightSettings, setLightSettings] = useState({
    intensity: 0.9,
    color: '#ffc199',
  });
  const [preset, setPreset] = useState('sunset');
  const [isShaking, setIsShaking] = useState(false);
  const [shakeIntensity, setShakeIntensity] = useState(4);
  const [originalPosition, setOriginalPosition] = useState([10, -20, 150]);
  const [applyPhysics, setApplyPhysics] = useState(false);

  const startEarthquake = () => {
    if (cameraRef.current) {
      setOriginalPosition([...cameraRef.current.position.toArray()]); // Guarda la posición inicial
    }
    setIsShaking(true);
    setShakeIntensity(3); // Define la intensidad inicial
    setTimeout(() => setIsShaking(false), 2000); // Duración del terremoto
  };
  
  useEffect(() => {
    let interval;
    if (isShaking) {
      interval = setInterval(() => {
        const intensityX = shakeIntensity * (Math.random() - 0.5); // Movimiento en eje X
        const intensityY = shakeIntensity * 0.5 * (Math.random() - 0.5); // Movimiento reducido en eje Y
        cameraRef.current.position.x += intensityX;
        cameraRef.current.position.y += intensityY;
      }, 50); // Actualiza cada 50ms
    } else if (cameraRef.current) {
      // Restaura la posición inicial al terminar el terremoto
      cameraRef.current.position.set(...originalPosition);
    }
    return () => clearInterval(interval); // Limpia el intervalo
  }, [isShaking, shakeIntensity, originalPosition]);

  const handleConsequencesClick = () => {
    setCurrentText('consequences');
    setBackgroundImage('/images/backgrounds/consequences-background.gif');
    setLightSettings({ intensity: 0.05, color: '#121212' });
    setPreset('forest');
    setShowParticles(true);
    setShowButterflies(false);
    setApplyPhysics(true);
    startEarthquake();
  };

  const handleBiodiversityClick = () => {
    setCurrentText('biodiversity');
    setBackgroundImage('/images/backgrounds/biodiversity-background.jpg');
    setLightSettings({ intensity: 0.9, color: '#ffc199' });
    setPreset('sunset');
    setShowParticles(false);
    setShowButterflies(true);
    setApplyPhysics(false);
  };

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
    {currentText === 'biodiversity' && (<audio src="/sounds/naturesounds.mp3" autoPlay loop/>)}
    {currentText === 'consequences' && (<audio src="/sounds/stormsounds.mp3" autoPlay loop/>)}
    <Navbar onConsequencesClick={handleConsequencesClick} onBiodiversityClick={handleBiodiversityClick}/>
    {isBeeHovered && (
        <div className={styles.speciesLabel}>
          Bee
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
    {isButterflyHovered && (
      <div className={styles.speciesLabel}>
          Butterflies
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
      <div className={`${styles.canvasContainer} ${styles.background}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Canvas shadowMap>
        <EffectComposer>
        <PerspectiveCamera ref={cameraRef} makeDefault fov={70} position={[10, -20, 150]} rotation={[-Math.PI / 6, 0, 0]} />
          <ambientLight intensity={lightSettings.intensity} color={lightSettings.color}/>
          <directionalLight position={[10, 20, 100]} intensity={0.5} castShadow shadow-camera-far={50}/>
          <OrbitControls minDistance={2} maxDistance={170} maxPolarAngle={Math.PI * 0.567} minPolarAngle={-100} />
          <Suspense fallback={null}>
          <Physics gravity={[0, -9.81, 0]} tolerance={0.0001}>
            <Forest position={[0, 0, 0]} color='hotpink' applyPhysics={applyPhysics} receiveShadow/>   
            <Plane position={[0, 0, 0]} /> 
          </Physics>  
            <Bee 
            position={[10, -23, 110]}
            onPointerOver={() => {document.body.style.cursor = "pointer"; setIsBeeHovered(true)}}
            onPointerOut={() => {document.body.style.cursor = "default"; setIsBeeHovered(false)}} 
            onClick={() => handleBeeClick(cameraRef, setIsBeeClicked)}
            onPointerMissed={() => handlePointerBeeMissed(cameraRef, setIsBeeClicked)}
            />
            <Orchid 
            position={[1, -28, 123]}
            onPointerOver={() => {document.body.style.cursor = "pointer"; setIsOrchidHovered(true)}}
            onPointerOut={() => {document.body.style.cursor = "default"; setIsOrchidHovered(false)}}
            onClick={() => handleOrchidClick(cameraRef, setIsOrchidClicked)}
            onPointerMissed={() => handlePointerOrchidMissed(cameraRef, setIsOrchidClicked)}
            />
            <Wolf 
            position={[-11, -28, 126]}
            onPointerOver={() => {document.body.style.cursor = "pointer"; setIsWolfHovered(true)} }
            onPointerOut={() => {document.body.style.cursor = "default"; setIsWolfHovered(false)}}
            onClick={() => handleWolfClick(cameraRef, setIsWolfClicked)}
            onPointerMissed={() => handlePointerWolfMissed(cameraRef, setIsWolfClicked)}
            />
            <Crocodile
            position={[0, -16, 110]}
            onPointerOver = {() => {document.body.style.cursor = "pointer"; setIsCrocHovered(true)}}
            onPointerOut={() => {document.body.style.cursor = "default"; setIsCrocHovered(false)}}
            onClick={() => handleCrocClick(cameraRef, setIsCrocClicked)}
            onPointerMissed={() => handlePointerCrocMissed(cameraRef, setIsCrocClicked)}
            />
            <Condor
            position={[30, -5, 110]}
            onPointerOver={() => {document.body.style.cursor = "pointer"; setIsCondorHovered(true)}}
            onPointerOut={() => {document.body.style.cursor = "default"; setIsCondorHovered(false)}}
            onClick={() => handleCondorClick(cameraRef, setIsCondorClicked)}
            onPointerMissed={() => handlePointerCondorMissed(cameraRef, setIsCondorClicked)}
            />
            <Frog 
            position={[20, -23, 126]}
            onPointerOver={() => {document.body.style.cursor = "pointer"; setIsFrogHovered(true)}}
            onPointerOut={() => {document.body.style.cursor = "default"; setIsFrogHovered(false)}}
            onClick={() => handleFrogClick(cameraRef, setIsFrogClicked)}
            onPointerMissed={() => handlePointerFrogMissed(cameraRef, setIsFrogClicked)}
            />
            <Butterflies
            position={[4, -15, 126]}
            rotation={[0, 0, 0]}
            scale= {1.5}
            onPointerOver={() => {document.body.style.cursor = "pointer"; setIsButterflyHovered(true)}}
            onPointerOut={() => {document.body.style.cursor = "default"; setIsButterflyHovered(false)}}
            onClick={() => handleButterflyClick(cameraRef, setIsButterflyClicked)}
            onPointerMissed={() => handlePointerButterflyMissed(cameraRef, setIsButterflyClicked)}
            />
            {showButterflies && <Butterflies2 
            position={[20, -15, 126]}
            rotation={[0, 2, 0]}
            />}
            {showButterflies && <Butterflies 
            position={[20, -20, 136]}
            rotation={[0, 5, 0]}
            />}
            {showButterflies && <Butterflies
            position={[-5, -20, 136]}
            rotation={[0, 2, 0]}
            />}
            {showButterflies && <Butterflies2 
            position={[-10, -15, 126]}
            rotation={[0, 5, 0]}
            />}
            {showParticles && <DustParticles count={500} size={0.6} position={[10, -15, 126]} />}
            {currentText === 'consequences' && (
               <Text3D
               position={[-6, -2, 115]}
               rotation={[0, 0.07, 0]}
               font="/fonts/TiltWarp-Regular.json"
               scale={3}
               >
               Save the Forest
               <meshStandardMaterial attach="material" color="#75b850" />
               </Text3D>
            )}
          </Suspense>
          <Environment preset={preset} />
        </EffectComposer>
      </Canvas>
      </div>
    </div>

    {isBeeClicked && currentText === 'biodiversity' && (
        <div className={`${styles.speciesInfo} ${isFading ? styles.fadeOut : ''}`}>
          <p>
          Bees are essential for biodiversity and the balance of ecosystems due to their role in pollination.
          Without this work, many plants would not be able to produce fruits or seeds, affecting the food chain and biodiversity in general.
          </p>
        </div>
      )}

    {isBeeClicked && currentText === 'consequences' && (
        <div className={`${styles.speciesInfo} ${isFading ? styles.fadeOut : ''}`}>
          <p>
          Bees face serious threats such as the use of pesticides, especially neonicotinoids, which affect their nervous system; habitat loss due to urbanization and intensive agriculture, which reduces their food sources; diseases and parasites such as the Varroa destructor mite; 
          climate change, which alters pollination patterns; and monocultures, which limit dietary diversity.
          </p>
        </div>
    )}

    {isWolfClicked && currentText === 'biodiversity' && (
        <div className={`${styles.speciesInfo} ${isFading ? styles.fadeOut : ''}`}>
          <p>
          The Mexican wolf plays an essential role in controlling populations of herbivores, such as deer and rabbits. This helps maintain balance in ecosystems, 
          avoiding overpopulation and degradation of vegetation.
          </p>
        </div>
    )}

    {isWolfClicked && currentText === 'consequences' && (
        <div className={`${styles.speciesInfo} ${isFading ? styles.fadeOut : ''}`}>
          <p>
          The Mexican wolf faces several threats that endanger its survival, such as habitat loss due to the expansion of agriculture and urbanization and direct persecution by ranchers.
          </p>
        </div>
    )}
    

    {isOrchidClicked && currentText === 'biodiversity' && (
        <div className={`${styles.speciesInfo} ${isFading ? styles.fadeOut : ''}`}>
          <p>
          Orchids are essential for biodiversity and ecological balance due to their unique adaptations to attract pollinators, such as insects. 
          Their study in biotechnology helps preserve threatened species and improve the quality of cultivated plants.
          </p>
        </div>
      )}
    
    {isOrchidClicked && currentText === 'consequences' && (
        <div className={`${styles.speciesInfo} ${isFading ? styles.fadeOut : ''}`}>
          <p>
          Orchids face several threats that endanger their survival, including the destruction of their habitat due to deforestation and agricultural expansion, illegal harvesting for the ornamental plant trade, and climate change, which alters necessary conditions for their growth and pollination. 
          These threats have led many orchid species to be in danger of extinction.
          </p>
        </div>
      )}


      {isCrocClicked && currentText === 'biodiversity' && (
        <div className={`${styles.speciesInfo} ${isFading? styles.fadeOut : ''}`}>
          <p>
          The Mindoro crocodile plays a vital role in the balance of the freshwater ecosystems where it lives. 
          As a top predator, it helps control populations of fish and other aquatic animals, maintaining the health of the ecosystem and preventing overpopulation of certain species.
          Additionally, by moving and building their nests, crocodiles help move nutrients and modify their environment in ways that benefit other species.
          </p>
        </div>
      )}

      {isCrocClicked && currentText === 'consequences' && (
        <div className={`${styles.speciesInfo} ${isFading? styles.fadeOut : ''}`}>
          <p>
          The Mindoro crocodile faces several threats that endanger its survival. These include the destruction of their habitat due to deforestation and the expansion of agriculture, 
          poaching for their skin and meat, and conflicts with humans, as some crocodiles may attack livestock or people.
          These threats have led the species to become critically endangered.
          </p>
        </div>
      )}

      {isCondorClicked && currentText === 'biodiversity' && (
        <div className={`${styles.speciesInfo} ${isFading? styles.fadeOut : ''}`}>
          <p>
          The California condor is an essential bird species for the biodiversity of North America. It is a highly social and cooperative species,
          which helps maintain the health of ecosystems by providing nesting sites for other birds and supporting the growth of other species.
          
          </p>
        </div>
      )}

      {isCondorClicked && currentText === 'consequences' && (
        <div className={`${styles.speciesInfo} ${isFading? styles.fadeOut : ''}`}>
          <p>
          The California Condor faces several threats that have put the species on the brink of extinction. The main threat is habitat loss due to urban development, 
          agriculture and infrastructure expansion, which reduces their nesting and feeding space. They are also vulnerable to lead contamination, as they ingest lead bullets when feeding on the carcasses of hunted animals,
          which causes poisoning. Additionally, poaching and human interference with their nests, along with low reproduction rates, have contributed to their drastic decline.
          </p>
        </div>
      )}

      
      {isFrogClicked && currentText === 'biodiversity' && (
        <div className={`${styles.speciesInfo} ${isFading? styles.fadeOut : ''}`}>
          <p>
          The Panama golden frog contributes to the ecosystem mainly by controlling populations of insects and other invertebrates, helping to maintain ecological balance and prevent pests.
          It acts as a bioindicator, reflecting the quality of the environment, since its health and presence alert about changes in the ecosystem, such as pollution or diseases. 
          It is also part of the food chain and its analysis contributes to the nutrient cycle, benefiting vegetation and other organisms in the environment.
          </p>
        </div>
      )}

      {isFrogClicked && currentText === 'consequences' && (
        <div className={`${styles.speciesInfo} ${isFading? styles.fadeOut : ''}`}>
          <p>
          The Panama golden frog faces several threats that endanger its survival. The loss of habitat due to deforestation and the expansion of agriculture has reduced their natural space, while climate change alters the conditions of their habitat.
          It has also been affected by illegal capture for the exotic pet trade, which has further worsened its situation. 
          These threats have led the golden frog to become critically endangered.
          </p>
        </div>
      )}

      {isButterflyClicked && currentText === 'biodiversity' && (
        <div className={`${styles.speciesInfo} ${isFading? styles.fadeOut : ''}`}>
          <p>
          Butterflies are essential for ecosystems because they act as pollinators, helping the reproduction of many wild plants and crops. 
          In addition, they are bioindicators, since their sensitivity to changes in the environment reflects the health of ecosystems. 
          They are also an important part of the food chain, serving as food for birds, reptiles and other insects.
          </p>
        </div>
      )}

      {isButterflyClicked && currentText === 'consequences' && (
        <div className={`${styles.speciesInfo} ${isFading? styles.fadeOut : ''}`}>
          <p>
          Butterflies are endangered mainly due to the loss of their habitat caused by deforestation, urbanization and intensive agriculture, 
          which destroy the plants they need for food and reproduction. Additionally, the use of pesticides and herbicides affects both butterflies and their food sources. 
          Pollution and the introduction of invasive species further aggravate their situation, displacing them from their natural ecosystems.
          </p>
        </div>
      )}
      
    </>
    
  )
}

export default Biodiversity
