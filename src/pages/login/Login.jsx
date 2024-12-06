import { useEffect, useCallback, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/use-auth-store';
import UserDAO from '../../DAO/UserDAO';

import World from '../../r3f/homepage/scenes/World.jsx';
import styles from './Login.module.css'


function Login() {

    const { user, observeAuthState, loginGoogleWithPopup, logout } = useAuthStore();
    const navigate = useNavigate();
    const worldRef = useRef(null);

    // Agregar nuevos estados según sea necesario
    const cameraStatesSet = [
        {
            position: { x: 1, y: 10.7, z: 6 },
            target: { x: 0, y: 10, z: 0 },
        },
        {
            position: { x: 1.2, y: 0.7, z: 26 },
            target: { x: 0.2, y: 0, z: 20 },
        },
        {
            position: { x: -6, y: 0.7, z: -50},
            target: { x: -5, y: 0, z: -46 },
        },
        {
            position: { x: -5.75, y: 0.5, z: -49.1},
            target: { x: -5, y: 0, z: -46 },
        },
    ];

    // No modificar estado inicial.
    const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
    const target = cameraStatesSet[currentCameraIndex].target;
    const cameraPosition = cameraStatesSet[currentCameraIndex].position;

    // Add new values to onSelect as needed to display html components from Login.jsx.
    const verifyTarget = useCallback(() => {
        switch (true) {
        case target.x === cameraStatesSet[0].target.x && target.y === cameraStatesSet[0].target.y && target.z === cameraStatesSet[0].target.z:
            return 2;
        case target.x === cameraStatesSet[1].target.x && target.y === cameraStatesSet[1].target.y && target.z === cameraStatesSet[1].target.z:
            return 1;
        case target.x === cameraStatesSet[2].target.x && target.y === cameraStatesSet[2].target.y && target.z === cameraStatesSet[2].target.z:
            return 3;
        }
    }, [target, cameraStatesSet]);
    
    // No modificar función, solo agregar nuevos estados según sea necesario 
    // y llamar la función en el evento deseado usándo el valor de cameraSatesSet definido.
    // Ejemplo: handleBoxClick(cameraStatesSet[0].position, cameraStatesSet[0].target, event)
    const handleBoxClick = (cameraIndex, event) => {
        setCurrentCameraIndex(cameraIndex);
        event.stopPropagation();
    };

    useEffect(() => {
        observeAuthState();
    }, [observeAuthState]);

    useEffect(() => {
        if (user) {
            const newUser = {
                email: user.email,
                name: user.displayName,
                photo: user.photoURL
            };

            if (newUser.email && newUser.name && newUser.photo) {
                UserDAO.createUser(newUser);
            } else {
                console.error('Invalid user data:', newUser);
            }
        }
    }, [user]);
    
    const handleLogin = useCallback(async () => {
        localStorage.clear();
        await loginGoogleWithPopup(); // Espera a que se complete la autenticación
        navigate('/world'); // Navega a "/about" después de la autenticación
    }, [loginGoogleWithPopup, navigate]);
 
    const handleLogout = useCallback(async() => {
        await logout();
        navigate('/'); // Navega a "/" después de desloguearse
    }, [logout], [navigate]);

    const handlePage1 = () => {
        navigate('/deforestation');
    }
    const handlePage2 = () => navigate('/biodiversity');
    const handlePage3 = () => navigate('/erosion'); 

    const handleTreesPuff = useCallback(() => {
        if (worldRef.current) {
            worldRef.current.puffTrees();
        }
      }, [worldRef])
    
      const handleTreesGrow = useCallback(() => {
        if (worldRef.current) {
            worldRef.current.growTrees();
        }
      }, [worldRef])

      const handleNext = () => {
        setCurrentCameraIndex((prevIndex) => Math.min(prevIndex + 1, cameraStatesSet.length - 1));
      };
    
      const handleBack = () => {
        setCurrentCameraIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      };

    return (
        <div className={styles.pageContainer}>
            {user ? (
                <>

                    <div className={styles.worldContainer}>
                        <World ref={worldRef} handleBoxClick={handleBoxClick} cameraStatesSet={cameraStatesSet} target={target} cameraPosition={cameraPosition}/>
                        {verifyTarget() === 1 && <div className={styles.welcomeDiv}>
                            <p className={styles.welcomeText}>Welcome, {user.displayName}</p>
                            <button className={styles.logoutButton} onClick={handleLogout}>
                                Logout
                            </button>
                        </div>}
                        {verifyTarget() === 1 && (
                            <div className={styles.buttonGroup}> 
                                <button className={`${styles.circularButton} ${styles.button1}`} data-hover="Deforestation" onClick={handlePage1}></button>
                                <button className={`${styles.circularButton} ${styles.button2}`} data-hover="Biodiversity" onClick={handlePage2}></button>
                                <button className={`${styles.circularButton} ${styles.button3}`} data-hover="Erosion" onClick={handlePage3}></button>
                            </div>
                        )}
                        {verifyTarget() === 2 && (
                            <div className={styles.introductionDiv} 
                                onClick={(event) => {
                                    handleBoxClick(1, event);
                                    document.body.style.cursor = 'auto'
                                }}> 
                                <p className={styles.introductionText}>
                                Earth faces critical environmental issues that threaten life and sustainability. <b>Deforestation</b> removes vital forests, impacting climate and habitats. <b>Soil erosion</b> depletes land of nutrients, reducing food security. <b>Biodiversity loss</b> disrupts ecosystems, endangering countless species and our own well-being. Together, we can take action to protect and preserve our planet.
                                </p>
                                <p id={styles.continueText}>
                                    <em>Click <b>here</b> to continue...</em>
                                </p>
                            </div>
                        )}
                        {/* {verifyTarget() === 3 && (
                            <div className={styles.introductionDiv} 
                                onClick={(event) => {
                                    handleBoxClick(2, event);
                                    document.body.style.cursor = 'auto'
                                }}> 
                                <p className={styles.introductionText}>
                                This is the place for the first quiz question.
                                </p>
                                <button className={styles.logoutButton} onClick={handleTreesGrow}>
                                    Hi Trees
                                </button>
                                <button className={styles.logoutButton} onClick={handleTreesPuff}>
                                    Bye Trees
                                </button>
                            </div>
                        )} */}
                        <div className={styles.navigationButtons}>
                            <button className={styles.navButton} onClick={handleBack} disabled={currentCameraIndex === 0}>
                                Back
                            </button>
                            <button className={styles.navButton} onClick={handleNext} disabled={currentCameraIndex === cameraStatesSet.length - 1}>
                                Next
                            </button>
                            </div>
                        </div>
                </>
            ) : (
                <div className={styles.loginContainer}>
                    <img src="Terra360 Logo-01.svg" alt="Terra Logo" className={styles.loginIcon} />
                    <button className={styles.loginButton} onClick={handleLogin}>
                        <img src="google_icon.svg" alt="Google Logo" className={styles.buttonIcon} />
                        Login
                    </button>
                </div>
            )}
        </div>
    );
}

export default Login;