import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCS1DlPMgAQfLf9LD032B-Hxx1yq5RYiR8",
    authDomain: "crwn-clothing-db-8bcc6.firebaseapp.com",
    projectId: "crwn-clothing-db-8bcc6",
    storageBucket: "crwn-clothing-db-8bcc6.appspot.com",
    messagingSenderId: "633041383390",
    appId: "1:633041383390:web:f4f69fbcc476f8707a774f",
    measurementId: "G-HXXYCC2L5P"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;