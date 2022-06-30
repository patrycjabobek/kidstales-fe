import React, { useContext} from 'react';
import Card from "../MainPage/Card";
import {CategoriesContext} from "../../contexts/CategoriesContext";


export default function CategoriesPreview(props) {
    const { categoriesMap } = useContext(CategoriesContext);
    const identity = props.identity;

    if (identity === "parent") {
        return (
            <div className={'card-container'}>

            <Card title={'POCZYTAJ MI MAMO!'}
                      bgColor={'#FE9549'}
                      boxShadow={'0 5px 50px rgba(254, 149, 73, 0.6)'}
                      url={"/stories"}/>
                <Card title={'WŁĄCZ MI BAJKĘ TATO!'}
                      bgColor={'#6684D3'}
                      boxShadow={'0 5px 50px rgba(102, 132, 211, 0.6)'}
                      url={"/cartoons"}/>
                <Card title={'POŚPIEWAJMY RAZEM!'}
                      bgColor={'#CDB534'}
                      boxShadow={'0 5px 50px rgba(205, 181, 52, 0.6)'}
                      url={"/songs"}/>
            </div>
        )
    }
    return (
        <div className={'card-container'}>
            <Card
                title={'DODAJ UTWÓR'}
                bgColor={'#B7E073'}
                boxShadow={'0 5px 50px rgba(183, 224, 115, 0.6)'}
                url={"/add"}/>
            <Card title={'MÓJ PROFIL'}
                  bgColor={'#42498C'}
                  boxShadow={'0 5px 50px rgba(66, 73, 140, 0.6)'}
                  url={"/author"}/>
            <Card title={'MOJE STATYSTYKI'}
                  bgColor={'#64CF76'}
                  boxShadow={'0 5px 50px rgba(100, 207, 118, 0.6)'}
                  url={"/statistics"}/>
        </div>
    )
}