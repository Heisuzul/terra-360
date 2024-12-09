import { Canvas } from "@react-three/fiber";
import { Text3D } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three';
import Tree from "../meshes/Tree";
import Leaf from "../meshes/Leaf";
import Floor from "../meshes/Floor";
import Mountain from "../meshes/Mountain";
import LittleWorld from "../meshes/LittleWorld";
import CameraController from "../controllers/CameraController";
import OrangeBird from "../../deforestation/meshes/OrangeBird";
import styles from './World.module.css'
import Staging from '../staging/Staging'
import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react'
import { Physics } from '@react-three/rapier'
import DirectionalLight from "../../deforestation/lights/DirectionalLight";
import Desk from "../../deforestation/meshes/Desk";
import Laptop from "../../deforestation/meshes/Laptop";
import Printer from "../../deforestation/meshes/Printer";
import FloatingText from "../../deforestation/meshes/FloatingText";
import Flowers from "../../biodiversity/flowers/Flowers"
import Bee from "../../biodiversity/bee/Bee"
// import { Bloom, EffectComposer, HueSaturation, BrightnessContrast } from '@react-three/postprocessing'

const World = forwardRef(( { handleBoxClick, cameraIndex, target, cameraPosition, deforestationPointsRef, biodiversityPointsRef, erosionPointsRef, storedPoints, showInstructions, setDeforestationPoints }, ref ) => {
  const relativePosition = 25;

  // Generates the positions of the trees in the world.
  const generateTreePositions = (rows, cols, spacing, roadRow) => {
    const positions = [];
    const halfRows = Math.floor(rows / 2);
    const halfCols = Math.floor(cols / 2);

    for (let x = -halfCols; x <= halfCols; x++) {
      for (let z = -halfRows; z <= halfRows; z++) {
        if (x === roadRow) {
          continue;
        }
        positions.push([x * spacing + Math.pow(-1,z), -0.8, z * spacing + Math.pow(-1,z)]);
      }
    }
    return positions;
  };

  const TreePositions = generateTreePositions(20, 15, 4.5, 0);

  const isCameraAtTargetPosition = (cameraPosition) =>
    cameraPosition.x === 1 && cameraPosition.y === 10.7 && cameraPosition.z === 6;
  
 

  //Logic related to the animation of the trees when they are cut
  // -----------------------------------------------------------------
  const [popTrees, setPopTrees] = useState(false)
  const [showTrees, setShowTrees] = useState(true)
  const counter = useRef(0)
  // const [removedTrees, setRemovedTrees] = useState(0);
  const puffTreesCountRef = useRef(0);
  const growTreesCountRef = useRef(0);

  const growTrees = () => {
    setShowTrees(!showTrees);
    console.log("GrowREF", showTrees)
    counter.current = 0;
    // handleTreeReset();
    growTreesCountRef.current += 1;
  }

  // const handleTreeRemoval = () => {
  //   setRemovedTrees(prev => prev + 1);
  // };

  // const handleTreeReset = () => {
  //   setRemovedTrees(0);
  // };

  // const intensity = (removedTrees / 221); // Adjust the multiplier as needed

  const puffTrees = () => {
      if (counter.current < 1) {
          counter.current += 1;
          setPopTrees(true);
          if (puffTreesCountRef.current < 3) {
            puffTreesCountRef.current += 1;
          }
      }
      console.log("Counter", counter.current);
      console.log("REF", popTrees);
  };

  const [treeScale, setTreeScale] = useState(1);

  const correctAnswerDeforestation = () => {
    if (treeScale === 1) {
      setTreeScale(1.2);
    }

    if (deforestationPointsRef.current < 25) {
      if (puffTreesCountRef.current === 0) {
        deforestationPointsRef.current = 25;
      } else if (puffTreesCountRef.current <= 3) {
        deforestationPointsRef.current = 25 - puffTreesCountRef.current * 5;
      }
      console.log("Deforestation points:", deforestationPointsRef.current);
    }
    setDeforestationPoints(deforestationPointsRef.current);
  }

  // reset the points when the user restarts the quiz
  const resetPointsRefs = () => {
    deforestationPointsRef.current = 0;
    biodiversityPointsRef.current = 0;
    erosionPointsRef.current = 0;
    puffTreesCountRef.current = 0;
    setTreeScale(1);
  }

  // Use `useImperativeHandle` to expose a function to the parent component
  useImperativeHandle(ref, () => ({
    puffTrees,
    growTrees,
  }));

  const printerRef = useRef();
  const floatingTextRef1 = useRef();
  const floatingTextRef2 = useRef();

  if (floatingTextRef1.current) {
    floatingTextRef1.current.visible = true;
  }
  if (floatingTextRef2.current) {
    floatingTextRef2.current.visible = true;
  }

  //Biodiversity Section
  const isCameraAtBiodiversityPosition = (cameraPosition) =>
    cameraPosition.x === 11.5 && cameraPosition.y === 0.5 && cameraPosition.z === -50.5;
  const [showFlowers, setShowFlowers] = useState(false);
  const [clicked, setClicked] = useState(false);

  const flowerAnimation = useSpring({
    positionY: showFlowers && clicked ? -0.4 : -3, // Aparece en -0.4
    config: { tension: 300, friction: 25 }, // Velocidad ajustada
  });

  const handleOptionClick = (option) => {
    if (option === "B") {
      setShowFlowers(true);
      biodiversityPointsRef.current = 25;
      console.log("Biodiversity points:", biodiversityPointsRef.current);
    }
  };
  
  const animationProps = useSpring({
    positionY: clicked ? 0 : 3, // Desde Y=3 (arriba) hacia Y=0 (posición original)
    config: { tension: 100, friction: 30 },
  });

  const handleClick = () => {
    setClicked(true);
  };

  useEffect(() => {
    if (!isCameraAtBiodiversityPosition(cameraPosition)) {
      setClicked(false);
      setShowFlowers(false);
    }
  }, [isCameraAtBiodiversityPosition(cameraPosition)]);


  return (
    <div className={styles.pageContainer}>
      <div className={styles.canvasContainer}>
      <Canvas shadows className={styles.canvas}>
        {/* <EffectComposer>
          <HueSaturation hue={0.01} saturation={0.01} />
          <BrightnessContrast contrast={0.1} />
          <Bloom intensity={0.05}/>
        </EffectComposer> */}
        <Staging/>
        <CameraController target={target} position={cameraPosition} />
        <ambientLight intensity={2}/>
        <DirectionalLight position={[0, 10, 10]} intensity={2} shadowCamera = {{
            near: -64,
            far: 64,            // Increase far value to encompass larger scenes
            left: -40,          // Half of the plane size
            right: 40,
            top: 40,
            bottom: -40
        }}/>
        <Physics>
          <Floor color={"#9ACD32"} />
          <Floor color={"#CD853F"} width={4} height={-0.49}/>
          {TreePositions.map((position, index) => (
            <React.Fragment key={index}>
              {showTrees && <Tree key={index} position={position} scale={treeScale} /*onRemove={handleTreeRemoval}*/ popTrees={popTrees} setPopTrees={setPopTrees}/>}
            </React.Fragment>
          ))}
          <Desk 
            // className={styles.magnifierCursorOut}
            // onClick={(event) => {
            //   handleBoxClick(2, event);
            //   document.body.style.cursor = 'auto'
            // }}
            // onPointerOver={() => {
            //   document.body.style.cursor = 'zoom-out';
            // }}
            // onPointerOut={() => {
            //   document.body.style.cursor = 'auto'
            // }}
            position={[-5.7, -0.6, -49.2]} 
            rotation={[0,-Math.PI*2/3,0]}
          />
          <Laptop
            pointer={cameraIndex === 2? 'zoom-in' : 'zoom-out'}
            onClick={(event) => {
              if (cameraIndex === 2) {
                handleBoxClick(3, event);
                document.body.style.cursor = 'zoom-out'
              } else if (cameraIndex === 3) {
                handleBoxClick(2, event);
                document.body.style.cursor = 'zoom-in'
              }
            }} 
            scale={1.3} 
            handleTreesGrow={growTrees} 
            handleTreesPop={puffTrees} 
            handleCorrectAnswer={correctAnswerDeforestation} 
            externalRefs={[printerRef]} position={[-5.65, 0.15, -48.6]} 
            rotation={[0,-Math.PI*11/12,0]} screenToRender={2}
          />
          <Printer ref={printerRef} position={[-6.6, 0.34, -48.7]} rotation={[0,-Math.PI*7/6,0]}/>
        </Physics>

        {/* Biodiversity 3D Elements */}
        <DirectionalLight position={[10, 15, -50]} intensity={1} shadowCamera = {{
            near: -5,
            far: 5,            // Increase far value to encompass larger scenes
            left: 5,          // Half of the plane size
            right: 5,
            top: 5,
            bottom: -5
        }}/>
        <Bee scale={0.1} position={[11, 0, -46.5]} baseY={-0.3} rotation={[0.17,2.7,0]} />
        <Flowers position={[18.65, -0.4, -47.99]} rotation={[0,1.5,0]} scale={0.5}/>

        <animated.group position-y={animationProps.positionY}>
        <Text3D
            position={[13.4, 2, -46.6]}
            rotation={[-0.07, 3.02, 0]}
            font="/fonts/TiltWarp-Regular.json"
            scale={0.2}
            castShadow
        >  
        What do bees do for the ecosystem?
        <meshStandardMaterial color="#d1ffb4" />
        </Text3D>
        <Text3D
            position={[14.5, 1.3, -46.6]}
            rotation={[-0.07, 3.02, 0.1]}
            font="/fonts/TiltWarp-Regular.json"
            scale={0.11}
            onPointerOver={() => {document.body.style.cursor = "pointer"}}
            onPointerOut={() => {document.body.style.cursor = "default"}}
            castShadow
        >  
        A. Eat leaves to maintain balance.
        <meshStandardMaterial color="#ff8787" roughness={0.2}/>
        </Text3D>
        <Text3D
            position={[12.5, 1.15, -46.6]}
            rotation={[-0.07, 3.02, 0]}
            font="/fonts/TiltWarp-Regular.json"
            scale={0.11}
            onPointerOver={() => {document.body.style.cursor = "pointer"}}
            onPointerOut={() => {document.body.style.cursor = "default"}}
            onClick={() => handleOptionClick("B")}
            castShadow
        >  
        B. Pollinate flowers and crops
        <meshStandardMaterial color="#e681ff" roughness={0.2}/>
        </Text3D>
        <Text3D
            position={[10.5, 1.6, -46.6]}
            rotation={[-0.07, 3.02, -0.1]}
            font="/fonts/TiltWarp-Regular.json"
            scale={0.11}
            onPointerOver={() => {document.body.style.cursor = "pointer"}}
            onPointerOut={() => {document.body.style.cursor = "default"}}
            castShadow
        >  
        C. Produce honey to feed all the animals
        <meshStandardMaterial color="#ffa560" roughness={0.2}/>
        </Text3D>
        </animated.group>

        {showFlowers && (
        <>
          <animated.group position-y={flowerAnimation.positionY}>
            <Flowers position={[16.65, 0, -47.99]} rotation={[0, 1.5, 0]} scale={0.5} />
            <Flowers position={[20.65, 0, -47.99]} rotation={[0, 1.5, 0]} scale={0.5} />
          </animated.group>
          <Bee scale={0.1} position={[14, 0, -48]} baseY={-0.3} rotation={[0,5.5,0]} />
          <Bee scale={0.1} position={[9.5, 0, -47.5]} baseY={-0.3} rotation={[0.17,2.7,0]} />
        </>
      )}


        <Leaf distance={-1+relativePosition} speed={1} amplitude={1} frequency={2} boundary={5} />
        <Leaf distance={-5+relativePosition} direction={-1} speed={2} amplitude={1} frequency={2} boundary={5} />
        <Leaf distance={-10+relativePosition} height={6} direction={1} speed={0.5} amplitude={3} frequency={0.5} boundary={10} />
        <Leaf distance={-8+relativePosition} height={5} direction={1} speed={1} amplitude={2} frequency={0.5} boundary={8} />
        <Leaf distance={-6+relativePosition} height={3} direction={-1} speed={1} amplitude={2} frequency={0.5} boundary={6} />
        <Leaf distance={3+relativePosition} height={1} direction={-1} speed={1} amplitude={1} frequency={0.5} boundary={3} />

        <Leaf distance={-1} speed={1} amplitude={1} frequency={2} boundary={5} />
        <Leaf distance={-5} direction={-1} speed={2} amplitude={1} frequency={2} boundary={5} />
        <Leaf distance={-10} height={6} direction={1} speed={0.5} amplitude={3} frequency={0.5} boundary={10} />
        <Leaf distance={-8} height={5} direction={1} speed={1} amplitude={2} frequency={0.5} boundary={8} />
        <Leaf distance={-6} height={3} direction={-1} speed={1} amplitude={2} frequency={0.5} boundary={6} />
        <Leaf distance={3} height={1} direction={-1} speed={1} amplitude={1} frequency={0.5} boundary={3} />

        <Leaf distance={-1+relativePosition*0.5} speed={1} amplitude={1} frequency={2} boundary={5} />
        <Leaf distance={-5+relativePosition*0.5} direction={-1} speed={2} amplitude={1} frequency={2} boundary={5} />
        <Leaf distance={-10+relativePosition*0.5} height={6} direction={1} speed={0.5} amplitude={3} frequency={0.5} boundary={10} />
        <Leaf distance={-8+relativePosition*0.5} height={5} direction={1} speed={1} amplitude={2} frequency={0.5} boundary={8} />
        <Leaf distance={-6+relativePosition*0.5} height={3} direction={-1} speed={1} amplitude={2} frequency={0.5} boundary={6} />
        <Leaf distance={3+relativePosition*0.5} height={1} direction={-1} speed={1} amplitude={1} frequency={0.5} boundary={3} />

        <Leaf distance={-1-relativePosition*2} speed={1} amplitude={1} frequency={2} boundary={5} />
        <Leaf distance={-5-relativePosition*2} direction={-1} speed={2} amplitude={1} frequency={2} boundary={5} />
        <Leaf distance={-10-relativePosition*2} height={6} direction={1} speed={0.5} amplitude={3} frequency={0.5} boundary={10} />
        <Leaf distance={-8-relativePosition*2} height={5} direction={1} speed={1} amplitude={2} frequency={0.5} boundary={8} />
        <Leaf distance={-6-relativePosition*2} height={3} direction={-1} speed={1} amplitude={2} frequency={0.5} boundary={6} />
        <Leaf distance={3-relativePosition*2} height={1} direction={-1} speed={1} amplitude={1} frequency={0.5} boundary={3} />

        <Mountain size={20} color={"#98FB98"} distance={-100} gap={1} />
        <Mountain size={22} color={"#98FB98"} distance={-120} gap={-20} />
        <Mountain size={22} color={"#98FB98"} distance={-120} gap={20} />
        <Mountain size={25} color={"#98FB98"} distance={-140} gap={30} />
        <Mountain size={25} color={"#98FB98"} distance={-140} gap={-30} />

        <Text3D
            position={[-2, 0.5, 20]}
            font="/fonts/TiltWarp-Regular.json"
            castShadow
        >
          SELECT
          <meshStandardMaterial color="white" roughness={0.2}/>
        </Text3D>
        <LittleWorld 
          position={[0, 10, 0]} 
          onClick={(event) => {
            handleBoxClick(0, event);
            document.body.style.cursor = 'auto'
          }}
          onPointerOver={() => {
            if (!isCameraAtTargetPosition(cameraPosition)) {
              document.body.style.cursor = 'pointer'
            } else {
              document.body.style.cursor = 'auto'
            }
          }}
          onPointerOut={() => {
              document.body.style.cursor = 'auto'
          }}
        />
        <OrangeBird scale={1.5} position={[2.2,1.46,20.1]} rotation={[0,-Math.PI*0.8/12,0]}
          onClick={(event) => {
            showInstructions(true);
            if (storedPoints > 0) {
              resetPointsRefs();
            }
          }}/>
        {!storedPoints > 0 ? <FloatingText ref={floatingTextRef1} onClick={(event) => {showInstructions(true)}} text={'Start Quiz'} position={[1,1.75,20.1]} rotationDelta={3.4} scale={1.1} color={'#db7500'} emissive={'#db7500'} emissiveIntensity={0}/>
          : <FloatingText ref={floatingTextRef2} onClick={(event) => {showInstructions(true); resetPointsRefs()}} text={`You have ${storedPoints} points. Restart Quiz?`} position={[-0.8,1.75,20.1]} color={'#db7500'} emissive={'#db7500'} emissiveIntensity={0} rotationDelta={3.4} scale={1}/>}
      </Canvas>
      </div>
      {isCameraAtBiodiversityPosition(cameraPosition) && (
      <>
        {!clicked ? (
          <div className={styles.bioInfo} onClick={handleClick}>
            <p>
              Imagine a world without bees: without the buzz among the flowers, without fresh fruits on your table and with landscapes devoid of color and life.
              In this quiz, we will test your knowledge about these wonderful insects. 
              <span className={styles.highlightText}> Can you save a bee and help preserve the balance of our ecosystem?</span>
            </p>
            <p className={styles.continueText}>
              <em>Click <b>Here</b> to continue...</em>
            </p>
          </div>
        ) : (
          <div className={`${styles.newBioInfo} ${clicked ? styles.fadeOut : ''}`} >
            <p>
            Answer correctly and show that you are a guardian of biodiversity. Good luck!
            </p>
          </div>
        )}
      </>
    )}
    </div>
  )
});

export default World;