import { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/use-auth-store';
import UserDAO from '../../DAO/UserDAO';
import World from '../../r3f/scenes/World.jsx';
import './Login.css'
import { Text } from '@react-three/drei'

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

    const handlePage1 = () => navigate('/deforestation'); // Replace '/page1' with your actual route
    const handlePage2 = () => navigate('/world'); // Replace '/page2' with your actual route
    const handlePage3 = () => navigate('/world'); // Replace '/page3' with your actual route

    return (
        <div className="container-login">
            {user ? (
                <>
                    <div className='world-container'>
                        <World/>
                        <div className="welcome-div">
                            <p className="welcome-text">Welcome, {user.displayName}</p>
                            <button className="logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                        <div className="button-group">
                            <button className="circular-button button1" onClick={handlePage1}></button>
                            <button className="circular-button button2" onClick={handlePage2}></button>
                            <button className="circular-button button3" onClick={handlePage3}></button>
                        </div>
                    </div>
                </>
            ) : (
                <div className='login-container'>
                    <img src="Terra360 Logo-01.svg" alt="Terra Logo" className="login-icon" />
                    <button className="login-button" onClick={handleLogin}>
                        <img src="google_icon.svg" alt="Google Logo" className="button-icon" />
                        Login
                    </button>
                </div>
            )}
        </div>
    );
}

export default Login;