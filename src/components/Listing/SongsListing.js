import React, {useContext, useState, useEffect} from 'react';

import { useParams } from "react-router-dom";

import {CategoriesContext} from "../../contexts/CategoriesContext";

import ListingTable from "./ListingTable";
import {StyledTitle} from "../../styledHelpers/Components";


export default function SongsListing() {
    const { categoriesMap } = useContext(CategoriesContext);
    const [ stories, setStories] = useState(categoriesMap);


    useEffect(() => {
        Object.keys(categoriesMap).map((title) => {
            setStories(Object.keys(categoriesMap).filter((title) => categoriesMap[title] === "stories"));
        })
    }, [stories, categoriesMap])

    return (
        <div>
            <StyledTitle>Piosenki</StyledTitle>
            <p>Wybierz piosenkę, które Ci sie podoba. Wszytkie utwory są dostępne dla Ciebie za darmo jednak nadal możesz wesprzeć swojego ulubionego twórcę.</p>
            <ListingTable materials={stories} />
        </div>
    )
}