import React, { useRef, useCallback, useMemo, useState } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import '../../../pages/deforestation/Deforestation.css'; // Import the CSS file
import ToolTip from './HtmlToolTip'

export default function Model({ externalRefs = [], screenToRender = 1, handleTreesPop=()=>{}, handleTreesGrow=()=>{}, handleCorrectAnswer=()=>{}, pointer='pointer',  ...props }) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/laptop.glb')
  const displayRef = useRef()
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

   // Filter and validate refs - only include refs that have a current value
  const validOccludeRefs = useMemo(() => {
    const allRefs = [displayRef, ...(Array.isArray(externalRefs) ? externalRefs : [])]
    return allRefs.filter(ref => ref && ref.current)
  }, [externalRefs])

  const handleButtonLogin = useCallback(() => {
    navigate('/world'); // Navega a "/about" después de la autenticación
}, []);

  return (
    <group {...props} dispose={null}>
      <group name="Silver_colour_Cover" position={[0, 0.001, 0]} scale={[0.19, 0.146, 0.121]} 
        onPointerOver={() => {
          document.body.style.cursor = pointer;
          if (screenToRender === 1) {
            setIsHovered(true);
          }
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto'
          if (screenToRender === 1) {
            setIsHovered(false);
          }
        }}
        >
        <mesh
          name="Cover_Plane"
          castShadow
          receiveShadow
          geometry={nodes.Cover_Plane.geometry}
          material={materials['Cover Silver']}
        />
        <mesh
          name="Cover_Plane_1"
          castShadow
          receiveShadow
          geometry={nodes.Cover_Plane_1.geometry}
          material={materials['TouchPad Silver']}
        />
      </group>
      <mesh
        name="Rubber_Strip"
        castShadow
        receiveShadow
        geometry={nodes.Rubber_Strip.geometry}
        material={nodes.Rubber_Strip.material}
        position={[0, 0.001, 0]}
        scale={[0.164, 0.005, 0.004]}
      />
      <mesh
        name="Keyboard"
        castShadow
        receiveShadow
        geometry={nodes.Keyboard.geometry}
        material={materials['Keyboard Black Plastic']}
        position={[0.005, 0.007, -0.034]}
        rotation={[0.029, 0, 0]}
        scale={0.006}
      />
      <group
        name="Display"
        position={[0.002, 0.04, -0.125]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.184, 0.205, 0.113]}>
        <mesh
          name="Display_Plane"
          castShadow
          receiveShadow
          geometry={nodes.Display_Plane.geometry}
          material={materials['Cover Silver']}
        />
        <mesh
          name="Display_Plane_1"
          ref={displayRef}
          castShadow
          receiveShadow
          geometry={nodes.Display_Plane_1.geometry}
          material={materials['Display Glass']}>
          { screenToRender === 1 && (
          <Html
            transform
            occlude={validOccludeRefs.length > 0 ? validOccludeRefs : undefined}
            distanceFactor={1.0}
            position={[-0.01, -0.07, -0.80]}
            rotation={[Math.PI * 17.625/ 12, 0, 0]}
            scale={[1.15, 1.8, 1]}
            style={{
              width: '690px',
              height: '420px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#bbeaff',
              userSelect: 'none',
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.1rem',
              // padding: '2rem',
            }}>
              <img 
                src="Terra360 Logo-01.svg" 
                alt="Terra Logo" 
                style={{
                  width: '280px',
                  height: '280px',
                }}
              />
              <button
                onClick={handleButtonLogin}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: '#8a3c0f',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                <img 
                  src="google_icon.svg" 
                  alt="Google Logo" 
                  style={{
                    width: '20px',
                    height: '20px',
                  }}
                />
                Start Quiz
              </button>
            </div>
          </Html>)}
          { screenToRender === 2 && (
          <Html
            transform
            occlude={validOccludeRefs.length > 0 ? validOccludeRefs : undefined}
            distanceFactor={1.0}
            position={[-0.01, -0.07, -0.80]}
            rotation={[Math.PI * 17.625/ 12, 0, 0]}
            scale={[1.15, 1.8, 1]}
            style={{
              width: '690px',
              height: '420px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: '#bbeaff',
              userSelect: 'none',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <p
              className="hover-text"
            >
              Tomorrow, you'll need to present a report on the impact of <em>deforestation</em> over the environment. Would you <b>print</b> it, or would you store in a <b>USB</b> drive?
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
            }}>
              <button
                onClick={handleCorrectAnswer}
                className="button"
              >
                Save to USB
              </button>
              <button
                onClick={handleTreesPop}
                className="button"
              >
                Print the document
              </button>
            </div>
            <div style={{
              display: 'flex',
              padding: '1.2rem',
            }}>
              <button
                onClick={handleTreesGrow}
                title="Recycle"
                style={{
                  padding: '0.5rem 0.5rem',
                  border: 'none',
                  borderRadius: '10px',
                  backgroundColor: '#52463f',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  fontSize: '1.2rem',
              }}
              >
                ♻️
              </button>
            </div>
          </Html>)}
        </mesh>
        { screenToRender === 1 && isHovered && (
            <ToolTip 
              position={[-1.5, 0.5, -0.3]} 
              text={'From here you can start the Quiz'}
            />
          )}
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/deforestation/laptop.glb')