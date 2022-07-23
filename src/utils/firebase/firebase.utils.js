
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCvFgiHLkH6uiNQ7s4tUkzzSASfEZ4Cvf4",
    authDomain: "rrymestore-a5134.firebaseapp.com",
    projectId: "rrymestore-a5134",
    storageBucket: "rrymestore-a5134.appspot.com",
    messagingSenderId: "431021610311",
    appId: "1:431021610311:web:4b757d41b6617c44d02862"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)


// Firestore

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }
    return userDocRef
}
