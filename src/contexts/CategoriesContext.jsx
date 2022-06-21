import  {createContext, useState, useEffect} from 'react';

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

const saveMaterialForUser = (savedMaterials, materialToAdd) => {
    const existingMaterial = savedMaterials.find((materialItem) => materialItem.id === materialToAdd.id);

    if (existingMaterial) return;

    console.log(materialToAdd)
    return [...savedMaterials, {...materialToAdd}];
}



export const CategoriesContext = createContext({
    categoriesMap: {},
    savedMaterials: [],
    saveMaterial: () => {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const [savedMaterials, setSavedMaterials] = useState([]);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap)
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, [])

    const saveMaterial = (materialToSave) => {
        setSavedMaterials(saveMaterialForUser(savedMaterials, materialToSave));
    }

    const value = {categoriesMap, setCategoriesMap, saveMaterial, savedMaterials};

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}