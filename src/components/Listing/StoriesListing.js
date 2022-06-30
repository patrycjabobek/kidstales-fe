import React, {useContext, useState, useEffect} from 'react';


import {CategoriesContext} from "../../contexts/CategoriesContext";

import ListingTable from "./ListingTable";
import {StyledTitle} from "../../styledHelpers/Components";
import {ListingContainer} from "../../styledHelpers/Components";


export default function StoriesListing() {
    const { categoriesMap } = useContext(CategoriesContext);


        return (
            <ListingContainer>
                <StyledTitle>Opowiadania</StyledTitle>
                <p>Wybierz opowiadania, które Ci sie podoba. Możesz skorzystać z darmowych utworów lub wesprzeć autora i wykupić nieograniczony dostęp do twórczości wybranego autora.</p>
                <ListingTable materials={categoriesMap} />
            </ListingContainer>
        )
}