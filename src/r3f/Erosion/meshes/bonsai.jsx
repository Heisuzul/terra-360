import { useGLTF } from '@react-three/drei';
import React from 'react';

const Bonsai = (props) => {
  const { nodes, materials } = useGLTF('/3d-models/stylized_bonsai_tree__free_download_stylized.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Tree_Color_Texture_0.geometry}
          material={materials.Color_Texture}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pot_Color_Texture_0.geometry}
          material={materials.Color_Texture}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/stylized_bonsai_tree__free_download_stylized.glb')
export default Bonsai;