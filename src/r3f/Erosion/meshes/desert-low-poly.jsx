import { useGLTF } from '@react-three/drei';
import React from 'react';

const Desert_low_poly = (props) => {
    const { nodes, materials } = useGLTF('/3d-models/canyon_cliff_face_low_poly.glb')
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
              />
              <mesh
                name="Object_3"
                castShadow
                receiveShadow
                geometry={nodes.Object_3.geometry}
                material={materials.material_0}
              />
              <mesh
                name="Object_4"
                castShadow
                receiveShadow
                geometry={nodes.Object_4.geometry}
                material={materials.material_0}
              />
              <mesh
                name="Object_5"
                castShadow
                receiveShadow
                geometry={nodes.Object_5.geometry}
                material={materials.material_0}
              />
              <mesh
                name="Object_6"
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials.material_0}
              />
              <mesh
                name="Object_7"
                castShadow
                receiveShadow
                geometry={nodes.Object_7.geometry}
                material={materials.material_0}
              />
            </group>
          </group>
        </group>
      </group>
    )
  }


useGLTF.preload('/3d-models/canyon_cliff_face_low_poly.glb');
export default Desert_low_poly;