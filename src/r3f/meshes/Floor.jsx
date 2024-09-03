import { useRef } from "react";

const Floor = ({width=100, color="#a0a0a0", height=-0.5}) => {
  const floorRef = useRef();

  return (
    <mesh ref={floorRef} position={[0, height, 0]} rotation={[Math.PI*1.5,0,0]}>
      <planeGeometry args={[width, 300]} />
      <meshStandardMaterial color={color}/>
    </mesh>
  );
};

export default Floor;

