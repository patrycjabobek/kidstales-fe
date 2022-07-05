import React, {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import './material-card.styles.css'
import {db} from "../../utils/firebase/firebase.utils";


export function MaterialCard() {
    const [material, setMaterial] = useState({});
    const location = useLocation();
    const { id } = useParams();

    useEffect(() => {
        const getDocument = async () => {
            try {
                const docRef = doc(db, "materials", id);
                console.log(docRef);
                await getDoc(docRef).then((doc) => {
                    console.log(doc.data(), doc.id);
                    setMaterial(doc.data());
                });


            } catch  (e) {
                console.log(e)
            }
        }
        getDocument();
    }, [])

    // console.log(material)
    const saveMaterialForUser = () => {

        // saveMaterial(material);
        console.log('SAVED')
        // console.log(savedMaterials)
    }


    return (
        <Fragment key={id}>
            <div className="material-card-container ">
                <div className="img-container gr1">
                    <img src={material.img} alt={`${material.title}`}/>
                </div>

                    <div className="info gr2">
                        <div className="info-details">
                            <h3>{material.title}</h3>
                            <h4>{material.author}</h4>
                        </div>
                        <div className="mark">
                            ocena
                        </div>
                    </div>
                    <div className="info gr3">
                        <h2 className="price">{material.price} zł</h2>
                        <div className="button-box">
                            <button>ZOBACZ</button>
                            <button onClick={saveMaterialForUser}>KUP</button>
                        </div>
                    </div>

                <div className="gr4 description-box">
                    <p>{material.description}</p>
                </div>
            </div>
        </Fragment>
    )
}