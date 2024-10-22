import { useGLTF } from '@react-three/drei';
import React from 'react';

const Low_poly_field = (props) => {
    const { nodes, materials } = useGLTF('/3d-models/level_low_poly_field.glb')
  return (
    <group {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="e09415a8c7cc45099d439da552d91f2cfbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="RootNode">
              <group
                name="Cylinder"
                position={[0, 25.864, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 437.767]}>
                <mesh
                  name="Cylinder_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder001"
                position={[0, 25.864, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 437.767]}>
                <mesh
                  name="Cylinder001_Tronco_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder001_Tronco_0.geometry}
                  material={materials.Tronco}
                />
                <mesh
                  name="Cylinder001_Ojas_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder001_Ojas_0.geometry}
                  material={materials.Ojas}
                />
              </group>
              <group
                name="Plane"
                position={[91.817, 27.679, 367.035]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={12673.568}>
                <mesh
                  name="Plane_PisoGrama_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane_PisoGrama_0.geometry}
                  material={materials.PisoGrama}
                />
              </group>
              <group
                name="Sun"
                position={[91.817, -176.537, 367.035]}
                rotation={[2.546, -1.316, 2.31]}
                scale={100}>
                <group name="Object_12" rotation={[Math.PI / 2, 0, 0]}>
                  <group name="Object_13" />
                </group>
              </group>
              <group
                name="Icosphere"
                position={[579.097, 83.206, 1418.369]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[202.524, 100, 100]}>
                <mesh
                  name="Icosphere_Rock_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Icosphere_Rock_0.geometry}
                  material={materials.Rock}
                />
              </group>
              <group
                name="Icosphere001"
                position={[1709.196, 99.105, 1371.706]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[157.075, 158.037, 158.037]}>
                <mesh
                  name="Icosphere001_Rock_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Icosphere001_Rock_0.geometry}
                  material={materials.Rock}
                />
              </group>
              <group
                name="Cylinder002"
                position={[3256.238, 19.441, 137.598]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 437.767]}>
                <mesh
                  name="Cylinder002_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder002_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder002_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder002_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Icosphere002"
                position={[-1252.587, 174.735, 1050.855]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[407.578, 410.074, 410.074]}>
                <mesh
                  name="Icosphere002_Rock_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Icosphere002_Rock_0.geometry}
                  material={materials.Rock}
                />
              </group>
              <group
                name="Cylinder003"
                position={[2993.895, -160.9, -123.477]}
                rotation={[-1.563, -0.106, 0.025]}
                scale={[136.776, 136.776, 598.76]}>
                <mesh
                  name="Cylinder003_Tronco_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder003_Tronco_0.geometry}
                  material={materials.Tronco}
                />
                <mesh
                  name="Cylinder003_Ojas_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder003_Ojas_0.geometry}
                  material={materials.Ojas}
                />
              </group>
              <group
                name="Cylinder004"
                position={[-7417.823, 25.864, -7225.652]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 437.767]}>
                <mesh
                  name="Cylinder004_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder004_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder004_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder004_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder005"
                position={[-6533.833, 25.864, -7302.521]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 437.767]}>
                <mesh
                  name="Cylinder005_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder005_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder005_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder005_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder006"
                position={[-7302.52, 25.864, -6303.229]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 437.767]}>
                <mesh
                  name="Cylinder006_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder006_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder006_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder006_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder007"
                position={[-6264.793, 25.864, -6034.188]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 585.966]}>
                <mesh
                  name="Cylinder007_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder007_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder007_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder007_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder008"
                position={[-5534.542, 25.864, -6764.44]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[135.686, 135.686, 593.989]}>
                <mesh
                  name="Cylinder008_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder008_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder008_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder008_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder009"
                position={[-4266.208, 25.864, -8301.813]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[119.991, 119.991, 525.28]}>
                <mesh
                  name="Cylinder009_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder009_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder009_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder009_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder010"
                position={[-4150.906, 581.035, -10261.963]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 437.767]}>
                <mesh
                  name="Cylinder010_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder010_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder010_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder010_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder011"
                position={[-3651.26, 25.864, -9608.579]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 437.767]}>
                <mesh
                  name="Cylinder011_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder011_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder011_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder011_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder012"
                position={[-3343.785, 25.864, -7802.166]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 437.767]}>
                <mesh
                  name="Cylinder012_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder012_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder012_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder012_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder013"
                position={[-2805.705, 25.864, -9032.064]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 437.767]}>
                <mesh
                  name="Cylinder013_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder013_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder013_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder013_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder014"
                position={[-2075.453, 25.864, -8647.721]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 437.767]}>
                <mesh
                  name="Cylinder014_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder014_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder014_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder014_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder015"
                position={[-1229.898, 25.864, -8801.459]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 437.767]}>
                <mesh
                  name="Cylinder015_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder015_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder015_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder015_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder016"
                position={[-2651.967, 25.864, -8186.51]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 437.767]}>
                <mesh
                  name="Cylinder016_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder016_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder016_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder016_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder017"
                position={[-1191.463, 25.864, -7994.338]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 437.767]}>
                <mesh
                  name="Cylinder017_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder017_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder017_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder017_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder018"
                position={[-192.171, 25.864, -8493.984]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 437.767]}>
                <mesh
                  name="Cylinder018_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder018_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder018_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder018_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder019"
                position={[499.647, 25.864, -8993.63]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 437.767]}>
                <mesh
                  name="Cylinder019_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder019_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder019_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder019_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder020"
                position={[807.121, 25.864, -7840.601]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 437.767]}>
                <mesh
                  name="Cylinder020_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder020_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder020_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder020_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder021"
                position={[-4842.724, 25.864, -7648.429]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 437.767]}>
                <mesh
                  name="Cylinder021_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder021_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder021_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder021_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder022"
                position={[722.257, 0.544, -245.99]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 682.543]}>
                <mesh
                  name="Cylinder022_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder022_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder022_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder022_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
              <group
                name="Cylinder023"
                position={[281.371, 19.673, -640.26]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[71.518, 71.518, 313.081]}>
                <mesh
                  name="Cylinder023_Ojas001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder023_Ojas001_0.geometry}
                  material={materials['Ojas.001']}
                />
                <mesh
                  name="Cylinder023_Tronco001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder023_Tronco001_0.geometry}
                  material={materials['Tronco.001']}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}


useGLTF.preload('/level_low_poly_field.glb');
export default Low_poly_field;