import React from 'react';

function HomePage({ onLoginClick, onRegisterClick }) {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', background: 'linear-gradient(45deg, #6D5BBA, #8D58B3)', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ color: 'white', fontSize: '3em' }}>Welcome to Check-It!</h1>
            <div>
                <button 
                    style={{ margin: '10px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#8D58B3', color: 'white', cursor: 'pointer' }}
                    onClick={onLoginClick}
                >
                    Login
                </button>
                <button 
                    style={{ margin: '10px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#6D5BBA', color: 'white', cursor: 'pointer' }}
                    onClick={onRegisterClick}
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default HomePage;
