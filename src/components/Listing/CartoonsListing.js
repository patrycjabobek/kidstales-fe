import React, {useContext, useState, useEffect, Fragment} from 'react';

import {useLocation, useParams} from "react-router-dom";

import {CategoriesContext} from "../../contexts/CategoriesContext";

import ListingTable from "../Listing/ListingTable";
import {StyledTitle} from "../../styledHelpers/Components";
import ListingItem from "./ListingItem";
// import firebase from "firebase/compat";


export default function CartoonsListing() {
    const { categoriesMap } = useContext(CategoriesContext);
    const [ stories, setStories] = useState(categoriesMap);

    console.log("cartoons " + stories)


    return (
        <div>
            <StyledTitle>Bajki</StyledTitle>
            <p>Wybierz bajkę, które Ci sie podoba. Możesz skorzystać z darmowych utworów lub wesprzeć autora i wykupić nieograniczony dostęp do twórczości wybranego autora.</p>

            <ListingTable materials={categoriesMap} />
        </div>
    )
}