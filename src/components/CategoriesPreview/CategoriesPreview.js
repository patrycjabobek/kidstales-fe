import React, {Fragment, useContext} from 'react';
import Card from "../MainPage/Card";
import {CategoriesContext} from "../../contexts/CategoriesContext";


export default function CategoriesPreview() {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <Fragment>
            <Card title={'POCZYTAJ MI MAMO!'}
                  bgColor={'#FE9549'}
                  boxShadow={'0 5px 50px rgba(254, 149, 73, 0.6)'}
                  url={"/stories"}/>
            <Card title={'WŁĄCZ MI BAJKĘ TATO!'}
                  bgColor={'#6684D3'} boxShadow={'0 5px 50px rgba(102, 132, 211, 0.6)'}
                  url={"/cartoons"}/>
            <Card title={'POŚPIEWAJMY RAZEM!'}
                  bgColor={'#CDB534'}
                  boxShadow={'0 5px 50px rgba(205, 181, 52, 0.6)'}
                  url={"/songs"}/>
        </Fragment>
    )
}