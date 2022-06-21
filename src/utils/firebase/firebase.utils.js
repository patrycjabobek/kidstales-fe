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
    sendEmailVerification,
} from "firebase/auth";
import {getFirestore,
    doc,
    getDoc, //access the data
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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

export const addCollectionAndDocuments = async ( collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done')
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, materials } = docSnapshot.data();
        acc[title.toLowerCase()] = materials;
        return acc;
    }, {})

    return categoryMap;
}

export const createUserDocumentFromAuth = async (
    userAuth,
    moreInfo = {
        identity: '',
        imgUrl: '',
        userDescription: '',
    }
) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid); // see if there's an existing document reference

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()){
        const {displayName, email, uid} = userAuth;
        const createdAt = new Date();
        const identity = '';
        const imgUrl = '';
        const userDescription = '';

        try {
            await setDoc(userDocRef, {
                uid,
                displayName,
                email,
                createdAt,
                identity,
                imgUrl,
                userDescription,
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