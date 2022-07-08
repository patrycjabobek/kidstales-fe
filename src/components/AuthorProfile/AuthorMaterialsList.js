import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../../contexts/UserContext";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../utils/firebase/firebase.utils";
import ListingItem from "../Listing/ListingItem";
import Popup from "reactjs-popup";
import AuthorMaterialItem from "./AuthorMaterialItem";

export default function AuthorMaterialsList() {
    const {currentUser} = useContext(UserContext);
    const [changeDetails, setChangeDetails] = useState(false)
    const [userMaterials, setUserMaterials] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let list = [];
            try {
                const q = query(collection(db, "materials"), where("authorId", "==", currentUser.uid))
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    list.push({ id: doc.id, ...doc.data() });
                });
                setUserMaterials(list);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();

    }, []);

    return (
        <>
            <div>
                {
                    userMaterials.map((material) => (
                        <AuthorMaterialItem key={material.id} material={material}/>
                    ))
                }
            </div>

        </>
    )
}