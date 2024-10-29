import React, { useRef, useEffect, useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';
import heightMapImg from '/materials/deforestation/terrain-heightmap1.png';
import ambientOcclusionMapImg from '/materials/deforestation/terrain-aomap.png';
import normalMapImg from '/materials/deforestation/terrain-normal.png';
import specularMapImg from '/materials/deforestation/terrain-specular.png';

const Terrain = React.memo(({ onTerrainLoad }) => {
  const terrainRef = useRef();
  const hasInitialized = useRef(false);
  
  // Memoize texture loading
  const textures = useMemo(() => ({
    heightMap: useLoader(TextureLoader, heightMapImg),
    aoMap: useLoader(TextureLoader, ambientOcclusionMapImg),
    normalMap: useLoader(TextureLoader, normalMapImg),
    specularMap: useLoader(TextureLoader, specularMapImg)
  }), []); // Empty dependency array means textures are loaded once

  // Memoize geometry creation and displacement
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(100, 100, 256, 256);
    
    if (textures.heightMap.image) {
      // Create a canvas to extract pixel data from the height map
      const canvas = document.createElement('canvas');
      canvas.width = textures.heightMap.image.width;
      canvas.height = textures.heightMap.image.height;
      const context = canvas.getContext('2d');
      context.drawImage(textures.heightMap.image, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixelData = imageData.data;

      const positions = geo.attributes.position.array;
      const uvs = geo.attributes.uv.array;
      const displacementScale = 20;

      // Adjust vertex positions based on height map
      for (let i = 0; i < positions.length / 3; i++) {
        const u = uvs[i * 2];
        const v = uvs[i * 2 + 1];

        const x = Math.floor(u * (canvas.width - 1));
        const y = Math.floor(v * (canvas.height - 1));
        const pixelIndex = (y * canvas.width + x) * 4;

        const height = (1 - pixelData[pixelIndex] / 255);
        positions[i * 3 + 2] += height * displacementScale;
      }

      geo.attributes.position.needsUpdate = true;
      geo.computeVertexNormals();
      geo.computeBoundingBox();
      geo.computeBoundingSphere();
    }

    return geo;
  }, [textures.heightMap]); // Only recreate if heightMap changes

  // Memoize material creation
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      aoMap: textures.aoMap,
      // normalMap: textures.normalMap,
      // roughnessMap: textures.specularMap,
      color: "#7dba0b",
      roughness: 0.8,
      metalness: 0,
      // wireframe: false
    });
  }, [textures]); // Only recreate if textures change

  // Handle initial load notification
  useEffect(() => {
    if (terrainRef.current && !hasInitialized.current) {
      hasInitialized.current = true;
      onTerrainLoad(terrainRef.current);
    }
  }, [onTerrainLoad]);

  return (
    <mesh
      ref={terrainRef}
      geometry={geometry}
      material={material}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    />
  );
});

Terrain.displayName = 'Terrain';

export default Terrain;