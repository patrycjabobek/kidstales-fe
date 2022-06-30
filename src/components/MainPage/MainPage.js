import React, {useContext, useEffect, useState} from 'react'

import Card from "./Card";
import OvalButton from "../Buttons/OvalButton";

import './mainPage.css';
import parentsReadingImage from '../../assets/images/parents-reading-book.png';

import {Dot, MainTitle} from '../../styledHelpers/Components'

import {UserContext} from "../../contexts/UserContext";
import CategoriesPreview from "../CategoriesPreview/CategoriesPreview";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../utils/firebase/firebase.utils";

export default function MainPage(props) {
    const { currentUser } = useContext(UserContext);
    const user = props.user;




    if (currentUser ) {
        return (
            <div className={'mainPage-container-logged'}>
                <MainTitle >Witaj w Strefie Dziecka</MainTitle>
                <p className={'description'}>W tej strefie będziesz mógł zapewnić Twoim pociechom bezpieczną rozrywkę poprzez dostęp do najpiękniejszych utworów dedykowanych najmłodszym</p>
                  <CategoriesPreview identity="parent"/>
            </div>
        )
    } else
        if (currentUser ) {
        return (
            <div className={'mainPage-container-logged'}>
                <MainTitle >Witaj w Strefie Twórcy</MainTitle>
                <p className={'description'}>W tej strefie będziesz mógł udostępniać innym użytkownikom swoją twórczość, śledzić statystyki oraz spersonalizować Twój profil</p>
                    <CategoriesPreview />
            </div>
        )
    }
    return (
        <div className={'mainPage-container'}>
            <div className={'main-section'}>
                <div className={'column1'}>
                    <MainTitle >Bezpieczne Miejsce  <br/> Dla Twojego  <br/> Dziecka</MainTitle>
                    <p className={'description-default'}>Zajrzyj do świata pełnego dziecęcej radości i przygód! <br/> Zapisz się już dziś!</p>
                    <OvalButton url={'/register'}
                                backgroundColor={'#E0F1FA'}
                                color={'#0C2C80'}
                                borderRadius={'20px'}
                                padding={'6px 16px'}
                                fontSize={'1.25rem'}
                                fontWeight={'600'}
                                content={'Dołącz do nas'}
                    ></OvalButton>
                </div>
                <div className={'column2'}><img src={parentsReadingImage} alt=""/></div>
            </div>

            <div className={'offer-container'}>
                <div className={'offer-list'}>
                    <div className={'offer-item'}>
                    <Dot style={{backgroundColor: '#A4ADFE'}}/>
                        <h4>Bajki</h4>
                    </div>
                    <div className={'offer-item'}>
                    <Dot style={{backgroundColor: '#0C2C80'}}/>
                        <h4>Opowiadania</h4>
                    </div>
                    <div className={'offer-item'}>
                    <Dot style={{backgroundColor: '#4753BC'}}/>
                        <h4>Piosenki</h4>
                    </div>
                    <div className={'offer-item'}>
                    <Dot style={{backgroundColor: '#E0F1FA'}}/>
                        <h4>Teksty piosenek</h4>
                    </div>
                    <div className={'offer-item'}>
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
