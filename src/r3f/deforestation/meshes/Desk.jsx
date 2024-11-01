import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/desk.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        name="Cube001"
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        position={[0.211, 0.749, -0.172]}
      >
        <meshStandardMaterial attach="material" color="#917e6d"/>
      </mesh>
      <mesh
        name="Cube002"
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials.DESK}
        position={[0.177, 0.692, -0.138]}
      />
      <mesh
        name="Cube003"
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials.DESK}
        position={[0.36, 0.387, 0.771]}
      />
      <mesh
        name="Cube004"
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={materials.DESK}
        position={[-0.851, 0.387, -0.201]}
      />
      <mesh
        name="Cube005"
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={materials.DESK}
        position={[-0.851, 0.387, -0.699]}
      />
      <mesh
        name="Cube006"
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={materials.DESK}
        position={[0.857, 0.387, -0.699]}
      />
      <mesh
        name="Cube007"
        castShadow
        receiveShadow
        geometry={nodes.Cube007.geometry}
        material={materials.DESK}
        position={[0.857, 0.387, 0.771]}
      />
      <mesh
        name="Cube008"
        castShadow
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={materials.DESK}
        position={[0.003, 0.549, -0.708]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        name="Cube009"
        castShadow
        receiveShadow
        geometry={nodes.Cube009.geometry}
        material={materials.DESK}
        position={[0.866, 0.549, 0.123]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
      <mesh
        name="Cube011"
        castShadow
        receiveShadow
        geometry={nodes.Cube011.geometry}
        material={materials.DESK}
        position={[0.591, 0.403, 0.355]}
      />
      <mesh
        name="Cube012"
        castShadow
        receiveShadow
        geometry={nodes.Cube012.geometry}
        material={materials.DESK}
        position={[0.591, 0.142, 0.544]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        name="Cube013"
        castShadow
        receiveShadow
        geometry={nodes.Cube013.geometry}
        material={materials.DESK}
        position={[0.591, 0.664, 0.544]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        name="Cube010"
        castShadow
        receiveShadow
        geometry={nodes.Cube010.geometry}
        material={materials.DESK}
        position={[0.591, 0.403, 0.733]}
      />
      <mesh
        name="Cube014"
        castShadow
        receiveShadow
        geometry={nodes.Cube014.geometry}
        material={materials.DESK}
        position={[0.86, 0.403, 0.544]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
      />
      <mesh
        name="Cube015"
        castShadow
        receiveShadow
        geometry={nodes.Cube015.geometry}
        material={materials.DESK}
        position={[0.348, 0.403, 0.547]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
      />
      <mesh
        name="Plane"
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials.DESK}
        position={[0.341, 0.337, 0.41]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        name="Plane001"
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials.DESK}
        position={[0.341, 0.592, 0.547]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
      <mesh
        name="Cube016"
        castShadow
        receiveShadow
        geometry={nodes.Cube016.geometry}
        material={materials.DESK}
        position={[-0.871, 0.549, -0.457]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
    </group>
  )
}

useGLTF.preload('/models-3d/deforestation/desk.glb')