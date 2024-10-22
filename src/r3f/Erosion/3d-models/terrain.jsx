import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useMemo } from "react";

const Terrain = (props) => {

  const { nodes, materials } = useGLTF('/3d-models/soil-erosion.glb');

  const PATH = useMemo(() => "/materials/terrain-soil-erosion/rock_face_", []);

  const terrainTexture = useTexture({
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
          <group name="Mesherobjcleanermaterialmergergles">
            <mesh
              name="Object_2"
              castShadow
              receiveShadow
              geometry={nodes.Object_2.geometry}
              material={materials.material_0}
            >
              
              <meshStandardMaterial
                map={terrainTexture.map}
                normalMap={terrainTexture.normalMap}
                aoMap={terrainTexture.aoMap}
                roughnessMap={terrainTexture.roughnessMap}
                //displacementMap={terrainTexture.displacementMap}
              />
            </mesh>
            <mesh
              name="Object_3"
              castShadow
              receiveShadow
              geometry={nodes.Object_3.geometry}
              material={materials.material_0}
            >
              
              <meshStandardMaterial
                map={terrainTexture.map}
                normalMap={terrainTexture.normalMap}
                aoMap={terrainTexture.aoMap}
                roughnessMap={terrainTexture.roughnessMap}
                //displacementMap={terrainTexture.displacementMap}
              />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('/3d-models/soil-erosion.glb');
export default Terrain;