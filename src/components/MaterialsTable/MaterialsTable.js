import React, {Fragment, useContext} from 'react';

import {CategoriesContext} from "../../contexts/CategoriesContext";

import MaterialsItem from "./MaterialsItem";

import './materials-table.style.css'

export default function MaterialsTable() {
    const { savedMaterials } = useContext(CategoriesContext);

    console.log(savedMaterials)

    return (
        <Fragment>
            <div className="materials-table">
                <tbody>
                {savedMaterials.map((material) => (
                    <MaterialsItem key={material.id} material={material}/>
                ))}
                </tbody>
            </div>
        </Fragment>
    )
}