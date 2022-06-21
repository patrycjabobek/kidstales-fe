import React, {Fragment, useContext, useState} from 'react'
import styled from 'styled-components';
import Logo from "../Logo/Logo";
import NavBar from "../Navigation/NavBar";
import ListingItem from './ListingItem'

import {CategoriesContext} from '../../contexts/CategoriesContext'

import styles from './listing-table.module.css';
import {query, where} from "firebase/firestore";


export default function ListingTable(props) {
    const { categoriesMap } = useContext(CategoriesContext);
    let {categoriesList, setCategoriesList} = useState();

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
                            {
                                Object.keys(categoriesMap).map((title) =>
                                    <Fragment key={title}>
                                        {categoriesMap[title].map((material) => (
                                            <ListingItem key={material.id} material={material}/>
                                        ))}
                                    </Fragment>
                                )}

                            {/*<ListingItem key={props.title} material={props.materials}/>*!/*/}
                        </tbody>
                    </table>

            </div>
        </Fragment>
    )
}

