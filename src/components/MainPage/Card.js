import React from 'react'
import './card.css';
import arrow from '../../assets/images/arrow.svg';
import {Link} from 'react-router-dom';

export default function Card(props) {


    return (
        <div className={'card'} style={{boxShadow: props.boxShadow}}>
            <Link to={props.url}>
                <div className={'image-box'}
                     style={{
                         backgroundColor: props.bgColor,
                     }}>
                    <img src={props.imageUrl} alt=""/>
                </div>
                <div>
                    <h2>{props.title}</h2>
                </div>
                <div>
                    <img className={'arrowImg'} src={arrow} alt=""/>
                </div>
            </Link>
        </div>
    )
}
