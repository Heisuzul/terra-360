import { useGLTF } from '@react-three/drei';
import React, { useRef } from 'react';

const Tree = (props) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/3d-models/tree_animate.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Bark_9_2">
                <mesh
                  name="Object_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials.Bark}
                />
              </group>
              <group name="Leaf_6_3">
                <mesh
                  name="mesh_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_1.geometry}
                  material={materials.Leaf}
                  morphTargetDictionary={nodes.mesh_1.morphTargetDictionary}
                  morphTargetInfluences={nodes.mesh_1.morphTargetInfluences}
                />
                <mesh
                  name="mesh_1_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_1_1.geometry}
                  material={materials.Branch}
                  morphTargetDictionary={nodes.mesh_1_1.morphTargetDictionary}
                  morphTargetInfluences={nodes.mesh_1_1.morphTargetInfluences}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/3d-models/tree_animate.glb');
export default Tree;