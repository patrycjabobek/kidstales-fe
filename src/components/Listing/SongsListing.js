import React, {useContext, useState, useEffect} from 'react';


import {CategoriesContext} from "../../contexts/CategoriesContext";

import ListingTable from "./ListingTable";
import {StyledTitle} from "../../styledHelpers/Components";
import {ListingContainer} from "../../styledHelpers/Components";

export default function SongsListing() {
    const { categoriesMap } = useContext(CategoriesContext);



    return (
        <ListingContainer>
            <StyledTitle>Piosenki</StyledTitle>
            <p>Wybierz piosenkę, które Ci sie podoba. Wszytkie utwory są dostępne dla Ciebie za darmo jednak nadal możesz wesprzeć swojego ulubionego twórcę.</p>
            <ListingTable materials={categoriesMap} />
        </ListingContainer>
    )
}