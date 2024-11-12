import React, { useState, useEffect, useRef } from 'react';
import { Html } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import styles from './description-text-erosion.module.css';

/**
 * DescriptionTextErosion component displays an informational text overlay in the 3D scene.
 * - Uses drei's Html component to render HTML content in 3D space.
 * - Positioned at a fixed location within the 3D scene to provide context or details.
 * - Styles are applied using CSS modules for custom appearance.
 */
const DescriptionTextErosion = () => {
    const { camera } = useThree();
    const [isVisible, setIsVisible] = useState(true);

    const initialCameraPosition = new THREE.Vector3(0.52, 0.42, 0.24);

    const initialPositionRef = useRef(initialCameraPosition.clone());

    useFrame(() => {
        const isAtInitialPosition = camera.position.distanceTo(initialPositionRef.current) < 0.01;
        setIsVisible(isAtInitialPosition);
    });

    return (
        isVisible && (
            <Html position={[0.5, 0.4, 0.2]} center>
                <div className={styles.introductionDiv}>
                    <p className={styles.introductionText}>
                        Soil erosion is a critical environmental issue that occurs when natural forces, like wind and water, wear away topsoil—the fertile upper layer essential for plant growth. This process can strip land of nutrients, reduce agricultural productivity, and lead to habitat destruction. Factors such as deforestation, overgrazing, and poor land management practices accelerate erosion, impacting food security and contributing to climate change. Addressing soil erosion is essential for sustaining ecosystems, supporting agriculture, and protecting our planet’s resources for future generations.
                    </p>
                </div>
            </Html>
        )
    );
};

export default DescriptionTextErosion;
