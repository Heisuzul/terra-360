import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function WitheredFlowers(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models-3d/biodiversity/flowers/flowers.glb')

  // Clonamos los materiales originales para modificarlos sin afectar el archivo original
  const witheredMaterials = {
    lowPoly_flor34: materials.lowPoly_flor34.clone(),
    'lowPoly_flor33.001': materials['lowPoly_flor33.001'].clone(),
    'lowPoly_flor33.002': materials['lowPoly_flor33.002'].clone(),
    lowPoly_flor33: materials.lowPoly_flor33.clone(),
    lowPoly_flor32: materials.lowPoly_flor32.clone(),
    'lowPoly_flor32.001': materials['lowPoly_flor32.001'].clone(),
    'lowPoly_flor32.002': materials['lowPoly_flor32.002'].clone(),
    lowPoly_flor31: materials.lowPoly_flor31.clone(),
    'lowPoly_flor31.001': materials['lowPoly_flor31.001'].clone(),
    'lowPoly_flor31.002': materials['lowPoly_flor31.002'].clone(),
    'lowPoly_flor31.003': materials['lowPoly_flor31.003'].clone(),
    lowPoly_flor130: materials.lowPoly_flor130.clone(),
    'lowPoly_flor130.002': materials['lowPoly_flor130.002'].clone(),
    'lowPoly_flor130.001': materials['lowPoly_flor130.001'].clone(),
    lowPoly_flor26: materials.lowPoly_flor26.clone(),
    'lowPoly_flor26.001': materials['lowPoly_flor26.001'].clone(),
  }

  // Modificar los colores para un aspecto marchito (por ejemplo, tonos más apagados)
  witheredMaterials.lowPoly_flor34.color.set(0x7f7f7f) // Gris apagado
  witheredMaterials['lowPoly_flor33.001'].color.set(0x8b4513) // Marrón
  witheredMaterials['lowPoly_flor33.002'].color.set(0x8b4513) // Marrón
  witheredMaterials.lowPoly_flor33.color.set(0x6b8e23) // Verde apagado
  witheredMaterials.lowPoly_flor32.color.set(0x556b2f) // Verde oscuro
  witheredMaterials['lowPoly_flor32.001'].color.set(0x556b2f) // Verde oscuro
  witheredMaterials['lowPoly_flor32.002'].color.set(0x556b2f) // Verde oscuro
  witheredMaterials.lowPoly_flor31.color.set(0x8b4513) // Marrón
  witheredMaterials['lowPoly_flor31.001'].color.set(0x8b4513) // Marrón
  witheredMaterials['lowPoly_flor31.002'].color.set(0x8b4513) // Marrón
  witheredMaterials['lowPoly_flor31.003'].color.set(0x8b4513) // Marrón
  witheredMaterials.lowPoly_flor130.color.set(0x4b0082) // Púrpura oscuro
  witheredMaterials['lowPoly_flor130.002'].color.set(0x4b0082) // Púrpura oscuro
  witheredMaterials['lowPoly_flor130.001'].color.set(0x4b0082) // Púrpura oscuro
  witheredMaterials.lowPoly_flor26.color.set(0x8b4513) // Marrón
  witheredMaterials['lowPoly_flor26.001'].color.set(0x8b4513) // Marrón

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group position={[0, 0, -1774.42]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh geometry={nodes.Cylinder009_lowPoly_flor34_0.geometry} material={witheredMaterials.lowPoly_flor34} />
          </group>
          <group position={[-126.7, 0, -1637.86]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.Cylinder013_lowPoly_flor33001_0.geometry}
              material={witheredMaterials['lowPoly_flor33.001']}
            />
          </group>
          <group position={[-261.88, 0, -1637.86]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.Cylinder014_lowPoly_flor33002_0.geometry}
              material={witheredMaterials['lowPoly_flor33.002']}
            />
          </group>
          <group position={[3.4, 0, -1637.86]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh geometry={nodes.Cylinder015_lowPoly_flor33_0.geometry} material={witheredMaterials.lowPoly_flor33} />
          </group>
          <group position={[-23.38, 84.22, -1449.36]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh geometry={nodes.Cylinder010_lowPoly_flor32_0.geometry} material={witheredMaterials.lowPoly_flor32} />
          </group>
          <group position={[-174.33, 84.22, -1504.49]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.Cylinder011_lowPoly_flor32001_0.geometry}
              material={witheredMaterials['lowPoly_flor32.001']}
            />
          </group>
          <group position={[-287.21, 84.22, -1502.52]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.Cylinder012_lowPoly_flor32002_0.geometry}
              material={witheredMaterials['lowPoly_flor32.002']}
            />
          </group>
          <group position={[0, 0, -1339.24]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh geometry={nodes.Circle009_lowPoly_flor31_0.geometry} material={witheredMaterials.lowPoly_flor31} />
          </group>
          <group position={[-83.2, 0, -1339.24]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh geometry={nodes.Circle001_lowPoly_flor31001_0.geometry} material={witheredMaterials['lowPoly_flor31.001']} />
          </group>
          <group position={[-162.56, 0, -1339.24]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh geometry={nodes.Circle002_lowPoly_flor31002_0.geometry} material={witheredMaterials['lowPoly_flor31.002']} />
          </group>
          <group position={[-250.03, 0, -1339.24]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh geometry={nodes.Circle003_lowPoly_flor31003_0.geometry} material={witheredMaterials['lowPoly_flor31.003']} />
          </group>
          <group position={[0, 0, -1227.6]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh geometry={nodes.Cylinder002_lowPoly_flor130_0.geometry} material={witheredMaterials.lowPoly_flor130} />
          </group>
          <group position={[-93.26, 0, -1227.6]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.Cylinder007_lowPoly_flor130002_0.geometry}
              material={witheredMaterials['lowPoly_flor130.002']}
            />
          </group>
          <group position={[-195.9, 0, -1227.6]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.Cylinder008_lowPoly_flor130001_0.geometry}
              material={witheredMaterials['lowPoly_flor130.001']}
            />
          </group>
          <group position={[0, 0, -1146.69]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh geometry={nodes.Cylinder_lowPoly_flor26_0.geometry} material={witheredMaterials.lowPoly_flor26} />
          </group>
          <group position={[-67.58, 0, -1146.69]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
            <mesh
              geometry={nodes.Cylinder006_lowPoly_flor26001_0.geometry}
              material={witheredMaterials['lowPoly_flor26.001']}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/biodiversity/flowers/flowers.glb')
