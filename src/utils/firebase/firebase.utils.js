import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    sendEmailVerification
} from "firebase/auth";
import {getFirestore,
    doc,
    getDoc, //access the data
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCPLNjYR7f4Ow3dWDS1TT_sucBONmHNMeg",
    authDomain: "kidstales-user-reg-auth-9c638.firebaseapp.com",
    projectId: "kidstales-user-reg-auth-9c638",
    storageBucket: "kidstales-user-reg-auth-9c638.appspot.com",
    messagingSenderId: "606734776124",
    appId: "1:606734776124:web:9cbcfbf7ab5b503a2c9039"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

 provider.setCustomParameters({
     propmt: "select_account"
 });


export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    moreInfo = {
        displayName: '',
        identity: '',
    }
) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid); // see if there's an existing document reference

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        const identity = '';

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                identity,
                ...moreInfo
            });
        }catch (e) {
            console.log('error creating user ', e.message)
        }
    }

    return userDocRef;
    // check if user data exist
    // if user data does not exist
    // create / set the document with the data from userAuth in my collection
    // return userDocRef

}

export const createAuthUserWithEmailANdPassword = async (email, password) => {
    if (!email || !password) return;

    return await  createUserWithEmailAndPassword(auth, email, password)
}


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const sendUserPasswordResetEmail = async (email) => {
    if (!email) return;

    return await sendPasswordResetEmail(auth, email);
}