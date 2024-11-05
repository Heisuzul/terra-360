import React, { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Model = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/printer.glb')
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
      />
    </group>
  )
})

// Add a display name for debugging purposes
Model.displayName = 'Printer'

export default Model

useGLTF.preload('/models-3d/deforestation/printer.glb')