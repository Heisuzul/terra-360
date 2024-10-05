import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Plane } from '@react-three/drei';
import heightMapImg from '/src/r3f/deforestation/meshes/textures/terrain-heightmap1.png';
import ambientOcclusionMapImg from '/src/r3f/deforestation/meshes/textures/terrain-aomap.png';
import normalMapImg from '/src/r3f/deforestation/meshes/textures/terrain-normal.png';
import specularMapImg from '/src/r3f/deforestation/meshes/textures/terrain-specular.png';

const Terrain = () => {
    const heightMap = useLoader(TextureLoader, heightMapImg);
    const aoMap = useLoader(TextureLoader, ambientOcclusionMapImg);
    const normalMap = useLoader(TextureLoader, normalMapImg);
    const specularMap = useLoader(TextureLoader, specularMapImg);
  
  return (
    <Plane args={[100, 100, 256, 256]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <meshStandardMaterial 
        displacementMap={heightMap} 
        aoMap={aoMap}
        normalMap={normalMap}
        roughness={specularMap}
        displacementScale={20} 
        color="#7dba0b" // Replace this with any color you want for the terrain
        // roughness={0.1}
        metalness={0}
      />
    </Plane>
  );
};

export default Terrain;