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
import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import { Physics } from '@react-three/rapier'

const World = forwardRef(( { handleBoxClick, cameraStatesSet, target, cameraPosition }, ref ) => {
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

  return (
    <div className={styles.pageContainer}>
      <div className={styles.canvasContainer}>
      <Canvas className={styles.canvas}>
        <Staging/>
        <CameraController target={target} position={cameraPosition} />
        <ambientLight intensity={2}/>
        <directionalLight position={[0, 10, 10]}/>
        {/* <FlyControls movementSpeed={10} rollSpeed={0.5} /> */}
        <Physics>
          <Floor color={"#9ACD32"}/>
          <Floor color={"#CD853F"} width={4} height={-0.4}/>

        {TreePositions.map((position, index) => (
          <>
            {showTrees && <Tree key={index} position={position} scale={1} /*onRemove={handleTreeRemoval}*/ popTrees={popTrees} setPopTrees={setPopTrees}/>}
          </>
        ))}
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
        >
          SELECT
          <meshStandardMaterial attach="material" color="white" />
        </Text3D>
        <LittleWorld 
          position={[0, 10, 0]} 
          onClick={(event) => {
            handleBoxClick(cameraStatesSet[0].position, cameraStatesSet[0].target, event);
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
        <OrangeBird scale={1.5} position={[0.4,-0.4,21]}  
          onClick={(event) => {
            handleBoxClick(cameraStatesSet[2].position, cameraStatesSet[2].target, event);
          }}/>
      </Canvas>
      </div>
    </div>
  )
});

export default World;