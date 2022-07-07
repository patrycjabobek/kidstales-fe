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
    updateEmail,
    updatePassword,
    updateProfile,
    updateCurrentUser,
    updatePhoneNumber,
    deleteUser
} from "firebase/auth";
import {getFirestore,
    doc,
    getDoc, //access the data
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';
import {
    getStorage
} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCPLNjYR7f4Ow3dWDS1TT_sucBONmHNMeg",
    authDomain: "kidstales-user-reg-auth-9c638.firebaseapp.com",
    projectId: "kidstales-user-reg-auth-9c638",
    storageBucket: "kidstales-user-reg-auth-9c638.appspot.com",
    messagingSenderId: "606734776124",
    appId: "1:606734776124:web:9cbcfbf7ab5b503a2c9039"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

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
export const getUsersAndDocuments = async () => {
    const collectionRef = collection(db, 'users');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const userMap = querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });

    return userMap;
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


        try {
            await setDoc(userDocRef, {
                uid,
                displayName,
                email,
                createdAt,
                ...moreInfo
            });
        }catch (e) {
            console.log('error creating user ', e.message)
        }
    }

    return userDocRef;

}

// export const getUserData = async (uid) => {
//         const usersRef = doc(db, "users", uid);
//         const docSnap = await getDoc(usersRef);
//
//         const data = docSnap.exists() ? docSnap.data() : null
//
//         console.log(data);
//         console.log(data.identity);
//         return data;
// }

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

export const updateUserProfile = async (user, displayName) => {
    if (!user) return;

    return user.updateProfile({ displayName });
}

export const updateUserEmail = async (user, email) => {
    if (!email || !user) return;

    return updateEmail(user, email);
}

export const deleteUserAccount = async (user) => {
    if (!user) return;

    return deleteUser(user).then(() => {
        console.log("User successfully deleted!")
    }).catch((e) => {
        console.log(e);
    })
}

export const updateUserPassword = async (user, password) => {
    if (!user || !password) return;

    return updatePassword(user, password);
}