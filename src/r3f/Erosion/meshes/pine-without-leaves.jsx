import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useMemo } from "react";


const Pine = (props) => {
  const { nodes, materials } = useGLTF('/3d-models/pine_tree_low_poly.glb')

  const PATH = useMemo(() => "/materials/pine-texture/pine_bark_", []);

  const pineTexture = useTexture({
    map: PATH + "diff_1k.jpg",
    //displacementMap: PATH + "disp_1k.png",
    normalMap: PATH + "nor_gl_1k.jpg",
    roughnessMap: PATH + "rough_1k.jpg",
    aoMap: PATH + "ao_1k.jpg",
  });

  return (
    <group {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="ef1db22ac1e044b18c5e3fbb8af05929fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="RootNode">

              <group
                name="Tree001"
                position={[0, 0, -36.067]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={337.987}>
                <mesh
                  name="Tree001__0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Tree001__0.geometry}
                  material={materials['Tree.001__0']}
                >

                  <meshStandardMaterial
                    map={pineTexture.map}
                    normalMap={pineTexture.normalMap}
                    aoMap={pineTexture.aoMap}
                    roughnessMap={pineTexture.roughnessMap}
                  //displacementMap={terrainTexture.displacementMap}
                  />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/3d-models/pine_tree_low_poly.glb')
export default Pine;