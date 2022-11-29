import React, {useEffect, useState} from 'react'
import ListingTable from "./ListingTable";

import {ListingContainer} from "../../styledHelpers/Components";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../utils/firebase/firebase.utils";

export default function Listing() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let list = [];
            try {
                const querySnapshot = await getDocs(collection(db, "materials"));
                querySnapshot.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();

    }, []);

    return (
        <ListingContainer>
            <ListingTable materials={data}></ListingTable>
        </ListingContainer>
    )
}

