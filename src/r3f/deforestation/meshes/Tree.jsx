import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";

const Tree = ({ position, scale }) => {
  const boxRef = useRef();
  const coneRef = useRef();
  const coneRef1 = useRef();
  const coneRef2 = useRef();
  // const leavesColor = "#6B8E23";
  const leavesColor = "#5a781e";


  useFrame((state, delta) => {
    coneRef.current.rotation.y += 0.2 * delta;
    coneRef1.current.rotation.y += 0.2 * delta;
    coneRef2.current.rotation.y += 0.2 * delta;
  });

  return (
    <RigidBody type="fixed" collider="cuboid">
      <group position={position}>
        <mesh
          ref={coneRef}
          position={[0, 3, 0]}
          rotation={[0, Math.PI * 0.25, 0]}
          scale={scale}
          castShadow
        >
          <coneGeometry args={[1.27, 4, 6]} />
          <meshStandardMaterial color={leavesColor} />
        </mesh>
        <mesh
          ref={coneRef1}
          position={[0, 3.5, 0]}
          rotation={[0, Math.PI * 0.25, 0]}
          scale={scale}
          castShadow
        >
          <coneGeometry args={[1.15, 3, 6]} />
          <meshStandardMaterial color={leavesColor} />
        </mesh>
        <mesh
          ref={coneRef2}
          position={[0, 4, 0]}
          rotation={[0, Math.PI * 0.25, 0]}
          scale={scale}
          castShadow
        >
          <coneGeometry args={[1.10, 2.5, 6]} />
          <meshStandardMaterial color={leavesColor} />
        </mesh>
        <mesh 
          ref={boxRef} 
          position={[0, 0.5, 0]} 
          scale={scale}
          castShadow
        >
          <boxGeometry args={[0.5, 1, 0.5]} />
          <meshStandardMaterial color="#D2691E" />
        </mesh>
      </group>
    </RigidBody>
  );
}

export default Tree;