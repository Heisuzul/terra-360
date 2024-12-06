import { Canvas } from "@react-three/fiber";
import { Text3D } from '@react-three/drei'
import Tree from "../meshes/Tree";
import Leaf from "../meshes/Leaf";
import Floor from "../meshes/Floor";
import Mountain from "../meshes/Mountain";
import LittleWorld from "../meshes/LittleWorld";
import CameraController from "../controllers/CameraController";
import OrangeBird from "../../deforestation/meshes/OrangeBird";
import styles from './World.module.css'
import Staging from '../staging/Staging'
import { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { Physics } from '@react-three/rapier'
import DirectionalLight from "../../deforestation/lights/DirectionalLight";
import Desk from "../../deforestation/meshes/Desk";
import Laptop from "../../deforestation/meshes/Laptop";
import Printer from "../../deforestation/meshes/Printer";

const World = forwardRef(( { handleBoxClick, target, cameraPosition }, ref ) => {
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

  const growTrees = () => {
    setShowTrees(!showTrees);
    console.log("GrowREF", showTrees)
    counter.current = 0;
    // handleTreeReset();
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
      }
      console.log("Counter", counter.current);
      console.log("REF", popTrees);
  };

  // Use `useImperativeHandle` to expose a function to the parent component
  useImperativeHandle(ref, () => ({
    puffTrees,
    growTrees,
  }));

  const printerRef = useRef();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.canvasContainer}>
      <Canvas shadows className={styles.canvas}>
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
            <>
              {showTrees && <Tree key={index} position={position} scale={1} /*onRemove={handleTreeRemoval}*/ popTrees={popTrees} setPopTrees={setPopTrees}/>}
            </>
          ))}

          <Desk position={[-5.7, -0.6, -49.2]} rotation={[0,-Math.PI*2/3,0]}/>
          <Laptop scale={1.3} handleTreesGrow={growTrees} handleTreesPop={puffTrees} externalRefs={[printerRef]} position={[-5.65, 0.15, -48.6]} rotation={[0,-Math.PI*11/12,0]} screenToRender={2}/>
          <Printer ref={printerRef} position={[-6.6, 0.34, -48.7]} rotation={[0,-Math.PI*7/6,0]}/>
        </Physics>

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
            if (!isCameraAtTargetPosition(cameraPosition)) {
              document.body.style.cursor = 'auto'
            } else {
              document.body.style.cursor = 'pointer'
            }
          }}
        />
        <OrangeBird scale={1.5} position={[2.2,1.46,20.1]} rotation={[0,-Math.PI*0.8/12,0]}
          onClick={(event) => {
            handleBoxClick(2, event);
          }}/>
      </Canvas>
      </div>
    </div>
  )
});

export default World;