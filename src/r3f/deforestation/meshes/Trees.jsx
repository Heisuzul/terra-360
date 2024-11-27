import React, { useEffect, useState, useRef, useMemo, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Vector3, Raycaster } from 'three';
import Tree from "../meshes/Tree";
import { originalTreePositions } from '../data/treePositions';
import { RigidBody } from '@react-three/rapier';

// This will store our cached positions for different terrain configurations
const positionCache = new Map();

const Trees = forwardRef(({ 
  terrain, 
  delta, 
  amount_rows, 
  amount_cols, 
  phase_x, 
  phase_z, 
  space,
  terrainId = 'default' // Add an ID to identify different terrains
}, ref) => {
  const [treePositions, setTreePositions] = useState([]);
  const raycaster = useMemo(() => new Raycaster(), []);
  const [puffOddTrees, setPuffOddTrees] = useState(false);
  const [puffEvenTrees, setPuffEvenTrees] = useState(false);

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
    if (originalTreePositions.length > 0) {
      setTreePositions(originalTreePositions.map(pos => new Vector3(pos.x, pos.y, pos.z)));
      console.log('Tree positions loaded from originalTreePositions');
      return;
    }

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
    }, 10 * delta);

    return () => clearTimeout(delay);
  }, [terrain, calculateTreePositions, loadCachedPositions, delta]);

  const [popTrees, setPopTrees] = useState(false)
  const [showTrees, setShowTrees] = useState(true)
  const counter = useRef(0)

  // Use `useImperativeHandle` to expose `exportPositions`
  useImperativeHandle(ref, () => ({
    exportPositions,
    puffTrees,
    growTrees,
  }));

  const handleCollision = () => {
    setTimeout(() => {
      setPopTrees(false);
    }, 10); // Puff effect duration in milliseconds
  };

  const puffTrees = () => {
    if(counter.current===0 || counter.current===1) {
      counter.current++;
      setPopTrees(true);
    }
    console.log("Counter", counter.current)
    console.log("REF", popTrees)
  }

  const growTrees = () => {
    setShowTrees(!showTrees);
    console.log("GrowREF", showTrees)
    counter.current = 0;
  }

  return (
    <>
      {treePositions.map((position, index) => (
        <>
          {showTrees && <Tree key={index} position={position} scale={1} />}
        </>
      ))}
      {treePositions.map((position, index) => (
        <>
          {(popTrees && index % 2 !== 0 && counter.current === 2) || (popTrees && index % 2 === 0 && counter.current === 1) ? (
            <RigidBody type="dynamic" colliders="cuboid" onCollisionEnter={handleCollision}>
              <mesh position={[position.x, position.y + 1, position.z]}>
                <boxGeometry args={[0.1, 0.1, 0.1]} />
                <meshStandardMaterial color="#e8a15a" />
              </mesh>
            </RigidBody>
          ) : null}
        </>
      ))}
    </>
  );
});

export default Trees;