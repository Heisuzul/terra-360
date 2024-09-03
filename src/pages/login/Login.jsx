import { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/use-auth-store';
import World from '../../r3f/scenes/World.jsx';
import './Login.css'

function Login() {
    const { user, observeAuthState, loginGoogleWithPopup, logout } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        observeAuthState();
    }, [observeAuthState]);

    const handleLogin = useCallback(async () => {
          await loginGoogleWithPopup(); // Espera a que se complete la autenticación
          navigate('/world'); // Navega a "/about" después de la autenticación
      }, [loginGoogleWithPopup, navigate]);
 
    const handleLogout = useCallback(async() => {
        await logout();
        navigate('/'); // Navega a "/" después de desloguearse
    }, [logout], [navigate]);

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
                        
                    </div>
                </>
            ) : (
                <button className="login-button" onClick={handleLogin}>
                    Login with Google
                </button>
            )}
        </div>
    );
}

export default Login;