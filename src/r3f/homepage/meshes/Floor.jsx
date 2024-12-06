import { useRef } from "react";
import { RigidBody } from "@react-three/rapier";

const Floor = ({width=100, color="#a0a0a0", height=-0.5}) => {
  const floorRef = useRef();

  return (
    <RigidBody type="fixed">
      <mesh ref={floorRef} position={[0, height, 0]} rotation={[Math.PI*1.5,0,0]} receiveShadow>
        <planeGeometry args={[width, 300]} />
        <meshStandardMaterial color={color} roughness={0.8}/>
      </mesh>
    </RigidBody>
  );
};

export default Floor;

