import React, { useContext} from 'react';
import Card from "../MainPage/Card";
import {CategoriesContext} from "../../contexts/CategoriesContext";

import addImg from '../../assets/categories/add_material_2.svg'
import myProfileImg from '../../assets/categories/my_profile.svg'
import graphImg from '../../assets/categories/graph.svg'
import parentsReadingBook from '../../assets/images/parents-reading-book.png'


import styles from './categories-preview.module.scss'

export default function CategoriesPreview(props) {
    const { categoriesMap } = useContext(CategoriesContext);
    const identity = props.identity;

    if (identity === "parent") {
        return (
            <div className={styles.cardContainer}>

            <Card title={'POCZYTAJ MI MAMO!'}
                      bgColor={'#FE9549'}
                      boxShadow={'0 5px 50px rgba(254, 149, 73, 0.6)'}
                      url={"/stories"}
                      imageUrl={parentsReadingBook}
            />
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
        <div className={styles.cardContainer}>
            <Card
                title={'DODAJ UTWÓR'}
                bgColor={'#B7E073'}
                boxShadow={'0 5px 50px rgba(183, 224, 115, 0.6)'}
                url={"/add"}
                imageUrl={addImg}
            />
            <Card title={'MÓJ PROFIL'}
                  bgColor={'#FE9549'}
                  boxShadow={'0 5px 50px rgba(254, 149, 73, 0.6)'}
                  url={"/author"}
                  imageUrl={myProfileImg}
            />
            <Card title={'MOJE STATYSTYKI'}
                  bgColor={'#64CF76'}
                  boxShadow={'0 5px 50px rgba(100, 207, 118, 0.6)'}
                  url={"/statistics"}
                  imageUrl={graphImg}
            />
        </div>
    )
}