import { useEffect, useCallback, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/use-auth-store';
import UserDAO from '../../DAO/UserDAO';
import World from '../../r3f/homepage/scenes/World.jsx';
import styles from './Login.module.css'


function Login() {
    const { user, observeAuthState, loginGoogleWithPopup, logout, updateUserPoints } = useAuthStore();
    const navigate = useNavigate();
    const worldRef = useRef(null);

    // Definir estados de las cámaras y sus posiciones y objetivos
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
        {
            position: { x: 11.5, y: 0.5, z: -50.5},
            target: { x: 11, y: 0, z: -46 },
        },
        {
            position: { x: 1.2, y: 0.7, z: 18.5 },
            target: { x: 0.2, y: 0, z: 12.5 },
        },
    ];

    // No modificar estado inicial.
    const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
    const target = cameraStatesSet[currentCameraIndex].target;
    const cameraPosition = cameraStatesSet[currentCameraIndex].position;
    const [storedPoints, setStoredPoints] = useState(0);
    
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

    // Obtener puntos almacenados del usuario
    useEffect(() => {
        const fetchStoredPoints = async () => {
            if (user) {
                const userDoc = await UserDAO.getUserById(user.uid);
                if (userDoc && userDoc.success) {
                    const points = userDoc.data.points || 0;
                    setStoredPoints(Math.round(points * 10) / 10);
                } 
            }
        };
        fetchStoredPoints();
    }, [user]);

    // Crear usuario en la base de datos
    useEffect(() => {
        if (user) {
          const newUser = {
            uid: user.uid, // Pass the UID
            email: user.email,
            name: user.displayName,
            photo: user.photoURL,
          };
    
          if (newUser.email && newUser.name && newUser.photo) {
            UserDAO.createUser(newUser);
          } else {
            console.error('Invalid user data:', newUser);
          }
        }
      }, [user]);

    // Funciones para manejar el login y logout  
    const handleLogin = useCallback(async () => {
        localStorage.clear();
        await loginGoogleWithPopup();
        navigate('/world');
    }, [loginGoogleWithPopup, navigate]);
 
    const handleLogout = useCallback(async() => {
        await logout();
        navigate('/');
    }, [logout], [navigate]);

    // Funciones para navegar a las páginas de deforestation, biodiversity y erosion
    const handlePage1 = () => {navigate('/deforestation')};
    const handlePage2 = () => navigate('/biodiversity');
    const handlePage3 = () => navigate('/erosion'); 

    // Funciones para manejar las acciones de los árboles
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

    // Funciones para navegar entre las cámaras
    const handleNext = () => {
        setCurrentCameraIndex((prevIndex) => Math.min(prevIndex + 1, cameraStatesSet.length - 1));
    };

    const handleBack = () => {
        setCurrentCameraIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    // Referencias para almacenar los puntos de cada apartado
    const deforestationPointsRef = useRef(0);
    const biodiversityPointsRef = useRef(0);
    const erosionPointsRef = useRef(0);

    // Función para guardar los puntos del usuario
    const handleSavePoints = async () => {
        const totalPoints = (deforestationPointsRef.current + biodiversityPointsRef.current + erosionPointsRef.current) / 75 * 100;
        if (user) {
            await updateUserPoints(user.uid, totalPoints);
            setStoredPoints(Math.round(totalPoints * 10) / 10);
        }
    };
    
    return (
        <div className={styles.pageContainer}>
            {user ? (
                <>
                    <div className={styles.worldContainer}>
                        <World 
                            ref={worldRef} 
                            handleBoxClick={handleBoxClick} 
                            cameraStatesSet={cameraStatesSet} 
                            target={target} 
                            cameraPosition={cameraPosition} 
                            deforestationPointsRef={deforestationPointsRef}
                            biodiversityPointsRef={biodiversityPointsRef}
                            erosionPointsRef={erosionPointsRef}
                            storedPoints={storedPoints}
                        />
                        {currentCameraIndex === 1 && <div className={styles.welcomeDiv}>
                            <p className={styles.welcomeText}>Welcome, {user.displayName}</p>
                            <button className={styles.logoutButton} onClick={handleLogout}>
                                Logout
                            </button>
                        </div>}
                        {currentCameraIndex === 1 && (
                            <div className={styles.buttonGroup}> 
                                <button className={`${styles.circularButton} ${styles.button1}`} data-hover="Deforestation" onClick={handlePage1}></button>
                                <button className={`${styles.circularButton} ${styles.button2}`} data-hover="Biodiversity" onClick={handlePage2}></button>
                                <button className={`${styles.circularButton} ${styles.button3}`} data-hover="Erosion" onClick={handlePage3}></button>
                            </div>
                        )}
                        {currentCameraIndex === 0 && (
                            <div className={styles.introductionDiv} 
                                onClick={(event) => {
                                    handleBoxClick(1, event);
                                    document.body.style.cursor = 'auto'
                                }}> 
                                <p className={styles.introductionText}>
                                Earth faces critical environmental issues that threaten life and sustainability. <b>Deforestation</b> removes vital forests, impacting climate and habitats. <b>Soil erosion</b> depletes land of nutrients, reducing food security. <b>Biodiversity loss</b> disrupts ecosystems, endangering countless species and our own well-being. Together, we can take action to protect and preserve our planet.
                                </p>
                                <p id={styles.continueText}>
                                    <em>Click <b>Here/Next</b> to continue...</em>
                                </p>
                            </div>
                        )}
                        {currentCameraIndex === cameraStatesSet.length - 1 && (
                            <div className={styles.introductionDiv}>
                                <button className={styles.savePointsButton} onClick={(event) => {handleSavePoints(); handleBoxClick(1,event)}}>
                                    Save Points
                                </button>
                            </div>
                        )}
                        {currentCameraIndex > 1 && (
                            <div className={styles.pointsButton}>
                                {((deforestationPointsRef.current + biodiversityPointsRef.current + erosionPointsRef.current) / 75 * 100).toFixed(1)}%
                            </div>
                        )}
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