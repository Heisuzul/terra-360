import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useRef } from 'react';

const Farm = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF('/3d-models/low_poly_farm.glb');

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="beadf8b250b64465a768b373fe8d529bfbx" rotation={[Math.PI / 2, Math.PI , 0]} scale={[0.02, 0.02, 0.02]}>
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Ground"
                  position={[9.911, 27.57, -30.457]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[1.161, 1.161, 0.337]}>
                  <mesh
                    name="Ground_grass_2_0"
                    geometry={nodes.Ground_grass_2_0.geometry}
                    material={materials.grass_2}
                  />
                  <mesh
                    name="Ground_Grass_0"
                    geometry={nodes.Ground_Grass_0.geometry}
                    material={materials.Grass}
                  />
                  <mesh
                    name="Ground_05_-_Default_0"
                    geometry={nodes['Ground_05_-_Default_0'].geometry}
                    material={materials['05_-_Default']}
                  />
                  <mesh
                    name="Ground_Dirt2_0"
                    geometry={nodes.Ground_Dirt2_0.geometry}
                    material={materials.Dirt2}
                  />
                  <mesh
                    name="Ground_Dirt_0"
                    geometry={nodes.Ground_Dirt_0.geometry}
                    material={materials.Dirt}
                  />
                  <mesh
                    name="Ground_Dirt4_0"
                    geometry={nodes.Ground_Dirt4_0.geometry}
                    material={materials.Dirt4}
                  />
                  <mesh
                    name="Ground_grass_3_0"
                    geometry={nodes.Ground_grass_3_0.geometry}
                    material={materials.grass_3}
                  />
                  <mesh
                    name="Ground_grass_3_0_1"
                    geometry={nodes.Ground_grass_3_0_1.geometry}
                    material={materials.grass_3}
                  />
                  <mesh
                    name="Ground_grass_3_0_2"
                    geometry={nodes.Ground_grass_3_0_2.geometry}
                    material={materials.grass_3}
                  />
                  <mesh
                    name="Ground_barn_2_0"
                    geometry={nodes.Ground_barn_2_0.geometry}
                    material={materials.barn_2}
                  />
                  <mesh
                    name="Ground_03_-_Default_0"
                    geometry={nodes['Ground_03_-_Default_0'].geometry}
                    material={materials['03_-_Default']}
                  />
                  <mesh
                    name="Ground_11_-_Default_0"
                    geometry={nodes['Ground_11_-_Default_0'].geometry}
                    material={materials['11_-_Default']}
                  />
                  <mesh
                    name="Ground_barn_0"
                    geometry={nodes.Ground_barn_0.geometry}
                    material={materials.barn}
                  />
                  <mesh
                    name="Ground_08_-_Default_0"
                    geometry={nodes['Ground_08_-_Default_0'].geometry}
                    material={materials['08_-_Default']}
                  />
                  <mesh
                    name="Ground_metal_0"
                    geometry={nodes.Ground_metal_0.geometry}
                    material={materials.metal}
                  />
                  <mesh
                    name="Ground_23_-_Default_0"
                    geometry={nodes['Ground_23_-_Default_0'].geometry}
                    material={materials['23_-_Default']}
                  />
                  <mesh
                    name="Ground_14_-_Default_0"
                    geometry={nodes['Ground_14_-_Default_0'].geometry}
                    material={materials['14_-_Default']}
                  />
                  <mesh
                    name="Ground_Material_#4640_0"
                    geometry={nodes['Ground_Material_#4640_0'].geometry}
                    material={materials.Material_4640}
                  />
                  <mesh
                    name="Ground_yellow_2_0"
                    geometry={nodes.Ground_yellow_2_0.geometry}
                    material={materials.yellow_2}
                  />
                  <mesh
                    name="Ground_04_-_Default_0"
                    geometry={nodes['Ground_04_-_Default_0'].geometry}
                    material={materials['04_-_Default']}
                  />
                  <mesh
                    name="Ground_22_-_Default_0"
                    geometry={nodes['Ground_22_-_Default_0'].geometry}
                    material={materials['22_-_Default']}
                  />
                  <mesh
                    name="Ground_Pumpkin_0"
                    geometry={nodes.Ground_Pumpkin_0.geometry}
                    material={materials.Pumpkin}
                  />
                  <mesh
                    name="Ground_Pumpkin_0_1"
                    geometry={nodes.Ground_Pumpkin_0_1.geometry}
                    material={materials.Pumpkin}
                  />
                  <mesh
                    name="Ground_Pumpkin_0_2"
                    geometry={nodes.Ground_Pumpkin_0_2.geometry}
                    material={materials.Pumpkin}
                  />
                  <mesh
                    name="Ground_Pumpkin_0_3"
                    geometry={nodes.Ground_Pumpkin_0_3.geometry}
                    material={materials.Pumpkin}
                  />
                  <mesh
                    name="Ground_metal_2_0"
                    geometry={nodes.Ground_metal_2_0.geometry}
                    material={materials.metal_2}
                  />
                </group>
                <group
                  name="Object001"
                  position={[79.281, 57.245, -92.463]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[0.375, 0.352, 0.426]}>
                  <group name="Object_32" position={[0, -21.736, -70.016]}>
                    <mesh
                      name="Object001_metal_0"
                      geometry={nodes.Object001_metal_0.geometry}
                      material={materials.metal}
                    />
                  </group>
                </group>
                <group
                  name="Object002"
                  position={[-48.92, 58.097, -45.47]}
                  rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                  scale={[0.478, 0.784, 0.426]}>
                  <group name="Object_35" position={[-0.453, -27.776, -70.016]}>
                    <mesh
                      name="Object002_metal_0"
                      geometry={nodes.Object002_metal_0.geometry}
                      material={materials.metal}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('/3d-models/low_poly_farm.glb');
export default Farm;