import './Login.css'
import { useEffect, useCallback } from 'react';
import { useAuthStore } from '../../store/use-auth-store';
import UserDAO from '../../DAO/UserDAO';

function Login() {
    const { user, observeAuthState, loginGoogleWithPopup, logout } = useAuthStore();

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

    const handleLogin = useCallback(() => {
        loginGoogleWithPopup();
    }, [loginGoogleWithPopup]);
 
    const handleLogout = useCallback(() => {
        logout();
    }, [logout]);

    return (
        <div className="container-login">
            {user ? (
                <>
                    <div className='world-container'>
                        <p className="welcome-text">Welcome, {user.displayName}</p>
                        <button className="logout-button" onClick={handleLogout}>
                            Logout
                        </button>
                        {/*<World />*/}
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