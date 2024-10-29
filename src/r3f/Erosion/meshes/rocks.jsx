import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useMemo } from "react";

const Rocks = (props) => {
    const { nodes, materials } = useGLTF('/3d-models/low_poly_rocks_hills_trees.glb')

    const PATH = useMemo(() => "/materials/rock-texture/rock_boulder_cracked_", []);

    const rockTexture = useTexture({
        map: PATH + "diff_1k.jpg",
        //displacementMap: PATH + "disp_1k.png",
        normalMap: PATH + "nor_gl_1k.jpg",
        roughnessMap: PATH + "rough_1k.jpg",
        aoMap: PATH + "ao_1k.jpg",
    });

    return (
        <group {...props} dispose={null}>
            <group name="Sketchfab_Scene">
                <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
                    <group name="root">
                        <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
                            <group
                                name="small_rock_01_7"
                                position={[-1.895, 0, 4.862]}
                                rotation={[0, -Math.PI / 2, 0]}>
                                <mesh
                                    name="Object_18"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_18.geometry}
                                    material={materials.rock}
                                >

                                    <meshStandardMaterial
                                        map={rockTexture.map}
                                        normalMap={rockTexture.normalMap}
                                        aoMap={rockTexture.aoMap}
                                        roughnessMap={rockTexture.roughnessMap}
                                    //displacementMap={terrainTexture.displacementMap}
                                    />
                                </mesh>

                            </group>
                            
                            <group
                                name="small_rock_02_8"
                                position={[7.38, 0, 4.862]}
                                rotation={[0, -Math.PI / 2, 0]}>
                                <mesh
                                    name="Object_20"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_20.geometry}
                                    material={materials.rock}
                                    >

                                    <meshStandardMaterial
                                        map={rockTexture.map}
                                        normalMap={rockTexture.normalMap}
                                        aoMap={rockTexture.aoMap}
                                        roughnessMap={rockTexture.roughnessMap}
                                    //displacementMap={terrainTexture.displacementMap}
                                    />
                                </mesh>
                            </group>
                            <group
                                name="small_rock_03_9"
                                position={[2.546, 0, 4.862]}
                                rotation={[0, -Math.PI / 2, 0]}>
                                <mesh
                                    name="Object_22"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_22.geometry}
                                    material={materials.rock}
                                    >

                                    <meshStandardMaterial
                                        map={rockTexture.map}
                                        normalMap={rockTexture.normalMap}
                                        aoMap={rockTexture.aoMap}
                                        roughnessMap={rockTexture.roughnessMap}
                                    //displacementMap={terrainTexture.displacementMap}
                                    />
                                </mesh>
                            </group>

                            <group
                                name="big_rock_02_16"
                                position={[14.436, 0.175, -5.593]}
                                rotation={[0, -Math.PI / 2, 0]}
                                scale={[1.087, 1.822, 1.087]}>
                                <mesh
                                    name="Object_36"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_36.geometry}
                                    material={materials.rock}
                                    >

                                    <meshStandardMaterial
                                        map={rockTexture.map}
                                        normalMap={rockTexture.normalMap}
                                        aoMap={rockTexture.aoMap}
                                        roughnessMap={rockTexture.roughnessMap}
                                    //displacementMap={terrainTexture.displacementMap}
                                    />
                                </mesh>
                            </group>
                            <group
                                name="big_rock_03_17"
                                position={[-0.249, 0, -5.096]}
                                scale={[1.802, 2.561, 1.802]}>
                                <mesh
                                    name="Object_38"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Object_38.geometry}
                                    material={materials.rock}
                                    >

                                    <meshStandardMaterial
                                        map={rockTexture.map}
                                        normalMap={rockTexture.normalMap}
                                        aoMap={rockTexture.aoMap}
                                        roughnessMap={rockTexture.roughnessMap}
                                    //displacementMap={terrainTexture.displacementMap}
                                    />
                                </mesh>
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </group>
    )
}


useGLTF.preload('/3d-models/low_poly_rocks_hills_trees.glb');
export default Rocks;