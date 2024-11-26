import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useSpring, a } from "@react-spring/three";
import { PositionalAudio } from "@react-three/drei";

const Tree = ({ position, scale }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showPuff, setShowPuff] = useState(false);
  const boxRef = useRef();
  const coneRef = useRef();
  const coneRef1 = useRef();
  const coneRef2 = useRef();
  const audioRef = useRef();
  const leavesColor = "#5a781e";


  useFrame((state, delta) => {
    if (coneRef.current && coneRef1.current && coneRef2.current) {
    coneRef.current.rotation.y += 0.2 * delta;
    coneRef1.current.rotation.y += 0.2 * delta;
    coneRef2.current.rotation.y += 0.2 * delta;
    }
  });

  const handleCollision = () => {
    setIsVisible(false);
    setShowPuff(true);
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.playbackRate = Math.random() * 0.5 + 0.75; // Random playback rate between 0.75 and 1.25
      audio.play();
    }
    setTimeout(() => {
      setShowPuff(false);
    }, 500); // Puff effect duration in milliseconds
  };

  const puffSpring = useSpring({
    scale: showPuff ? [3, 3, 3] : [0, 0, 0],
    opacity: showPuff ? 0.0 : 0.8,
    config: { duration: 500 },
  });

  return (
    
      <group position={position}>
        {isVisible && 
        <>
          <RigidBody type="fixed" collider="cuboid" onCollisionEnter={handleCollision}>
          <mesh
            ref={coneRef}
            position={[0, 3, 0]}
            rotation={[0, Math.PI * 0.25, 0]}
            scale={scale}
            castShadow
          >
            <coneGeometry args={[1.27, 4, 6]} />
            <meshStandardMaterial color={leavesColor} />
          </mesh>
          <mesh
            ref={coneRef1}
            position={[0, 3.5, 0]}
            rotation={[0, Math.PI * 0.25, 0]}
            scale={scale}
            castShadow
          >
            <coneGeometry args={[1.15, 3, 6]} />
            <meshStandardMaterial color={leavesColor} />
          </mesh>
          <mesh
            ref={coneRef2}
            position={[0, 4, 0]}
            rotation={[0, Math.PI * 0.25, 0]}
            scale={scale}
            castShadow
          >
            <coneGeometry args={[1.10, 2.5, 6]} />
            <meshStandardMaterial color={leavesColor} />
          </mesh>
          </RigidBody>
        </>
        }
        {showPuff && (
          <a.mesh position={[0, 3, 0]} scale={puffSpring.scale}>
            <sphereGeometry args={[1, 32, 32]} />
            <a.meshStandardMaterial color="white" transparent opacity={puffSpring.opacity} />
          </a.mesh>
        )}
        <PositionalAudio ref={audioRef} url="/sounds/muffled-sound-of-falling.mp3" distance={1} loop={false} />
        <mesh 
          ref={boxRef} 
          position={[0, 0.5, 0]} 
          scale={scale}
          castShadow
        >
          <boxGeometry args={[0.5, 1, 0.5]} />
          <meshStandardMaterial color="#D2691E" />
        </mesh>
        <mesh 
          position={[0, 0.56, 0]} 
          scale={scale*0.9}
          castShadow
        >
          <boxGeometry args={[0.5, 1, 0.5]} />
          <meshStandardMaterial color="#e8a15a" />
        </mesh>
      </group>
  );
}

export default Tree;