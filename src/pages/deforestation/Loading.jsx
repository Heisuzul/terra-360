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
      {clicked && cloneElement(children, { ready: clicked, setReady })}
      {!clicked && (
        <>
          <Ready setReady={setReady} />
          <div className={`fullscreen bg ${ready ? 'ready' : 'not ready'}`}>
            <div className="stack">
              <button onClick={() => setClicked(true)}>
                {!ready ? 'Cargando...' : 'Click para continuar'}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
