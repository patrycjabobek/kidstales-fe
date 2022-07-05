import  {createContext, useState, useEffect} from 'react';
import {
    createUserDocumentFromAuth,
    db,
    onAuthStateChangedListener
} from '../utils/firebase/firebase.utils';
import {doc, getDoc} from "firebase/firestore";

const getUserData = async (uid) => {
    const usersRef = doc(db, "users", uid);
    const docSnap = await getDoc(usersRef);

    const data = docSnap.exists() ? docSnap.data() : null

    console.log(data);
    console.log(data.identity);
    return data;
}

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userIdentity, setUserIdentity] = useState(null);


    useEffect(() => {
        const unsub = onAuthStateChangedListener((user) => {
            // console.log(user);
            if (user) {
                createUserDocumentFromAuth(user);
                getUserData(user.uid).then((identity) => {
                    setUserIdentity(identity);
                    console.log("indetity", userIdentity);

                });
            }
            setCurrentUser(user);

        });


        return unsub;
    }, [])

    // useEffect(() => {
    //     try {
    //         if (!currentUser) return;
    //         const docUserRef = doc(db, "users", currentUser.uid);
    //
    //         const getData = async () => {
    //             const docSnapshot = await getDoc(docUserRef);
    //             setUser(docSnapshot.data());
    //         }
    //
    //         getData();
    //     } catch (e) {
    //         console.log("error: ", e);
    //     }
    // }, [])

    const value = {currentUser, setCurrentUser, userIdentity, setUserIdentity};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}