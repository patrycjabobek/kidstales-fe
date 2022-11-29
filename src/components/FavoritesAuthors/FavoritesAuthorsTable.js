import React, {Fragment, useContext} from "react";

import {FavoritesAuthorsContext} from "../../contexts/FavoritesAuthorsContext";

import FavoriteAuthor from "./FavoriteAuthor";



export default function FavoritesAuthorsTable() {
    const { favoritesAuthors } = useContext(FavoritesAuthorsContext);


    return (
        <Fragment>
            <table>
                <thead>
                    <tr>
                        <th>AUTOR</th>
                        <th>OCENA</th>
                        <th>ILOŚĆ ZAPISANYCH MATERIAŁÓW</th>
                    </tr>
                </thead>
                <tbody>
                {favoritesAuthors.map((favoriteAuthor) => (
                    <FavoriteAuthor key={favoriteAuthor.id} favoriteAuthor={favoriteAuthor}/>
                ))}
                </tbody>
            </table>
        </Fragment>
    )
}