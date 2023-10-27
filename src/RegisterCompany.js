import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


function RegisterCompany() {
    const [companyName, setCompanyName] = useState('');
    const [subdomain, setSubdomain] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [feedback, setFeedback] = useState('');
    const [errors, setErrors] = useState({});
    const [isChecking, setIsChecking] = useState(false);

    const db = getFirestore();

    const handleGoogleSignUp = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setFirstName(user.displayName.split(' ')[0]);
            setLastName(user.displayName.split(' ')[1]);
            setEmail(user.email);
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
    
        // Double-checking subdomain availability
        const q = query(collection(db, "companies"), where("subdomain", "==", subdomain));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            setErrors({ ...errors, subdomain: 'This subdomain is already taken.' });
            setFeedback("Subdomain is already in use. Please choose another.");
            return;
        }
    
        // The rest of your logic for registering the company (adding to Firestore)
        try {
            const docRef = await addDoc(collection(db, "companies"), {
                companyName: companyName,
                subdomain: subdomain
            });
            setFeedback("Company registered successfully!");
            setCompanyName('');
            setSubdomain('');
            setErrors({});
        } catch (error) {
            setFeedback("Error registering company: ", error);
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', background: 'linear-gradient(45deg, #6D5BBA, #8D58B3)', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ background: 'white', borderRadius: '10px', padding: '40px', width: '500px', boxShadow: '0px 0px 15px rgba(0,0,0,0.2)' }}>
                <h2 style={{ textAlign: 'center', color: '#6D5BBA' }}>Check-It</h2>
                <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#8D58B3' }}>Register Company</h3>
                <form onSubmit={handleRegister}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px' }}>Company Name:</label>
                        <input style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} required />
                        {errors.companyName && <p style={{ color: 'red' }}>{errors.companyName}</p>}
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px' }}>Desired Subdomain:</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} type="text" value={subdomain} onChange={e => setSubdomain(e.target.value)} required />
                            {!isChecking && errors.subdomain && <span style={{ color: 'red', marginLeft: '10px' }}>❌</span>}
                            {!isChecking && !errors.subdomain && subdomain && <span style={{ color: 'green', marginLeft: '10px' }}>✅</span>}
                        </div>
                        {errors.subdomain && <p style={{ color: 'red' }}>{errors.subdomain}</p>}
                    </div>
                    <button style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: errors.subdomain || !subdomain ? '#ccc' : '#8D58B3', color: 'white', cursor: errors.subdomain || !subdomain ? 'not-allowed' : 'pointer' }} type="submit" disabled={errors.subdomain || !subdomain}>
                        {errors.subdomain ? 'Choose another domain name' : 'Register'}
                    </button>
                </form>
                {feedback && <p style={{ marginTop: '20px', textAlign: 'center', color: errors.companyName || errors.subdomain ? 'red' : '#6D5BBA' }}>{feedback}</p>}
                <button onClick={handleGoogleSignUp}>Sign Up with Google</button>
            </div>
        </div>
    );
}

export default RegisterCompany;
