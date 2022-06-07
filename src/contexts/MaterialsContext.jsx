import  {createContext, useState, useEffect} from 'react';
import {createUserDocumentFromAuth, onAuthStateChangedListener} from '../utils/firebase/firebase.utils';

import MATERIALS from '../materias-data.json';

const saveMaterialForUser = (savedMaterials, materialToAdd) => {
    const existingMaterial = savedMaterials.find((materialItem) => materialItem.id === materialToAdd.id);

    if (existingMaterial) return;

    console.log(materialToAdd)
    return [...savedMaterials, {...materialToAdd}];

}

export const MaterialsContext = createContext({
    materials: [],
    savedMaterials: [],
    saveMaterial: () => {},
});

export const MaterialsProvider = ({children}) => {
    const [materials, setMaterials] = useState(MATERIALS);
    const [savedMaterials, setSavedMaterials] = useState([]);

    const saveMaterial = (materialToSave) => {
        setSavedMaterials(saveMaterialForUser(savedMaterials, materialToSave));
    }

    const value = {materials, setMaterials, saveMaterial, savedMaterials};

    return <MaterialsContext.Provider value={value}>{children}</MaterialsContext.Provider>
}