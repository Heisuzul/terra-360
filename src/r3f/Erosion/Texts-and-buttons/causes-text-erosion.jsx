import React, { useState, useEffect, useRef } from 'react';
import { Html } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import styles from './causes-text-erosion.module.css';  // Assuming you have custom styles

/**
 * CausesTextErosion component displays an informational text overlay in the 3D scene.
 * - Uses drei's Html component to render HTML content in 3D space.
 * - Positioned at a fixed location within the 3D scene to provide context or details.
 * - Styles are applied using CSS modules for custom appearance.
 */

const CausesTextErosion = () => {
    const { camera } = useThree();  // Access the camera object from the 3D scene
    const [isVisible, setIsVisible] = useState(false);  // State to toggle visibility based on camera position

    const targetPosition = new THREE.Vector3(0.33, 0.58, 0.11);  // Position to trigger the display of text
    const targetPositionRef = useRef(targetPosition.clone());  // Store the target position reference for comparison

    // `useFrame` hook is used to check the camera's distance from the target position on each frame
    useFrame(() => {
        // Check if the camera is close enough to the target position
        const isAtTargetPosition = camera.position.distanceTo(targetPositionRef.current) < 0.02;
        setIsVisible(isAtTargetPosition);  // Set visibility based on camera's distance
    });

    return (
        // If the camera is close to the target position, render the text in 3D space
        isVisible && (
            <Html position={[0.43, 0.52, 0.05]} center>  {/* Renders HTML content at the specified position */}
                <div className={styles.causesDiv}>
                    <p className={styles.causesText}>
                        Soil erosion is a natural process, but human activities have significantly accelerated it, 
                        causing widespread environmental and agricultural problems.
                        The main human causes of soil erosion include deforestation, agricultural practices, and urban development. <br /><br />
                        When forests are cleared for farming or construction, the protective vegetation is removed, 
                        leaving soil exposed to wind and rain. 
                        Agricultural practices like plowing, overgrazing, and monoculture farming also degrade the soil, 
                        making it more vulnerable to erosion. 
                        Overuse of land, improper irrigation, and the use of heavy machinery compact the soil, 
                        reducing its ability to absorb water and increasing runoff. <br /><br />
                        Urbanization, including road-building and mining, further disturbs the land and accelerates erosion. 
                        These human activities disrupt the natural balance of ecosystems, leading to the loss of fertile topsoil, 
                        reduced agricultural productivity, and increased flooding and water pollution. <br /><br />
                        Sustainable land management practices are essential to combat soil erosion and protect the environment.
                    </p>
                </div>
            </Html>
        )
    );
};

export default CausesTextErosion;  // Export the CausesTextErosion component
