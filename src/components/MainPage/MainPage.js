import React from 'react'
import Card from "./Card";
import './mainPage.css';
import OvalButton from "../Buttons/OvalButton";
import parentsReadingImage from '../../assets/images/parents-reading-book.png';
import {Dot, MainTitle} from '../../styledHelpers/Components'
import {Link} from "react-router-dom";

export default function MainPage(props) {

    // const cards = [props.cards];

    if (props.isLoggedIn && props.isParent) {
        return (
            <div className={'mainPage-container-logged'}>
                <MainTitle >Witaj w Strefie Dziecka</MainTitle>
                <p className={'description'}>W tej strefie będziesz mógł zapewnić Twoim pociechom bezpieczną rozrywkę poprzez dostęp do najpiękniejszych utworów dedykowanych najmłodszym</p>
                <div className={'card-container'}>
                   <Card title={'POCZYTAJ MI MAMO!'} bgColor={'#FE9549'} boxShadow={'0 5px 50px rgba(254, 149, 73, 0.6)'} url={"/stories"}/>
                    <Card title={'WŁĄCZ MI BAJKĘ TATO!'} bgColor={'#6684D3'} boxShadow={'0 5px 50px rgba(102, 132, 211, 0.6)'} url={"/cartoons"}/>
                    <Card title={'POŚPIEWAJMY RAZEM!'} bgColor={'#CDB534'} boxShadow={'0 5px 50px rgba(205, 181, 52, 0.6)'} url={"/songs"}/>
                </div>
            </div>
        )
    } else if (props.isLoggedIn && !props.isParent) {
        return (
            <div className={'mainPage-container-logged'}>
                <MainTitle >Witaj w Strefie Twórcy</MainTitle>
                <p className={'description'}>W tej strefie będziesz mógł udostępniać innym użytkownikom swoją twórczość, śledzić statystyki oraz spersonalizować Twój profil</p>
                <div className={'card-container'}>
                    <Card title={'DODAJ UTWÓR'} bgColor={'#B7E073'} boxShadow={'0 5px 50px rgba(183, 224, 115, 0.6)'} url={"/add"}/>
                    <Card title={'MÓJ PROFIL'} bgColor={'#42498C'} boxShadow={'0 5px 50px rgba(66, 73, 140, 0.6)'} url={"/account"}/>
                    <Card title={'MOJE STATYSTYKI'} bgColor={'#64CF76'} boxShadow={'0 5px 50px rgba(100, 207, 118, 0.6)'} url={"/statistics"}/>
                </div>
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
