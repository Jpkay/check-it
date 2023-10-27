import React, { useState } from 'react';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import './Login.css';  // Assuming you have a CSS file for styles.

function Login() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const signInWithGoogle = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {
            setUser(result.user);
        })
        .catch((err) => {
            if (err.code === 'auth/popup-closed-by-user') {
                setError('Popup closed by user'); 
            } else {
                setError(err.message);
            }
        });
    };

    const logout = () => {
        const auth = getAuth();
        signOut(auth)
        .then(() => {
            setUser(null);
        })
        .catch((err) => {
            setError(err.message);
        });
    };

    return (
        <div className="login-container">
            {user ? (
                <div className="welcome-section">
                    <p>Welcome, <span className="user-name">{user.displayName}</span>!</p>
                    <button className="btn logout-btn" onClick={logout}>Log Out</button>
                </div>
            ) : (
                <div className="signin-section">
                    <button className="btn signin-btn" onClick={signInWithGoogle}>Sign in with Google</button>
                </div>
            )}

            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default Login;
