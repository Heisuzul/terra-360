import { OrbitControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useState } from "react";

const CameraController = ({ 
  target, 
  position, 
  minDistance = 3, 
  maxDistance = 55, 
  transitionDuration = 1000,
  isControlsEnabled = true 
}) => {
  const { camera } = useThree();
  const controlsRef = useRef();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const startTime = useRef(0);
  
  const startPosition = useRef(new THREE.Vector3());
  const startTarget = useRef(new THREE.Vector3());
  const endPosition = useRef(new THREE.Vector3(position.x, position.y, position.z));
  const endTarget = useRef(new THREE.Vector3(target.x, target.y, target.z));

  useEffect(() => {
    if (!controlsRef.current) return;
    
    startPosition.current.copy(camera.position);
    startTarget.current.copy(controlsRef.current.target);
    
    endPosition.current.set(position.x, position.y, position.z);
    endTarget.current.set(target.x, target.y, target.z);
    
    startTime.current = performance.now();
    setIsTransitioning(true);
  }, [target, position]);

  useFrame(() => {
    if (!isTransitioning || !controlsRef.current) return;

    const elapsed = performance.now() - startTime.current;
    const progress = Math.min(elapsed / transitionDuration, 1);
    const eased = easeInOutCubic(progress);

    camera.position.lerpVectors(startPosition.current, endPosition.current, eased);
    controlsRef.current.target.lerpVectors(startTarget.current, endTarget.current, eased);
    
    controlsRef.current.update();

    if (progress === 1) {
      setIsTransitioning(false);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping={true}
      dampingFactor={0.05}
      enabled={!isTransitioning /*&& isControlsEnabled*/}
      enableZoom={true}
      enablePan={false}
      enableRotate={isControlsEnabled}
      minDistance={minDistance}
      maxDistance={maxDistance}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2}
    />
  );
};

const easeInOutCubic = (t) => {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export default CameraController;