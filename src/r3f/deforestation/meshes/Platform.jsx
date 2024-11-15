import WoodPlatform from './WoodPlatform';
import WoodColumn from './WoodColumn';
import { RigidBody } from "@react-three/rapier";

const Platform = (props) => {
  const scale = 0.02
  return (
    <group {...props}>
        <RigidBody type="fixed">
          <mesh position={[0.9,0.05,-1]}>
            <boxGeometry args={[7.5, 0.4, 4.5]} /> {/* Adjust args to match platform size */}
            <meshStandardMaterial visible={false} /> {/* Invisible mesh for collider */}
          </mesh>
        </RigidBody>
        <WoodPlatform position={[-1.86,0,0]} scale={scale}/>
        <WoodPlatform position={[0,0,0]} scale={scale}/>
        <WoodPlatform position={[1.86,0,0]} scale={scale}/>
        <WoodPlatform position={[1.86*2,0,0]} scale={scale}/>
        <WoodPlatform position={[-1.86,0,-2]} scale={scale}/>
        <WoodPlatform position={[0,0,-2]} scale={scale}/>
        <WoodPlatform position={[1.86,0,-2]} scale={scale}/>
        <WoodPlatform position={[1.86*2,0,-2]} scale={scale}/>
      
      <WoodColumn position={[-2.8,-1.2,-0.96]} rotation={[0,0,Math.PI/2]} scale={scale/3}/>
      <WoodColumn position={[0.9,-1.2,-0.7]} rotation={[0,Math.PI/2,Math.PI/2]} scale={scale/3}/>
      <WoodColumn position={[4.6,-1.2,-1]} rotation={[0,Math.PI/2*2,Math.PI/2]} scale={scale/3}/>
      <WoodColumn position={[4.6,-3.2,-1.05]} rotation={[0,Math.PI/2*2,Math.PI/2]} scale={scale/3}/>

      <WoodColumn position={[-2.8,-1.2,1.05]} rotation={[0,0,Math.PI/2]} scale={scale/3}/>
      <WoodColumn position={[0.9,-1.2,1.25]} rotation={[0,Math.PI/2,Math.PI/2]} scale={scale/3}/>
      <WoodColumn position={[4.6,-1.2,1.05]} rotation={[0,Math.PI/2*2,Math.PI/2]} scale={scale/3}/>

      <WoodColumn position={[-2.8,-1.2,-2.95]} rotation={[0,0,Math.PI/2]} scale={scale/3}/>
      <WoodColumn position={[-2.8,-3.2,-2.88]} rotation={[0,0,Math.PI/2]} scale={scale/3}/>
      <WoodColumn position={[0.9,-1.2,-2.7]} rotation={[0,Math.PI/2,Math.PI/2]} scale={scale/3}/>
      <WoodColumn position={[1.0,-3.2,-2.7]} rotation={[0,Math.PI/2,Math.PI/2]} scale={scale/3}/>
      <WoodColumn position={[4.6,-1.2,-3]} rotation={[0,Math.PI/2*2,Math.PI/2]} scale={scale/3}/>
      <WoodColumn position={[4.6,-1.2,-3]} rotation={[0,Math.PI/2*2,Math.PI/2]} scale={scale/3}/>
      <WoodColumn position={[4.6,-3.2,-3.05]} rotation={[0,Math.PI/2*2,Math.PI/2]} scale={scale/3}/>
    </group>
  );
}

export default Platform;