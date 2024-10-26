import { useRef, useState } from "react";
import { useFrame, useThree } from '@react-three/fiber';

function CameraLogger() {
  const { camera } = useThree();
  const [lastLogged, setLastLogged] = useState(0); // Track the last logged time
  const delay = 1000; // Log the camera position every 1000ms (1 second)
  const timer = useRef(0); // Ref to hold the timer

  useFrame(() => {
    // Get the current time
    const currentTime = performance.now();

    // If the time since last log exceeds the delay, log the camera position
    if (currentTime - lastLogged > delay) {
      console.log("Camera position:", camera.position);
      console.log("Camera rotation:", camera.rotation);

      setLastLogged(currentTime); // Update the last logged time
    }
  });

  return null; // No visual output needed
}

export default CameraLogger;