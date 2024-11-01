import WoodPlatform from './WoodPlatform';
import WoodColumn from './WoodColumn';

const Platform = (props) => {
  const scale = 0.02
  return (
    <group {...props}>
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