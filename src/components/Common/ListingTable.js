import React, {useContext} from 'react'
import styled from 'styled-components';
import Logo from "../Logo/Logo";
import NavBar from "../Navigation/NavBar";
import ListingItem from './ListingItem'

import {MaterialsContext} from '../../contexts/MaterialsContext'


export default function ListingTable(props) {
    const { materials } = useContext(MaterialsContext);

    return (
        <div>
            <input type="text" placeholder={"Szukaj"}/>
                <table>
                    <thead>
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
                    {materials.map((material) => (
                        <ListingItem key={material.id} material={material}/>
                    ))}
                    </tbody>
                </table>

        </div>
    )
}

