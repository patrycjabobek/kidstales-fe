import React from 'react'
import styled from 'styled-components';
import ListingTable from "./ListingTable";
import {Routes, Route} from 'react-router-dom';

const  ListingContainer = styled.div`
  background: white;
  padding: 20px 40px;
`;

export default function Listing(props) {
    // const listingTitle = props.title;
    // const type = useParams();
    //
    // const renderDescription = () => {
    //     if (listingTitle === "Bajki") {
    //         return <p>Wybierz bajkę, które Ci sie podoba. Możesz skorzystać z darmowych utworów lub wesprzeć autora i wykupić nieograniczony dostęp do twórczości wybranego autora.</p>;
    //     } else if (listingTitle === "Opowiadania") {
    //         return <p>Wybierz piosenkę, które Ci sie podoba. Wszytkieutwory są dostępne dla Ciebie za darmo jednak nadal możesz wesprzeć swojego ulubionego wykonawcę.</p>;
    //     } else if (listingTitle === "Piosenki") {
    //         return  <p>Wybierz opowiadania, które Ci sie podoba. Możesz skorzystać z darmowych utworów lub wesprzeć autora i wykupić nieograniczony dostęp do twórczości wybranego autora.</p>;
    //     }
    // }
    return (
        <ListingContainer>
            <ListingTable></ListingTable>
        </ListingContainer>
    )
}

