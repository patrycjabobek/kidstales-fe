import React, { useState, useEffect } from "react";

import ListingTable from "./ListingTable";
import {
  StyledTitle,
  ListingContainer,
  StyledListingDescription,
} from "../../styledHelpers/Components";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";

export default function SongsListing() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const q = query(
          collection(db, "materials"),
          where("category", "==", "songs")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          list.push({ id: doc.id, ...doc.data() });
        });
        setSongs(list);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchData();
  }, []);

  return (
    <ListingContainer>
      <StyledTitle>Piosenki</StyledTitle>
      <StyledListingDescription>
        Wybierz piosenkę, które Ci sie podoba. Wszytkie utwory są dostępne dla
        Ciebie za darmo jednak nadal możesz wesprzeć swojego ulubionego twórcę.
      </StyledListingDescription>
      <ListingTable materials={songs} category="songs" />
    </ListingContainer>
  );
}
