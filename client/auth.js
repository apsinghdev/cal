import { auth, googleProvider } from './configuration.js';
import { 
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

const HOST = 'http://localhost:8000'


export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();

        await fetch(`${HOST}/api/auth/verify-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
        });

        return result;
    } catch (error) {
        console.error("Error signing in with Google:", error);
        throw error;
    }
};

export const logout = () => {
    return signOut(auth);
};

export const subscribeToAuthChanges = (setUser) => {
    return onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
};