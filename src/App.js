// React imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

// Firebase imports
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import FirestoreSetupButton from './FirestoreSetup';
import BuilderRoute from "./components/BuilderRoute";



// Local imports
import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage';
import Login from './Login'; 
import RegisterCompany from './RegisterCompany';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_j4MxPaJ0TM3HKeT9X7RSQWycxzG1rgg",
  authDomain: "check-it-21da6.firebaseapp.com",
  projectId: "check-it-21da6",
  storageBucket: "check-it-21da6.appspot.com",
  messagingSenderId: "144013133006",
  appId: "1:144013133006:web:684b5d594c8e7a744c3c9f",
  measurementId: "G-R2MV2FL8VL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function NavigationButtons() {
  let navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <HomePage 
      onLoginClick={handleLoginClick}
      onRegisterClick={handleRegisterClick} 
    />
  );
}


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<NavigationButtons />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterCompany />} />
          <Route path="*" component={BuilderRoute} />
        </Routes>
        
        {/* Component to setup Firestore structure */}
        <FirestoreSetupButton />
      </div>
    </Router>
  );
}
export default App;

