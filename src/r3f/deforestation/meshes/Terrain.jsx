import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Plane } from '@react-three/drei';
import heightMapImg from '/src/r3f/deforestation/meshes/textures/terrain-heightmap.jpg';
import ambientOcclusionMapImg from '/src/r3f/deforestation/meshes/textures/terrain-aomap1.jpg';

const Terrain = () => {
    const heightMap = useLoader(TextureLoader, heightMapImg);
    const aoMap = useLoader(TextureLoader, ambientOcclusionMapImg);
  
  return (
    <Plane args={[100, 100, 256, 256]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <meshStandardMaterial 
        displacementMap={heightMap} 
        aoMap={aoMap}
        displacementScale={13} 
        color="#7dba0b" // Replace this with any color you want for the terrain
        roughness={0.7}
        metalness={0}
      />
    </Plane>
  );
};

export default Terrain;