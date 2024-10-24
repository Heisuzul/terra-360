import { useRef } from "react";

const Mountain = ({size=100, color="#a0a0a0", distance=-100, gap=1}) => {
  const floorRef = useRef();

  return (
    <mesh ref={floorRef} position={[gap, -1, distance]} rotation={[0,0,Math.PI*0.25]}>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial color={color}/>
    </mesh>
  );
};

export default Mountain;