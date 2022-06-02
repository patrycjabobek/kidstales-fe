import  {createContext, useState, useEffect} from 'react';
import {createUserDocumentFromAuth, onAuthStateChangedListener} from '../utils/firebase/firebase.utils';

import MATERIALS from '../materias-data.json';

export const MaterialsContext = createContext({
    materials: [],

});

export const MaterialsProvider = ({children}) => {
    const [materials, setMaterials] = useState(MATERIALS);
    const value = {materials, setMaterials};


    // useEffect(() => {
    //     const unsub = onAuthStateChangedListener((user) => {
    //         console.log(user);
    //         if (user) {
    //             createUserDocumentFromAuth(user);
    //         }
    //         setCurrentUser(user);
    //     });
    //
    //     return unsub;
    // }, [])
    return <MaterialsContext.Provider value={value}>{children}</MaterialsContext.Provider>
}