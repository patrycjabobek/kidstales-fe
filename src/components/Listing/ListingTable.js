import React, { Fragment, useContext, useEffect } from "react";
import ListingItem from "./ListingItem";
import AudioItem from "./AudioItem";

// import { CategoriesContext } from "../../contexts/CategoriesContext";

import styles from "./listing-table.module.scss";

export default function ListingTable(props) {
  const materials = props.materials;
  function handleSearch(e) {
    // categoriesList = categoriesMap;
    // categoriesList = categoriesList.filter((item) {
    //     return item.toLowerCase().search(
    //         e.target.value.toLowerCase()) !== -1;
    //     )
    // });
    // setCategoriesList()
  }

  return (
    <Fragment>
      <div className={styles.listingTableContainer}>
        {/* <input
          type="text"
          className={styles.input}
          placeholder={"Szukaj"}
          onChange={handleSearch}
        /> */}
        {props.materials[0]?.category != "songs" ? (
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>Autor</th>
                <th>Ocena</th>
                <th>Cena (zł)</th>
              </tr>
            </thead>
            <tbody>
              <Fragment key={materials.id}>
                {materials.map((material) => (
                  <ListingItem key={material.id} material={material} />
                ))}
              </Fragment>
            </tbody>
          </table>
        ) : (
          <Fragment key={materials.id}>
            {materials.map((material) => (
              <AudioItem key={material.id} material={material} />
            ))}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}
