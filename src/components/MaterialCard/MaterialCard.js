import React, {Fragment, useContext} from "react";
import {useLocation, useParams} from "react-router-dom";
import {MaterialsContext} from "../../contexts/MaterialsContext";

import './materialCard.css'


export function MaterialCard(props) {
    const location = useLocation()
    const { materials } = useContext(MaterialsContext);
    // console.log(materials)
    console.log(materials[0])
    let {id} = useParams();

    const material = materials[id-1];

    console.log(id)
    console.log(material)
    const {title, author, description, price, imgUrl} = material;

    return (
        <Fragment key={id}>
            <div className="material-card-container ">
                <div className="img-container gr1">
                    <img src={imgUrl} alt={`${title}`}/>
                </div>

                    <div className="info gr2">
                        <div className="info-details">
                            <h3>{title}</h3>
                            <h4>{author}</h4>
                        </div>
                        <div className="mark">
                            ocena
                        </div>
                    </div>
                    <div className="info gr3">
                        <h2 className="price">{price} zł</h2>
                        <div className="button-box">
                            <button>ZOBACZ</button>
                            <button>KUP</button>
                        </div>
                    </div>

                <div className="gr4 description-box">
                    <p>{description}</p>
                </div>
            </div>
        </Fragment>
    )
}