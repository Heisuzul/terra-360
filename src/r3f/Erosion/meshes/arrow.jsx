import { useGLTF } from '@react-three/drei';
import React from 'react';

const Arrow = (props) => {
const { nodes, materials } = useGLTF('/3d-models/arrow.glb')
return (
  <group {...props} dispose={null}>
    <group name="Sketchfab_Scene">
      <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0.099, -Math.PI / 2]} scale={0.061}>
        <group name="root">
          <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
            <group name="arrow_0" position={[0, -1, 0]}>
              <mesh
                name="Object_4"
                castShadow
                receiveShadow
                geometry={nodes.Object_4.geometry}
                material={materials['tex-global']}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  </group>
)
}

useGLTF.preload('/arrow.glb')
export default Arrow;