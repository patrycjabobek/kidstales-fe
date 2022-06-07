import React, {Fragment, useContext} from "react";

import { UserContext } from "../../contexts/UserContext";

import MaterialsTable from "../MaterialsTable/MaterialsTable";
import FavoritesAuthorsTable from "../FavoritesAuthors/FavoritesAuthorsTable";

import './user-profile.style.css'

export function UserProfile() {
    const { currentUser } = useContext(UserContext);

    return (
        <div className="user-profile-container">
            <div className="welcome">
                <h3>Witaj </h3>
            </div>
            <div className="saved-materials-container">
                <h3>TWOJE ZAPISANE MATERIAŁY</h3>
                <p>
                    <a href="#stories">OPOWIADANIA</a>
                    <a href="#cartoons">FILMIKI</a>
                    <a href="#songs">PIOSENKI</a>
                </p>
                <MaterialsTable id="stories" className="table"/>
            </div>
            <div>
                <h3>TWOI ULUBIENI TWÓRCY</h3>
                <FavoritesAuthorsTable/>
            </div>

        </div>
    )
}