import React, {useContext, useEffect, useState} from 'react';


import {CategoriesContext} from "../../contexts/CategoriesContext";

import ListingTable from "./ListingTable";
import {StyledTitle} from "../../styledHelpers/Components";
import {ListingContainer} from "../../styledHelpers/Components";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../utils/firebase/firebase.utils";


export default function StoriesListing() {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let list = [];
            try {
                const q = query(collection(db, "materials"), where("category", "==", "stories"))
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    list.push({ id: doc.id, ...doc.data() });
                });
                setStories(list);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();

    }, []);

        return (
            <ListingContainer>
                <StyledTitle>Opowiadania</StyledTitle>
                <p>Wybierz opowiadania, które Ci sie podoba. Możesz skorzystać z darmowych utworów lub wesprzeć autora i wykupić nieograniczony dostęp do twórczości wybranego autora.</p>
                <ListingTable materials={stories} />
            </ListingContainer>
        )
}

