import { useState, Suspense, useEffect, useRef } from 'react'
import styles from './Biodiversity.module.css'
import {Canvas, useFrame} from '@react-three/fiber'
import { Environment, OrbitControls, PerspectiveCamera, Text3D} from '@react-three/drei'
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
  const [showParticles, setShowParticles] = useState(false);
  const [showLeaves, setShowLeaves] = useState(true);
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
  const [currentText, setCurrentText] = useState('biodiversity');
  const [backgroundImage, setBackgroundImage] = useState('/images/backgrounds/biodiversity-background.jpg');
  const [lightSettings, setLightSettings] = useState({
    intensity: 0.9,
    color: '#ffc199',
  });
  const [preset, setPreset] = useState('sunset');
  

  const handleConsequencesClick = () => {
    setCurrentText('consequences');
    setBackgroundImage('/images/backgrounds/consequences-background.jpg');
    setLightSettings({ intensity: 0.05, color: '#121212' });
    setPreset('forest');
    setShowParticles(true);
  };

  const handleBiodiversityClick = () => {
    setCurrentText('biodiversity');
    setBackgroundImage('/images/backgrounds/biodiversity-background.jpg');
    setLightSettings({ intensity: 0.9, color: '#ffc199' });
    setPreset('sunset');
    setShowParticles(false);
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
    <Navbar onConsequencesClick={handleConsequencesClick} onBiodiversityClick={handleBiodiversityClick}/>
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
      <div className={`${styles.canvasContainer} ${styles.background}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Canvas shadowMap>
        <EffectComposer>
        <PerspectiveCamera ref={cameraRef} makeDefault fov={70} position={[10, -20, 150]} rotation={[-Math.PI / 6, 0, 0]} />
          <ambientLight intensity={lightSettings.intensity} color={lightSettings.color}/>
          <directionalLight position={[10, 20, 100]} intensity={0.5} castShadow shadow-camera-far={50}/>
          <OrbitControls minDistance={2} maxDistance={170} maxPolarAngle={Math.PI * 0.567} minPolarAngle={-100} />
          <Suspense fallback={null}>
            <Forest color='hotpink'/>
            <Text3D
            position={[-25, 0, 100]}
            rotation={[0, 0.1, 0]}
            font="/fonts/TiltWarp-Regular.json"
            scale={10}
            >
            WELCOME
            <meshStandardMaterial attach="material" color="#81d84d" />
            </Text3D>
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
      
    </>
    
  )
}

export default Biodiversity
