import { Canvas } from "@react-three/fiber";
import { Text3D } from '@react-three/drei'
import Tree from "../meshes/Tree";
import Leaf from "../meshes/Leaf";
import Floor from "../meshes/Floor";
import Mountain from "../meshes/Mountain";
import LittleWorld from "../meshes/LittleWorld";
import CameraController from "../controllers/CameraController";
import styles from './World.module.css'
import Staging from '../staging/Staging'
import { useState, useEffect } from 'react'

const World = ( { onSelect } ) => {
  const relativePosition = 25;

  // const [target, setTarget] = useState({ x: 0, y: 0, z: 20 });
  const [target, setTarget] = useState({ x: 0, y: 10, z: 0 });
  // const [cameraPosition, setCameraPosition] = useState({ x: 1, y: 0.7, z: 25 });
  const [cameraPosition, setCameraPosition] = useState({ x: 1, y: 10.7, z: 5 });
  
  const handleBoxClick = (newTarget, event) => {
    setTarget(newTarget);
    setCameraPosition({ x: newTarget.x + 1, y: newTarget.y + 0.7, z: newTarget.z + 5 });
    event.stopPropagation();
  };

  useEffect(() => {
    if ( target.x === 0 && target.y === 0 && target.z === 20 ) {
      onSelect(true);
    } else {
      onSelect(false);
    }
  }, [onSelect, target]);

  const generateTreePositions = (rows, cols, spacing, roadRow) => {
    const positions = [];
    const halfRows = Math.floor(rows / 2);
    const halfCols = Math.floor(cols / 2);

    for (let x = -halfCols; x <= halfCols; x++) {
      for (let z = -halfRows; z <= halfRows; z++) {
        // Check if the position is in the central road row
        if (x === roadRow) {
          continue; // Skip this position to leave it empty
        }
        positions.push([x * spacing + Math.pow(-1,z), 0, z * spacing + Math.pow(-1,z)]);
      }
    }
    return positions;
  };

  const TreePositions = generateTreePositions(20, 15, 4.5, 0);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.canvasContainer}>
      <Canvas className={styles.canvas}>
        <Staging/>
        <CameraController target={target} position={cameraPosition} />
        <ambientLight intensity={2}/>
        <directionalLight position={[0, 10, 10]}/>
        {/* <FlyControls movementSpeed={10} rollSpeed={0.5} /> */}

        <Floor color={"#9ACD32"}/>
        <Floor color={"#CD853F"} width={4} height={-0.4}/>

        {TreePositions.map((position, index) => (
          <Tree key={index} position={position} />
        ))}

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
            handleBoxClick({
              x: 0,
              y: 10,
              z: 0
            }, event);
          }}
          onPointerMissed={(event) => {
            handleBoxClick({
              x: 0,
              y: 0,
              z: 20
            }, event);
          }}
        />
      </Canvas>
      </div>
    </div>
  )
};

export default World;