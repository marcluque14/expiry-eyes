import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBgRi53Z9G8vSUI1IbYWPb3vFJ5WU1e7UE",
    authDomain: "expiry-eyes-9bbcb.firebaseapp.com",
    projectId: "expiry-eyes-9bbcb",
    storageBucket: "expiry-eyes-9bbcb.firebasestorage.app",
    messagingSenderId: "880724423074",
    appId: "1:880724423074:web:dcd5948a4a1e11776d42fb",
    measurementId: "G-CY2LYCLBZR"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };