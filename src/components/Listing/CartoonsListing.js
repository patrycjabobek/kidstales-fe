import React, {useContext, useState} from 'react';


import {CategoriesContext} from "../../contexts/CategoriesContext";

import ListingTable from "../Listing/ListingTable";
import {StyledTitle} from "../../styledHelpers/Components";
import {ListingContainer} from "../../styledHelpers/Components";



export default function CartoonsListing() {
    const { categoriesMap } = useContext(CategoriesContext);

    console.log("cartoons " + categoriesMap)


    return (
        <ListingContainer>
            <StyledTitle>Bajki</StyledTitle>
            <p>Wybierz bajkę, które Ci sie podoba. Możesz skorzystać z darmowych utworów lub wesprzeć autora i wykupić nieograniczony dostęp do twórczości wybranego autora.</p>

            <ListingTable materials={categoriesMap} />
        </ListingContainer>
    )
}