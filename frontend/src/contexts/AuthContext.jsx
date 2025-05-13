import React, { createContext, useState, useEffect } from 'react';
import {
    auth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
    signOut as firebaseSignOut,
} from '../services/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isGuest, setIsGuest] = useState(false);
    const [playerName, setPlayerName] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);

            const storedGuestStatus = localStorage.getItem('isGuest') === 'true';
            const storedGuestName = localStorage.getItem('guestName');

            if (user) {
                // Пользователь зарегистрирован
                if (user.displayName) {
                    setPlayerName(user.displayName);
                    setIsGuest(false);
                } else if (storedGuestStatus && storedGuestName) {
                    // fallback: гость
                    setIsGuest(true);
                    setPlayerName(storedGuestName);
                }
            } else if (storedGuestStatus && storedGuestName) {
                // пользователь вышел, но был гость
                setIsGuest(true);
                setPlayerName(storedGuestName);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


    const signIn = async (email, password) => {
        try {
            setError(null);
            await signInWithEmailAndPassword(auth, email, password);
            return true;
        } catch (error) {
            setError(getErrorMessage(error));
            return false;
        }
    };

    const signUp = async (email, password, username) => {
        try {
            setError(null);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: username
            });

            localStorage.removeItem('isGuest');
            localStorage.removeItem('guestName');
            setIsGuest(false);
            setPlayerName(username);
            return true;
        } catch (error) {
            setError(getErrorMessage(error));
            return false;
        }
    };

    const signInWithGoogle = async () => {
        try {
            setError(null);
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            return true;
        } catch (error) {
            setError(getErrorMessage(error));
            return false;
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            localStorage.removeItem('isGuest');
            localStorage.removeItem('guestName');
            setIsGuest(false);
            setPlayerName(null);
            return true;
        } catch (error) {
            setError(getErrorMessage(error));
            return false;
        }
    };

    const signInAsGuest = (guestName = "Guest") => {
        setIsGuest(true);
        setPlayerName(guestName);
        localStorage.setItem('isGuest', 'true');
        localStorage.setItem('guestName', guestName);
    };

    const getErrorMessage = (error) => {
        switch(error.code) {
            case 'auth/email-already-in-use':
                return 'This email is already in use';
            case 'auth/invalid-email':
                return 'Invalid email address';
            case 'auth/user-not-found':
                return 'User not found';
            case 'auth/wrong-password':
                return 'Incorrect password';
            case 'auth/weak-password':
                return 'Password is too weak (minimum 8 characters)';
            default:
                return `Error: ${error.message}`;
        }
    };

    const value = {
        currentUser,
        playerName,
        isGuest,
        loading,
        error,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        signInAsGuest
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};