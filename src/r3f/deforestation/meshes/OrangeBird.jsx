import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models-3d/deforestation/orange-bird.glb')
  const { actions } = useAnimations(animations, group)

  const birdRef = useRef()

  console.log(actions)

  useEffect(() => {
    actions["anim"].play()
    return () => actions["anim"].stop()
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" ref={birdRef} rotation={[-Math.PI / 2, 0, 0]} scale={46.683}>
          <group
            name="bfb1ea86655f4c4ab4c6cbbb449cedf4fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.001}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="BirdOrange_all">
                  <group name="Main" position={[-0.083, 0, 0.451]} rotation={[0, -0.074, 0]}>
                    <group name="Object_6">
                      <primitive object={nodes._rootJoint} />
                      <skinnedMesh
                        name="Object_51"
                        geometry={nodes.Object_51.geometry}
                        material={materials.BirdOrange_LMB}
                        skeleton={nodes.Object_51.skeleton}
                      />
                      <group name="Object_50" />
                    </group>
                  </group>
                  <group name="Geometry">
                    <group name="BirdOrange" />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/deforestation/orange-bird.glb')