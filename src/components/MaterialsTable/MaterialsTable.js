import React, {Fragment, useContext} from 'react';

import {MaterialsContext} from "../../contexts/MaterialsContext";

import MaterialsItem from "./MaterialsItem";

import './materials-table.style.css'

export default function MaterialsTable() {
    const { savedMaterials } = useContext(MaterialsContext);

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