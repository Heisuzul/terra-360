import { OrbitControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";


// const CameraController = ({ target, position }) => {
//     const { camera } = useThree();
//     const controlsRef = useRef();
  
//     useEffect(() => {
//       if (position && controlsRef.current) {
//         // Update camera position
//         camera.position.set(position.x, position.y, position.z);
//         camera.updateProjectionMatrix();
//       }
  
//       if (target && controlsRef.current) {
//         // Update OrbitControls target
//         controlsRef.current.target.set(target.x, target.y, target.z);
//         controlsRef.current.update();
//         camera.lookAt(target.x, target.y, target.z);
//       }
//     }, [target, position, camera]);
  
//     return (
//       <OrbitControls 
//         ref={controlsRef}
//         enableDamping={true}
//         dampingFactor={0.05}
//       />
//     );
//   };

const CameraController = ({ target, position }) => {
  const { camera } = useThree();
  const controlsRef = useRef();
  
  // Create ref for smooth interpolation
  const cameraTarget = useRef(new THREE.Vector3(target.x, target.y, target.z));
  const cameraPosition = useRef(new THREE.Vector3(position.x, position.y, position.z));

  useEffect(() => {
    // When target or position props change, set the ref to new values
    cameraTarget.current.set(target.x, target.y, target.z);
    cameraPosition.current.set(position.x, position.y, position.z);
  }, [target, position]);

  useFrame(() => {
    // Smooth interpolation for camera position and look-at target
    camera.position.lerp(cameraPosition.current, 0.05);  // Smoothly interpolate position
    controlsRef.current.target.lerp(cameraTarget.current, 0.05); // Smoothly interpolate look-at target
    controlsRef.current.update();  // Update controls
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping={true}
      dampingFactor={0.05}
    />
  );
};


  export default CameraController;