import React, { useState, useRef } from 'react';
import { Html } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import styles from './solutions-text-erosion.module.css';

/**
 * SolutionsTextErosion component displays an informational text overlay in the 3D scene.
 * - Uses drei's Html component to render HTML content in 3D space.
 * - Positioned at a fixed location within the 3D scene to provide solutions context.
 * - Text appears only when the camera reaches a specific position.
 */
const SolutionsTextErosion = () => {
    const { camera } = useThree(); // Access the camera object from the 3D scene
    const [isVisible, setIsVisible] = useState(false); // State to toggle visibility based on camera position

    // Target position for the camera
    const targetPosition = new THREE.Vector3(0.099, 0.641, 1.121);
    const targetPositionRef = useRef(targetPosition.clone());

    // Check the camera's position in each frame
    useFrame(() => {
        const isAtTargetPosition = camera.position.distanceTo(targetPositionRef.current) < 0.01;
        setIsVisible(isAtTargetPosition);
    });

    return (
        // Render text only if the camera is at the target position
        isVisible && (
            <Html position={[0.0, 0.6, 1.15]} center>
                <div className={styles.solutionsDiv}>
                    <p className={styles.solutionsText}>
                        Addressing soil erosion requires a combination of sustainable practices and education 
                        to minimize its impact on the environment. 
                        Key solutions include reforestation, conservation agriculture, and controlled grazing practices. <br /><br />
                        Reforestation involves planting trees and vegetation to stabilize soil, reduce water runoff, 
                        and increase the soil's ability to retain moisture. 
                        Conservation agriculture focuses on minimal soil disturbance through practices like no-till farming 
                        and crop rotation, which maintain soil structure and fertility. <br /><br />
                        Implementing proper irrigation systems, such as drip irrigation, prevents overwatering and soil erosion. 
                        Constructing terraces on slopes and using contour plowing can also reduce runoff in hilly areas. 
                        Additionally, reducing urban sprawl and employing green infrastructure can help mitigate erosion in developed areas. <br /><br />
                        Education and policy-making are crucial to promote these sustainable practices, ensuring long-term soil conservation 
                        and ecosystem balance for future generations.
                    </p>
                </div>
            </Html>
        )
    );
};

export default SolutionsTextErosion; // Export the SolutionsTextErosion component