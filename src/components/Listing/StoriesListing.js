import React, {useContext, useState, useEffect} from 'react';

import { useParams } from "react-router-dom";

import {CategoriesContext} from "../../contexts/CategoriesContext";

import ListingTable from "./ListingTable";
import {StyledTitle} from "../../styledHelpers/Components";


export default function StoriesListing() {
    const { categoriesMap } = useContext(CategoriesContext);
    const [ stories, setStories] = useState(categoriesMap);


    useEffect(() => {
        Object.keys(categoriesMap).map((title) => {
            setStories(Object.keys(categoriesMap).filter((title) => categoriesMap[title] === "stories"));
        })
    }, [stories, categoriesMap])

        return (
            <div>
                <StyledTitle>Opowiadania</StyledTitle>
                <p>Wybierz opowiadania, które Ci sie podoba. Możesz skorzystać z darmowych utworów lub wesprzeć autora i wykupić nieograniczony dostęp do twórczości wybranego autora.</p>
                <ListingTable materials={stories} />
            </div>
        )
}