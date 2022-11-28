import React, {Fragment, useContext} from 'react';

import {CategoriesContext} from "../../contexts/CategoriesContext";

import MaterialsItem from "./MaterialsItem";

import styles from './materials-table.module.scss'

export default function MaterialsTable() {
    const { savedMaterials } = useContext(CategoriesContext);

    console.log(savedMaterials)

    return (
        <Fragment>
            <div className={styles.materialsTable}>
                <tbody>
                {savedMaterials.map((material) => (
                    <MaterialsItem key={material.id} material={material}/>
                ))}
                </tbody>
            </div>
        </Fragment>
    )
}