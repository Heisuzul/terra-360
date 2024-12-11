import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useSpring, a } from "@react-spring/three";
import { PositionalAudio } from "@react-three/drei";

const Tree = ({ position, scale, onRemove, setPuffedTreesCountRef }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showPuff, setShowPuff] = useState(false);
  const [animationsActive, setAnimationsActive] = useState(true);
  const boxRef = useRef();
  const coneRef = useRef();
  const coneRef1 = useRef();
  const coneRef2 = useRef();
  const audioRef = useRef();
  const leavesColor = "#5a781e";

  const [spring, api] = useSpring(() => ({
      position: [position.x, position.y - 5, position.z], // Start below the ground
      scale: [0.1, 0.1, 0.1], // Start small
      config: { tension: 200, friction: 20 },
      onRest: () => setAnimationsActive(false), // Disable animations once finished
  }));

  useEffect(() => {
      api.start({ position: [position.x, position.y, position.z], scale: [scale, scale, scale] }); // Animate to the final position and scale
  }, [api, position, scale]);

  const [coneSpring1, coneApi1] = useSpring(() => ({
      scale: [0.1, 0.1, 0.1], // Start small
      config: { tension: 200, friction: 20 },
      delay: 200, // Small delay for the first cone
      onRest: () => setAnimationsActive(false), // Disable animations once finished
  }));

  const [coneSpring2, coneApi2] = useSpring(() => ({
      scale: [0.1, 0.1, 0.1], // Start small
      config: { tension: 200, friction: 20 },
      delay: 400, // Small delay for the second cone
      onRest: () => setAnimationsActive(false), // Disable animations once finished
  }));

  const [coneSpring3, coneApi3] = useSpring(() => ({
      scale: [0.1, 0.1, 0.1], // Start small
      config: { tension: 200, friction: 20 },
      delay: 600, // Small delay for the third cone
      onRest: () => setAnimationsActive(false), // Disable animations once finished
  }));

  useEffect(() => {
      coneApi1.start({ scale: [scale, scale, scale] });
      coneApi2.start({ scale: [scale, scale, scale] });
      coneApi3.start({ scale: [scale, scale, scale] });
  }, [coneApi1, coneApi2, coneApi3, scale]);

  const [boxSpring, boxApi] = useSpring(() => ({
      scale: [0.1, 0.1, 0.1], // Start small
      config: { tension: 200, friction: 20 },
      onRest: () => setAnimationsActive(false), // Disable animations once finished
  }));

  useEffect(() => {
      boxApi.start({ scale: [scale, scale, scale] }); // Animate to the final scale
  }, [boxApi, scale]);

  useFrame(() => {
      if (animationsActive) {
          if (boxRef.current) {
              boxRef.current.scale.set(...boxSpring.scale.get());
          }
          if (coneRef.current) {
              coneRef.current.scale.set(...coneSpring1.scale.get());
          }
          if (coneRef1.current) {
              coneRef1.current.scale.set(...coneSpring2.scale.get());
          }
          if (coneRef2.current) {
              coneRef2.current.scale.set(...coneSpring3.scale.get());
          }
      }
  });


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
    setPuffedTreesCountRef.current += 1;
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.playbackRate = Math.random() * 0.5 + 0.75; // Random playback rate between 0.75 and 1.25
      audio.play();
    }
    setTimeout(() => {
      setShowPuff(false);
    }, 500); // Puff effect duration in milliseconds

    if (onRemove) {
      onRemove();
    }
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
            <mesh>
              <boxGeometry args={[1.5, 8, 1.5]} position={[0, 20, 0]}/>
              <meshStandardMaterial transparent  opacity={0}/>
            </mesh>
          </RigidBody>
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
        </>
        }
        {showPuff && (
          <a.mesh position={[0, 3, 0]} scale={puffSpring.scale}>
            <sphereGeometry args={[1, 32, 32]} />
            <a.meshStandardMaterial color="white" transparent opacity={puffSpring.opacity} />
          </a.mesh>
        )}
        <PositionalAudio ref={audioRef} url="/sounds/muffled-sound-of-falling.mp3" distance={1} loop={false} />
        {!isVisible &&
          <RigidBody type="dynamic" collider="cuboid">
            <mesh 
              ref={boxRef} 
              position={[0, 2.3, 0]} 
              scale={scale}
              castShadow
            >
              <boxGeometry args={[0.5, 2, 0.5]} />
              <meshStandardMaterial color="#D2691E" />
            </mesh>
            <mesh 
              position={[0, 2.3, 0]} 
              scale={scale*0.9}
              castShadow
            >
              <boxGeometry args={[0.5, 2.24, 0.5]} />
              <meshStandardMaterial color="#e8a15a" />
            </mesh>
          </RigidBody>
        }
        <mesh 
          ref={boxRef} 
          position={[0, 0.5, 0]} 
          scale={scale}
          castShadow
        >
          <boxGeometry args={[0.5, 1, 0.5]} />
          <meshStandardMaterial color="#D2691E" />
        </mesh>
        {!isVisible &&
          <mesh
            position={[0, 1.06, 0]}
            rotation={[0, Math.PI * 0.25, 0]}
            scale={scale}
            castShadow
          >
            <coneGeometry args={[0.32, 0.1, 4]} />
            <meshStandardMaterial color="#e8a15a" />
          </mesh>
        }
      </group>
  );
}

export default Tree;