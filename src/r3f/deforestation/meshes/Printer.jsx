import React, { forwardRef, useState } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import ToolTip from './HtmlToolTip'

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
        <ToolTip 
          position={[-0.45, -0.1, 0.3]} 
          text={'Double Click to Print'}
        />
      )}
    </group>
  )
})

// Add a display name for debugging purposes
Model.displayName = 'Printer'

export default Model

useGLTF.preload('/models-3d/deforestation/printer.glb')