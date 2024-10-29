import { useGLTF } from '@react-three/drei';
import React from 'react';

const Tumbleweed = (props) => {
  const { nodes, materials } = useGLTF('/3d-models/tumbleweed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007_Material001_0.geometry}
        material={materials['Material.001']}
        rotation={[2.698, 0.155, 0.547]}
        scale={1}
      />
    </group>
  )
}


useGLTF.preload('/tumbleweed.glb');
export default Tumbleweed;