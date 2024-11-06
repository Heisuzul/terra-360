import { cloneElement, useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import './Loading.css';

function Ready({ setReady }) {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setReady(true);
    }
  }, [progress, setReady]);

  return null;
}

export default function Loading({ children }) {
  const [clicked, setClicked] = useState(false);
  const [ready, setReady] = useState(false);

  return (
    <>
      {clicked && cloneElement(children, { ready: clicked })}
      {!clicked && (
        <>
          <Ready setReady={setReady} />
          <div className={`fullscreen bg ${ready ? 'ready' : 'not ready'}`}>
            <div className="stack">
              {!ready? <button disabled onClick={() => setClicked(true)}>
                {'Loading...'}
              </button> :
              <button onClick={() => setClicked(true)}>
                {'Click to continue'}
              </button>
              }
            </div>
          </div>
        </>
      )}
    </>
  );
}
