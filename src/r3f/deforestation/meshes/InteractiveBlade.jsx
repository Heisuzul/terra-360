import React, { useCallback, useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { Html } from '@react-three/drei';
import { easeCubicInOut } from 'd3-ease';
import { animated as animatedDiv, useSpring as useSpringWeb } from 'react-spring';
import { PositionalAudio } from '@react-three/drei';

export default function InteractiveBlade({scale, onDragStart, onDragEnd, type = 'dynamic', ...props}) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/circular-blade.glb')
  const rbSawRef = useRef()
  const [clickStartTime, setClickStartTime] = useState(null)
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef();

  const springProps = useSpringWeb({
    height: isHolding ? '100%' : '0%',
    config: { duration: 1500, easing: easeCubicInOut },
  });

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation();
    setIsHolding(true);
    setClickStartTime(Date.now())

    rbSawRef.current.setAngvel({
        x: 0,
        y: 30,
        z: 0
      }, true)
    onDragStart?.();  
  }, [onDragStart])

  const handlePointerUp = useCallback((e) => {
    e.stopPropagation();
    const clickDuration = Date.now() - clickStartTime;
    const impulseStrength = Math.min(clickDuration / 1000, 1.5);

      const randomSign = Math.random() > 0.5 ? 1 : -1;
      const anotherRandom = Math.random();

      rbSawRef.current.applyImpulse({
        x: anotherRandom * 0.004 * randomSign * impulseStrength - 0.002 * impulseStrength,
        y: 0.0015 * impulseStrength,
        z: 0.003 * impulseStrength
      }, true);

      rbSawRef.current.setAngvel({
        x: 0,
        y: 50,
        z: 0
      }, true);

    setClickStartTime(null);
    setIsHolding(false);
    onDragEnd?.();
  }, [clickStartTime, onDragEnd])

  useEffect(() => {
    let timer;
    if (isHolding) {
      setProgress(0);
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            clearInterval(timer);
            return 1;
          }
          return prev + 0.01;
        });
      }, 15);
    } else {
      setProgress(0);
    }
    return () => clearInterval(timer);
  }, [isHolding]);

  const handleCollision = () => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.playbackRate = Math.random() * 0.5 + 0.75; // Random playback rate between 0.75 and 1.25
      audio.play();
    }
    setTimeout(() => {
      setIsVisible(false);
    }, 1000); // Puff effect duration in milliseconds
  };

  return (
    
        <group {...props} dispose={null}>
            <RigidBody type={type} colliders="hull" ref={rbSawRef} onCollisionEnter={handleCollision} restitution={0.2}>
                <group name="Sketchfab_Scene" 
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerOver={() => {
                    document.body.style.cursor = 'pointer'
                }}
                onPointerOut={() => {
                    document.body.style.cursor = 'auto'
                    onDragEnd?.();
                }}>
                    <group name="Sketchfab_model" rotation={[-0.201, 0, 0]} scale={scale}>
                    <group name="BLADE1fbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                        <group name="RootNode">
                        <group
                            name="Circular_saw_blade"
                            position={[-29.604, 0, 0]}
                            rotation={[-Math.PI / 2, 0, 0]}>
                            <mesh
                            name="Circular_saw_blade_Material001_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.Circular_saw_blade_Material001_0.geometry}
                            material={materials['Material.001']}
                            />
                            <mesh
                            name="Circular_saw_blade_Material003_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.Circular_saw_blade_Material003_0.geometry}
                            material={materials['Material.003']}
                            />
                            <mesh
                            name="Circular_saw_blade_Material004_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.Circular_saw_blade_Material004_0.geometry}
                            material={materials['Material.004']}
                            />
                        </group>
                        </group>
                    </group>
                    </group>
                    {isHolding && (
                      <Html position={[-0.1,0.2,0.2]} transform scale={0.1} rotation={[Math.PI/3.7,Math.PI/2,Math.PI/6]}>
                      <div style={{ width: '20px', height: '100px', position: 'relative', border: '1px solid #000' }}>
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to top, green, yellow, red)', position: 'absolute', top: 0 }} />
                        <animatedDiv.div
                          style={{
                            width: '100%',
                            height: springProps.height,
                            background: 'rgba(255,255,255,0.5)',
                            position: 'absolute',
                            bottom: 0,
                          }}
                        />
                      </div>
                      </Html>
                    )}
                </group>
            </RigidBody>
            <PositionalAudio ref={audioRef} url="/sounds/metal-hit.mp3" distance={0.01} loop={false} />
        </group>
  )
}

useGLTF.preload('/models-3d/deforestation/circular-blade.glb')