import React, {Fragment, useContext, useEffect, useState} from 'react'
import ListingItem from './ListingItem'

import {CategoriesContext} from '../../contexts/CategoriesContext'

import styles from './listing-table.module.css';
import {getDocs, collection} from "firebase/firestore";
import {db} from "../../utils/firebase/firebase.utils";


export default function ListingTable(props) {
    // const { categoriesMap } = useContext(CategoriesContext);
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
            <div>
                    <input type="text"
                           className={styles.input}
                           placeholder={"Szukaj"}
                            onChange={handleSearch}/>
                    <table className={styles.table}>
                        <thead className={styles.tableHeader}>
                            <tr>
                                <th>
                                    Autor
                                </th>
                                <th>
                                    Ocena
                                </th>
                                <th>
                                    Cena (zł)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                                    <Fragment key={materials.id}>
                                        {materials.map((material) => (
                                            <ListingItem key={material.id} material={material}/>
                                        ))}
                                    </Fragment>
                        </tbody>
                    </table>

            </div>
        </Fragment>
    )
}

