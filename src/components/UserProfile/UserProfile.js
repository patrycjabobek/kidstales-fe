import React, { useContext, useEffect} from "react";

import { UserContext } from "../../contexts/UserContext";

import MaterialsTable from "../MaterialsTable/MaterialsTable";

import styles from './user-profile.module.scss'
import {useNavigate} from "react-router-dom";


export function UserProfile() {
    const  { currentUser } = useContext(UserContext);
    const navigate = useNavigate();


    useEffect( () => {
        if (!currentUser) return navigate('/login')
    }, [currentUser]);

            return  (
                <div className={styles.userProfileContainer}>
                    <div className={styles.welcome}>
                        <h3>Witaj {currentUser && currentUser.displayName}</h3>
                    </div>
                    <div className={styles.savedMaterialsContainer}>
                        <h3>TWOJE ZAPISANE MATERIAŁY</h3>
                        {/*<p>*/}
                        {/*    <a href="#stories">OPOWIADANIA</a>*/}
                        {/*    <a href="#cartoons">FILMIKI</a>*/}
                        {/*    <a href="#songs">PIOSENKI</a>*/}
                        {/*</p>*/}
                        <MaterialsTable  className={styles.table}/>
                    </div>
                    {/*<div>*/}
                    {/*    <h3>TWOI ULUBIENI TWÓRCY</h3>*/}
                    {/*    <FavoritesAuthorsTable/>*/}
                    {/*</div>*/}

                </div>
            )






}
