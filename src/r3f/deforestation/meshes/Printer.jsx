import React, { forwardRef, useState } from 'react'
import { useGLTF, Html } from '@react-three/drei'

const Model = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/printer.glb')
  const [isHovered, setIsHovered] = useState(false);
  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}  // Add the ref here
        castShadow
        receiveShadow
        geometry={nodes.node_id46.geometry}
        material={materials['69']}
        position={[0, -0.193, 0.232]}
        scale={0.05}
        onPointerOver={() => {
          setIsHovered(true);
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setIsHovered(false);
          document.body.style.cursor = 'auto'
        }}
      />
      {isHovered && (
        <Html position={[-0.45, -0.1, 0.3]} center>
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid black',
            padding: '5px',
            borderRadius: '5px',
            textAlign: 'center',
            fontSize: '11px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            pointerEvents: 'none'
          }}>
            Double Click to Print
          </div>
        </Html>
      )}
    </group>
  )
})

// Add a display name for debugging purposes
Model.displayName = 'Printer'

export default Model

useGLTF.preload('/models-3d/deforestation/printer.glb')