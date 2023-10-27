import React from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_j4MxPaJ0TM3HKeT9X7RSQWycxzG1rgg",
  authDomain: "check-it-21da6.firebaseapp.com",
  projectId: "check-it-21da6",
  storageBucket: "check-it-21da6.appspot.com",
  messagingSenderId: "144013133006",
  appId: "1:144013133006:web:684b5d594c8e7a744c3c9f",
  measurementId: "G-R2MV2FL8VL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const setupFirestoreStructure = async () => {
  try {
    // Add a country
    const countryRef = await addDoc(collection(db, "countries"), {
      name: "Example Country"
    });

    // Add a city to that country
    const cityRef = await addDoc(collection(db, "countries", countryRef.id, "cities"), {
      name: "Example City"
    });

    // Add a site to that city
    const siteRef = await addDoc(collection(db, "countries", countryRef.id, "cities", cityRef.id, "sites"), {
      name: "Example Site"
    });

    // Add a team to that site
    const teamRef = await addDoc(collection(db, "countries", countryRef.id, "cities", cityRef.id, "sites", siteRef.id, "teams"), {
      name: "Example Team"
    });

    // Add a user to that team
    await addDoc(collection(db, "countries", countryRef.id, "cities", cityRef.id, "sites", siteRef.id, "teams", teamRef.id, "users"), {
      firstName: "Example",
      lastName: "User",
      email: "example.user@email.com"
    });

    alert('Data added successfully!');
  } catch(error) {
    console.error("Error adding document: ", error);
    alert('Error setting up data. Check the console.');
  }
}

const FirestoreSetupButton = () => {
  return (
    <div>
      <button onClick={setupFirestoreStructure}>Set Up Firestore Structure</button>
    </div>
  );
}

export default FirestoreSetupButton;
