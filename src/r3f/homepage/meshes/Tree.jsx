/* eslint-disable react/no-unknown-property */
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";


const Tree = ({position}) => {
  const boxRef = useRef();
  // console.log(boxRef);
  const coneRef = useRef();
  // console.log(coneRef);
  const coneRef1 = useRef();
  // console.log(coneRef1);
  const coneRef2 = useRef();
  // console.log(coneRef2);

  // useFrame((state, delta) => {
  //   boxRef.current.rotation.y += 1 * delta;
  // });

  useFrame((state, delta) => {
    coneRef.current.rotation.y += 0.2 * delta;
    coneRef1.current.rotation.y += 0.2 * delta;
    coneRef2.current.rotation.y += 0.2 * delta;
  });

  return (
    <group position={position}>
      <mesh
        ref={coneRef}
        position={[0, 3, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
        scale={1.5}
        >
        <coneGeometry args={[1.27, 4, 6]} />
        <meshStandardMaterial color={"#6B8E23"} />
      </mesh>
      <mesh
        ref={coneRef1}
        position={[0, 3.5, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
        scale={1.5}
        >
        <coneGeometry args={[1.15, 3, 6]} />
        <meshStandardMaterial color={"#6B8E23"} />
      </mesh>
      <mesh
        ref={coneRef2}
        position={[0, 4, 0]}
        rotation={[0, Math.PI * 0.25, 0]}
        scale={1.5}
        >
        <coneGeometry args={[1.10, 2.5, 6]} />
        <meshStandardMaterial color={"#6B8E23"} />
      </mesh>
      <mesh ref={boxRef}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"#D2691E"} />
      </mesh>
    </group>
  );
}

export default Tree;