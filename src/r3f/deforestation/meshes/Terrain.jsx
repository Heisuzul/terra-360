// Terrain.jsx
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Plane } from '@react-three/drei';
import heightMapImg from '/src/r3f/deforestation/meshes/textures/terrain-heightmap1.png';
import ambientOcclusionMapImg from '/src/r3f/deforestation/meshes/textures/terrain-aomap.png';
import normalMapImg from '/src/r3f/deforestation/meshes/textures/terrain-normal.png';
import specularMapImg from '/src/r3f/deforestation/meshes/textures/terrain-specular.png';
import { useRef, useEffect } from 'react';

const Terrain = ({ onTerrainLoad }) => {
  const terrainRef = useRef();
  const heightMap = useLoader(TextureLoader, heightMapImg);
  const aoMap = useLoader(TextureLoader, ambientOcclusionMapImg);
  const normalMap = useLoader(TextureLoader, normalMapImg);
  const specularMap = useLoader(TextureLoader, specularMapImg);

  useEffect(() => {
    if (terrainRef.current && heightMap.image) {
      const geometry = terrainRef.current.geometry;

      // Create a canvas to extract pixel data from the height map
      const canvas = document.createElement('canvas');
      canvas.width = heightMap.image.width;
      canvas.height = heightMap.image.height;
      const context = canvas.getContext('2d');
      context.drawImage(heightMap.image, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixelData = imageData.data;

      const positions = geometry.attributes.position.array;
      const uvs = geometry.attributes.uv.array;
      const displacementScale = 20; // Same as in your material

      // Adjust vertex positions based on height map
      for (let i = 0; i < positions.length / 3; i++) {
        const u = uvs[i * 2];
        const v = uvs[i * 2 + 1];

        // Map UV coordinates to pixel positions
        const x = Math.floor(u * (canvas.width - 1));
        const y = Math.floor(v * (canvas.height - 1));
        const pixelIndex = (y * canvas.width + x) * 4; // 4 for RGBA

        // Get the grayscale value (assuming height map is grayscale)
        const height = (1 - pixelData[pixelIndex] / 255); // Normalize between 0 and 1

        // Displace the vertex along the Y-axis
        positions[i * 3 + 2] += height * displacementScale; // Adjust Z if terrain is rotated
      }

      // Update the geometry
      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
      geometry.computeBoundingBox();
      geometry.computeBoundingSphere();

      console.log("Terrain geometry updated with displacement");
      onTerrainLoad(terrainRef.current);
    }
  }, [heightMap, onTerrainLoad]);

  return (
    <Plane
      ref={terrainRef}
      args={[100, 100, 256, 256]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <meshStandardMaterial
        // Remove displacementMap since we're manually displacing geometry
        aoMap={aoMap}
        // normalMap={normalMap}
        // roughnessMap={specularMap}
        color="#7dba0b"
        roughness={0.8}
        metalness={0}
        // wireframe={true}
      />
    </Plane>
  );
};

export default Terrain;
