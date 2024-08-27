import { useEffect, useCallback } from 'react';
import { useAuthStore } from '../../stores/use-auth-store';

function Login() {
    const { user, observeAuthState, loginGoogleWithPopup, logout } = useAuthStore();

    useEffect(() => {
        observeAuthState();
    }, [observeAuthState]);

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
                    <p className="welcome-text">Welcome, {user.displayName}</p>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
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