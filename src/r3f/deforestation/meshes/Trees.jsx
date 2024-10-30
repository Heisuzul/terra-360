import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Vector3, Raycaster } from 'three';
import Tree from "../meshes/Tree";

// This will store our cached positions for different terrain configurations
const positionCache = new Map();

const Trees = ({ 
  terrain, 
  delta, 
  amount_rows, 
  amount_cols, 
  phase_x, 
  phase_z, 
  space,
  terrainId = 'default', // Add an ID to identify different terrains
  setReady
}) => {
  const [treePositions, setTreePositions] = useState([]);
  const raycaster = useMemo(() => new Raycaster(), []);

  // Generate a cache key based on terrain parameters
  const getCacheKey = useCallback(() => {
    return `${terrainId}-${amount_rows}-${amount_cols}-${phase_x}-${phase_z}-${space}`;
  }, [terrainId, amount_rows, amount_cols, phase_x, phase_z, space]);

  // Function to serialize positions for storage
  const serializePositions = (positions) => {
    return positions.map(pos => ({
      x: pos.x,
      y: pos.y,
      z: pos.z
    }));
  };

  // Function to deserialize stored positions
  const deserializePositions = (serialized) => {
    return serialized.map(pos => new Vector3(pos.x, pos.y, pos.z));
  };

  const calculateTreePositions = useCallback(() => {
    if (terrain && terrain.current && terrain.current.geometry.boundingBox) {
      const positions = [];
      const rows = amount_rows;
      const cols = amount_cols;
      const spacing = space;
      const halfRows = Math.floor(rows / 2);
      const halfCols = Math.floor(cols / 2);

      const boundingBox = terrain.current.geometry.boundingBox;
      const startY = boundingBox.max.y + 10;

      for (let x = -halfCols + phase_x; x <= halfCols + phase_x; x++) {
        for (let z = -halfRows + phase_z; z <= halfRows + phase_z; z++) {
          const xPos = x * spacing + Math.pow(-1, z);
          const zPos = z * spacing + Math.pow(-1, z);

          raycaster.set(new Vector3(xPos, startY, zPos), new Vector3(0, -1, 0));
          const intersects = raycaster.intersectObject(terrain.current);

          const yPosition = intersects.length > 0 ? intersects[0].point.y : 0;
          positions.push(new Vector3(xPos, yPosition, zPos));
        }
      }

      // Cache the calculated positions
      const cacheKey = getCacheKey();
      const serializedPositions = serializePositions(positions);
      positionCache.set(cacheKey, serializedPositions);
      
      // Optionally save to localStorage for persistence
      try {
        localStorage.setItem(`treePositions-${cacheKey}`, JSON.stringify(serializedPositions));
      } catch (e) {
        console.warn('Failed to save tree positions to localStorage:', e);
      }

      setTreePositions(positions);
      return positions;
    }
    return [];
  }, [terrain, raycaster, amount_rows, amount_cols, phase_x, phase_z, space, getCacheKey]);

  const loadCachedPositions = useCallback(() => {
    const cacheKey = getCacheKey();
    
    // Try memory cache first
    if (positionCache.has(cacheKey)) {
      const cached = positionCache.get(cacheKey);
      setTreePositions(deserializePositions(cached));
      return true;
    }

    // Try localStorage next
    try {
      const stored = localStorage.getItem(`treePositions-${cacheKey}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        const positions = deserializePositions(parsed);
        positionCache.set(cacheKey, parsed); // Update memory cache
        setTreePositions(positions);
        return true;
      }
    } catch (e) {
      console.warn('Failed to load cached tree positions:', e);
    }

    return false;
  }, [getCacheKey]);

  // Export current positions (useful for debugging or manual position setting)
  const exportPositions = () => {
    const positions = serializePositions(treePositions);
    console.log('Current tree positions:', JSON.stringify(positions));
    return positions;
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (terrain?.current?.geometry?.boundingBox) {
        // Try to load cached positions first
        if (!loadCachedPositions()) {
          console.log("No cached positions found, calculating new positions...");
          calculateTreePositions();
        }
      } else {
        console.log("Waiting for terrain to be fully ready...");
      }
      setReady(true);
    }, 10 * delta);

    return () => clearTimeout(delay);
  }, [terrain, calculateTreePositions, loadCachedPositions, delta]);

  return (
    <>
      {treePositions.map((position, index) => (
        <Tree key={index} position={position} scale={1} />
      ))}
    </>
  );
};

export default Trees;