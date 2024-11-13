import React, { useState, useEffect, useRef } from 'react';
import { Html } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import styles from './causes-text-erosion.module.css'; // Asumiendo que tienes los estilos

/**
 * DescriptionTextErosion component displays an informational text overlay in the 3D scene.
 * - Uses drei's Html component to render HTML content in 3D space.
 * - Positioned at a fixed location within the 3D scene to provide context or details.
 * - Styles are applied using CSS modules for custom appearance.
 */
const CausesTextErosion = () => {
    const { camera } = useThree();
    const [isVisible, setIsVisible] = useState(false);

    const targetPosition = new THREE.Vector3(0.33, 0.58, 0.11);

    const targetPositionRef = useRef(targetPosition.clone());

    useFrame(() => {
        const isAtTargetPosition = camera.position.distanceTo(targetPositionRef.current) < 0.01;
        setIsVisible(isAtTargetPosition);
    });

    return (
        isVisible && (
            <Html position={[0.43, 0.53, 0.05]} center>
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

export default CausesTextErosion;