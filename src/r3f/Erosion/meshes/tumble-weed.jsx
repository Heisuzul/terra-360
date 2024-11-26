import { useGLTF } from '@react-three/drei';
import React, { useCallback, useRef } from 'react';
import { RigidBody } from '@react-three/rapier';

const Tumbleweed = (props) => {
  const { nodes, materials } = useGLTF('/3d-models/tumbleweed.glb');
  const tumbleweedRef = useRef();

  const handleClick = useCallback(() => {
    tumbleweedRef.current.applyImpulse({x:0.00006,y:0.0009,z:0.00003},true);
  },[]);

  return (
    <RigidBody
      ref={tumbleweedRef}
      type="dynamic"
      colliders="ball"
      restitution={0.1}
      friction={3}
      {...props} onClick={handleClick}
    >
      <group dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane007_Material001_0.geometry}
          material={materials['Material.001']}
          rotation={[2.698, 0.155, 0.547]}
          scale={1}
           
        />
      </group>
    </RigidBody>
  );
};

useGLTF.preload('/3d-models/tumbleweed.glb');
export default Tumbleweed;

