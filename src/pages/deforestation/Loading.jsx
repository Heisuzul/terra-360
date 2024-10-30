import { cloneElement, useEffect, useState } from 'react';
import './Loading.css';

function Ready({ setReady }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 2000); 
    return () => clearTimeout(timer);
  }, [setReady]);
  return null;
}

export default function Loading({ children }) {
  const [clicked, setClicked] = useState(false);
  const [ready, setReady] = useState(false);

  return (
    <>
      {clicked && cloneElement(children, { ready: clicked, setReady: setReady })}
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
