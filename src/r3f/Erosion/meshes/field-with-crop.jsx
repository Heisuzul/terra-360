import { useGLTF } from '@react-three/drei';
import React from 'react';

const FieldWithCrops = (props) => {
    const { nodes, materials } = useGLTF('/3d-models/farm_v2_lowpoly.glb');
    return (
      <group {...props} dispose={null}>
        <group name="Sketchfab_Scene">
          <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
            <group name="Root">
              {/* Solo los cultivos y el terreno */}
              <group name="Wheat" position={[-1.853, -1.886, -0.037]} rotation={[0, 0, -Math.PI]}>
                <mesh
                  name="Wheat_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Wheat_0.geometry}
                  material={materials.Wheat}
                />
              </group>

              <group name="Soil" position={[0, 0, 0.996]}>
                <mesh
                  name="Soil_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Soil_0.geometry}
                  material={materials.Soil}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    )
}

useGLTF.preload('/3d-models/farm_v2_lowpoly.glb');
export default FieldWithCrops;
