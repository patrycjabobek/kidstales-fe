import  {createContext, useState, useEffect} from 'react';
import {
    createUserDocumentFromAuth,
    db,
    onAuthStateChangedListener
} from '../utils/firebase/firebase.utils';
import {doc, getDoc} from "firebase/firestore";


export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    // const [user, setUser] = useState(null);


    useEffect(() => {
        const unsub = onAuthStateChangedListener((user) => {
            // console.log(user);
            if (user) {
                createUserDocumentFromAuth(user);
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

    const value = {currentUser, setCurrentUser};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}