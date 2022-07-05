import React, { useContext, useState, useEffect } from 'react'
import { auth } from "../utils/firebase/firebase.utils";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, updateEmail} from "firebase/auth";

const AuthContext = React.createContext();


export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [isParent, setIsParent] = useState(true);
    const [loading, setLoading] = useState(true);


    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        // this u change if you dont want to use firebase but e.g your own server
        return signInWithEmailAndPassword(auth, email, password)
    }


    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {

            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
