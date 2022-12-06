import { createContext, useState, useEffect } from "react";

import {
  getMaterialsAndDocuments,
  getMaterialsByCat,
} from "../utils/firebase/firebase.utils";

const saveMaterialForUser = (savedMaterials, materialToAdd) => {
  const existingMaterial = savedMaterials.find(
    (materialItem) => materialItem.id === materialToAdd.id
  );

  if (existingMaterial) return;

  console.log(materialToAdd);
  return [...savedMaterials, { ...materialToAdd }];
};

export const CategoriesContext = createContext({
  categoriesMap: {},
  materialsMap: {},
  savedMaterials: [],
  saveMaterial: () => {},
});

export const CategoriesProvider = ({ children }) => {
  const [materialsMap, setMaterialsMap] = useState({});
  const [savedMaterials, setSavedMaterials] = useState([]);
  const [materialsByCat, setMaterialsByCat] = useState([]);

  useEffect(() => {
    const getMaterialsMap = async () => {
      const materialMap = await getMaterialsAndDocuments();
      setMaterialsMap(materialMap);
    };

    const getOthersMap = async () => {
      const otherMap = await getMaterialsByCat("other");

      setMaterialsByCat(otherMap);
    };

    const getSongsMap = async () => {
      const songMap = await getMaterialsByCat("songs");

      setMaterialsByCat(songMap);
    };

    const getCartoonsMap = async () => {
      const cartoonMap = await getMaterialsByCat("cartoons");

      setMaterialsByCat(cartoonMap);
    };

    const getStoriesMap = async () => {
      const storyMap = await getMaterialsByCat("stories");

      setMaterialsByCat(storyMap);
    };

    getMaterialsMap();
    getOthersMap();
    getStoriesMap();
    getCartoonsMap();
    getSongsMap();
  }, []);

  const saveMaterial = (materialToSave) => {
    setSavedMaterials(saveMaterialForUser(savedMaterials, materialToSave));
  };

  const value = {
    materialsMap,
    setMaterialsMap,
    saveMaterial,
    savedMaterials,
    setMaterialsByCat,
    materialsByCat,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
