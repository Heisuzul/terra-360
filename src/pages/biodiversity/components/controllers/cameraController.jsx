import * as THREE from 'three';
import { gsap } from 'gsap';

export const handleBeeClick = (cameraRef, setIsBeeClicked) => {
    if (cameraRef.current) {
        const camera = cameraRef.current;
        gsap.to(camera.position, {
            x: 11,
            y: -15,
            z: 130,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
                camera.lookAt(new THREE.Vector3(10, -23, 110));
            }
        });
    }
    setIsBeeClicked(true);
};

export const handlePointerBeeMissed = (cameraRef, setIsBeeClicked) => {
    if (cameraRef.current) {
        const camera = cameraRef.current;
        gsap.to(camera.position, {
            x: 10,
            y: -20,
            z: 150,
            duration: 2,
            ease: 'power2.inOut',
            onUpdate: () => {
                camera.lookAt(new THREE.Vector3(0, 0, 0));
            }
        });
    }
    setIsBeeClicked(false);
};

export const handleOrchidClick = (cameraRef, setIsOrchidClicked) => {
    if (cameraRef.current) {
        const camera = cameraRef.current;
        gsap.to(camera.position, {
            x: 2,
            y: -25,
            z: 135,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
                camera.lookAt(new THREE.Vector3(10, -10, 110));
            }
        });
    }
    setIsOrchidClicked(true);
};

export const handlePointerOrchidMissed = (cameraRef, setIsOrchidClicked) => {
    if (cameraRef.current) {
        const camera = cameraRef.current;
        gsap.to(camera.position, {
            x: 10,
            y: -20,
            z: 150,
            duration: 2,
            ease: 'power2.inOut',
            onUpdate: () => {
                camera.lookAt(new THREE.Vector3(0, 0, 0));
            }
        });
    }
    setIsOrchidClicked(false);
};

export const handleWolfClick = (cameraRef, setIsWolfClicked) => {
    if (cameraRef.current) {
        const camera = cameraRef.current;
        gsap.to(camera.position, {
            x: -8,
            y: -25,
            z: 140,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
                camera.lookAt(new THREE.Vector3(10, -10, 110));
            }
        });
    }
    setIsWolfClicked(true);
};

export const handlePointerWolfMissed = (cameraRef, setIsWolfClicked) => {
    if (cameraRef.current) {
        const camera = cameraRef.current;
        gsap.to(camera.position, {
            x: 10,
            y: -20,
            z: 150,
            duration: 2,
            ease: 'power2.inOut',
            onUpdate: () => {
                camera.lookAt(new THREE.Vector3(0, 0, 0));
            }
        });
    }
    setIsWolfClicked(false);
};

export const handleCrocClick = (cameraRef, setIsCrocClicked) => {
    if (cameraRef.current) {
        const camera = cameraRef.current;
        gsap.to(camera.position, {
            x: 12,
            y: -26.8,
            z: 130,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
                camera.lookAt(new THREE.Vector3(10, 0, 110));
            }
        });
    }
    setIsCrocClicked(true);
};

export const handlePointerCrocMissed = (cameraRef, setIsCrocClicked) => {
    if (cameraRef.current) {
        const camera = cameraRef.current;
        gsap.to(camera.position, {
            x: 10,
            y: -20,
            z: 150,
            duration: 2,
            ease: 'power2.inOut',
            onUpdate: () => {
                camera.lookAt(new THREE.Vector3(0, 0, 0));
            }
        });
    }
    setIsCrocClicked(false);
};

export const handleCondorClick = (cameraRef, setIsCondorClicked) => {
    if (cameraRef.current) {
        const camera = cameraRef.current;
        gsap.to(camera.position, {
            x: 35,
            y: -6,
            z: 120,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
                camera.lookAt(new THREE.Vector3(10, -10, 110));
            }
        });
    }
    setIsCondorClicked(true);
};

export const handlePointerCondorMissed = (cameraRef, setIsCondorClicked) => {
    if (cameraRef.current) {
        const camera = cameraRef.current;
        gsap.to(camera.position, {
            x: 10,
            y: -20,
            z: 150,
            duration: 2,
            ease: 'power2.inOut',
            onUpdate: () => {
                camera.lookAt(new THREE.Vector3(0, 0, 0));
            }
        });
    }
    setIsCondorClicked(false);
};

export const handleFrogClick = (cameraRef, setIsFrogClicked) => {
    if (cameraRef.current) {
        const camera = cameraRef.current;
        gsap.to(camera.position, {
            x: 20.5,
            y: -23.2,
            z: 130,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
                camera.lookAt(new THREE.Vector3(10, -10, 110));
            }
        });
    }
    setIsFrogClicked(true);
};

export const handlePointerFrogMissed = (cameraRef, setIsFrogClicked) => {
    if (cameraRef.current) {
        const camera = cameraRef.current;
        gsap.to(camera.position, {
            x: 10,
            y: -20,
            z: 150,
            duration: 2,
            ease: 'power2.inOut',
            onUpdate: () => {
                camera.lookAt(new THREE.Vector3(0, 0, 0));
            }
        });
    }
    setIsFrogClicked(false);
};

export const handleButterflyClick = (cameraRef, setIsButterflyClicked) => {
    if (cameraRef.current) {
        const camera = cameraRef.current;
        gsap.to(camera.position, {
            x: 5,
            y: -16,
            z: 130,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
                camera.lookAt(new THREE.Vector3(10, -10, 110));
            }
        });
    }
    setIsButterflyClicked(true);
};

export const handlePointerButterflyMissed = (cameraRef, setIsButterflyClicked) => {
    if (cameraRef.current) {
        const camera = cameraRef.current;
        gsap.to(camera.position, {
            x: 10,
            y: -20,
            z: 150,
            duration: 2,
            ease: 'power2.inOut',
            onUpdate: () => {
                camera.lookAt(new THREE.Vector3(0, 0, 0));
            }
        });
    }
    setIsButterflyClicked(false);
};