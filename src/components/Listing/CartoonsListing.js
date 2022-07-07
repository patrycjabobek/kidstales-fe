import React, {useContext, useEffect, useState} from 'react';


import {CategoriesContext} from "../../contexts/CategoriesContext";

import ListingTable from "../Listing/ListingTable";
import {StyledTitle} from "../../styledHelpers/Components";
import {ListingContainer} from "../../styledHelpers/Components";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../utils/firebase/firebase.utils";



export default function CartoonsListing() {
    const [cartoons, setCartoons] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let list = [];
            try {
                const q = query(collection(db, "materials"), where("category", "==", "cartoons"))
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    list.push({ id: doc.id, ...doc.data() });
                });
                setCartoons(list);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();

    }, []);

        return (
        <ListingContainer>
            <StyledTitle>Bajki</StyledTitle>
            <p>Wybierz bajkę, które Ci sie podoba. Możesz skorzystać z darmowych utworów lub wesprzeć autora i wykupić nieograniczony dostęp do twórczości wybranego autora.</p>

            <ListingTable materials={cartoons} />
        </ListingContainer>
    )
}