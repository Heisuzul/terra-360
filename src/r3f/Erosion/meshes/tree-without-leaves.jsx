import { useGLTF } from '@react-three/drei';
import React from 'react';

const Tree = (props) => {
    const { nodes, materials } = useGLTF('/3d-models/tree_without_leaves_low_poly.glb')
    return (
      <group {...props} dispose={null}>
        <group name="Sketchfab_Scene">
          <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
            <group name="8bce807a5fb14bee92f75140ebc5248dfbx" rotation={[Math.PI / 2, 0, 0]}>
              <group name="RootNode">
                <group
                  name="tree"
                  position={[1792.652, 0, -484.969]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}>
                  <mesh
                    name="tree_twig_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.tree_twig_0.geometry}
                    material={materials.twig}
                  />
                  <mesh
                    name="tree_plamatisate_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.tree_plamatisate_0.geometry}
                    material={materials.plamatisate}
                  />
                </group>
                <group
                  name="Tree"
                  position={[0, 0, 33.664]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}>
                  <mesh
                    name="Tree__0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Tree__0.geometry}
                    material={materials.Tree__0}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    )
    }
  
  useGLTF.preload('/3d-models/tree_without_leaves_low_poly.glb')
export default Tree;