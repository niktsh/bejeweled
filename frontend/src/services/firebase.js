import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    updateProfile,
    signInWithPopup
} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBFMatwLFLf6CXtpBE4OBylqy1Jr1mdeKI",
    authDomain: "gamestudio-9900.firebaseapp.com",
    projectId: "gamestudio-9900",
    storageBucket: "gamestudio-9900.firebasestorage.app",
    messagingSenderId: "789625611255",
    appId: "1:789625611255:web:8a685f0634e1ec7eecc4f2",
    measurementId: "G-2DW75PQ742"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
};