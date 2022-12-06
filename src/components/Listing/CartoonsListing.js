import React, { useEffect, useState } from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import styled from "styled-components";

import ListingTable from "../Listing/ListingTable";
import {
  StyledTitle,
  ListingContainer,
  StyledListingDescription,
} from "../../styledHelpers/Components";

export default function CartoonsListing() {
  const [cartoons, setCartoons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const q = query(
          collection(db, "materials"),
          where("category", "==", "cartoons")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          list.push({ id: doc.id, ...doc.data() });
        });
        setCartoons(list);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchData();
  }, []);

  return (
    <ListingContainer>
      <StyledTitle>Bajki</StyledTitle>
      <StyledListingDescription>
        Wybierz bajkę, które Ci sie podoba. Możesz skorzystać z darmowych
        utworów lub wesprzeć autora i wykupić nieograniczony dostęp do
        twórczości wybranego autora.
      </StyledListingDescription>

      <ListingTable materials={cartoons} />
    </ListingContainer>
  );
}
