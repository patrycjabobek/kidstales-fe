import React, {useContext, useEffect, useState} from 'react'

import Card from "./Card";
import OvalButton from "../Buttons/OvalButton";

import styles from './main-page.module.scss';
import parentsReadingImage from '../../assets/images/parents-reading-book.png';

import {Dot, MainTitle} from '../../styledHelpers/Components'

import {UserContext} from "../../contexts/UserContext";
import CategoriesPreview from "../CategoriesPreview/CategoriesPreview";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../utils/firebase/firebase.utils";

export default function MainPage() {
    const { currentUser } = useContext(UserContext);
    const [identity, setIdentity] = useState("")

    useEffect(() => {
        const getUserData = async () => {

            try {
                const usersRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(usersRef);

                const data = docSnap.exists() ? docSnap.data() : null

                setIdentity(data.identity);

            } catch (e) {
                console.log(e)
            }
        }
        getUserData();
    }, [currentUser])


    if (currentUser && identity === "parent") {
        return (
            <div className={styles.mainPageContainerLogged}>
                <MainTitle >Witaj w Strefie Dziecka</MainTitle>
                <p className={styles.description}>W tej strefie będziesz mógł zapewnić Twoim pociechom bezpieczną rozrywkę poprzez dostęp do najpiękniejszych utworów dedykowanych najmłodszym</p>
                  <CategoriesPreview identity="parent"/>
            </div>
        )
    } else
        if (currentUser && identity === "author" ) {
        return (
            <div className={styles.mainPageContainerLogged}>
                <MainTitle >Witaj w Strefie Twórcy</MainTitle>
                <p className={styles.description}>W tej strefie będziesz mógł udostępniać innym użytkownikom swoją twórczość, śledzić statystyki oraz spersonalizować Twój profil</p>
                    <CategoriesPreview />
            </div>
        )
    }
    return (
        <div className={styles.mainPageContainer}>
            <div className={styles.mainSection}>
                <div className={styles.column1}>
                    <MainTitle >Bezpieczne Miejsce  <br/> Dla Twojego  <br/> Dziecka</MainTitle>
                    <p className={styles.descriptionDefault}>Zajrzyj do świata pełnego dziecęcej radości i przygód! <br/> Zapisz się już dziś!</p>
                    <OvalButton url={'/login'}
                                backgroundColor={'#E0F1FA'}
                                color={'#0C2C80'}
                                borderRadius={'20px'}
                                padding={'6px 16px'}
                                fontSize={'1.25rem'}
                                fontWeight={'600'}
                                content={'Dołącz do nas'}
                    ></OvalButton>
                </div>
                <div className={styles.column2}><img src={parentsReadingImage} alt=""/></div>
            </div>

            <div className={styles.offerContainer}>
                <div className={styles.offerList}>
                    <div className={styles.offerItem}>
                    <Dot style={{backgroundColor: '#A4ADFE'}}/>
                        <h4>Bajki</h4>
                    </div>
                    <div className={styles.offerItem}>
                    <Dot style={{backgroundColor: '#0C2C80'}}/>
                        <h4>Opowiadania</h4>
                    </div>
                    <div className={styles.offerItem}>
                    <Dot style={{backgroundColor: '#4753BC'}}/>
                        <h4>Piosenki</h4>
                    </div>
                    <div className={styles.offerItem}>
                    <Dot style={{backgroundColor: '#E0F1FA'}}/>
                        <h4>Teksty piosenek</h4>
                    </div>
                    <div className={styles.offerItem}>
                    <Dot style={{backgroundColor: '#3D27C5'}}/>
                        <h4>Kolorowanki </h4>
                    </div>
                    {/*<div className={'offer-item'}>*/}
                    {/*<Dot style={{backgroundColor: '#0C2C80'}}/>*/}
                    {/*    <h4>Bajki</h4>*/}
                    {/*</div>*/}
                    {/*<div className={'offer-item'}>*/}
                    {/*<Dot style={{backgroundColor: '#A4ADFE'}}/>*/}
                    {/*    <h4>Bajki</h4>*/}
                    {/*</div>*/}
                    {/*<div className={'offer-item'}>*/}
                    {/*<Dot style={{backgroundColor: '#E0F1FA'}}/>*/}
                    {/*    <h4>Bajki</h4>*/}
                    {/*</div>*/}
                    {/*<div className={'offer-item'}>*/}
                    {/*<Dot style={{backgroundColor: '#4753BC'}}/>*/}
                    {/*    <h4>Bajki</h4>*/}
                    {/*</div>*/}

                </div>
            </div>
        </div>
    )



}
