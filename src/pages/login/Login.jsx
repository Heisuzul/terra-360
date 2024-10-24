import { useEffect, useCallback, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/use-auth-store';
import UserDAO from '../../DAO/UserDAO';
import World from '../../r3f/homepage/scenes/World.jsx';
import styles from './Login.module.css'

function Login() {

    const { user, observeAuthState, loginGoogleWithPopup, logout } = useAuthStore();
    const navigate = useNavigate();

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
          await loginGoogleWithPopup(); // Espera a que se complete la autenticación
          navigate('/world'); // Navega a "/about" después de la autenticación
      }, [loginGoogleWithPopup, navigate]);
 
    const handleLogout = useCallback(async() => {
        await logout();
        navigate('/'); // Navega a "/" después de desloguearse
    }, [logout], [navigate]);

    const handlePage1 = () => navigate('/deforestation');
    const handlePage2 = () => navigate('/biodiversity');
    const handlePage3 = () => navigate('/world'); // Replace '/page3' with your actual route

    // State to track button-group visibility
    const [showButtons, setShowButtons] = useState(true);

    return (
        <div className={styles.pageContainer}>
            {user ? (
                <>
                    <div className={styles.worldContainer}>
                        <World onSelect={setShowButtons}/>
                        {showButtons && <div className={styles.welcomeDiv}>
                            <p className={styles.welcomeText}>Welcome, {user.displayName}</p>
                            <button className={styles.logoutButton} onClick={handleLogout}>
                                Logout
                            </button>
                        </div>}
                        {showButtons && (
                            <div className={styles.buttonGroup}> 
                                <button className={`${styles.circularButton} ${styles.button1}`} onClick={handlePage1}></button>
                                <button className={`${styles.circularButton} ${styles.button2}`} onClick={handlePage2}></button>
                                <button className={`${styles.circularButton} ${styles.button3}`} onClick={handlePage3}></button>
                            </div>
                        )}
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