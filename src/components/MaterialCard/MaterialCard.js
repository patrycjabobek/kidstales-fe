import React, {Fragment, useContext, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import './material-card.styles.css'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {db} from "../../utils/firebase/firebase.utils";
import {CategoriesProvider} from '../../contexts/CategoriesContext';

export function MaterialCard() {
    const [material, setMaterial] = useState({});
    const [url, setUrl] = useState('');
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
    // const saveMaterialForUser = async (e) => {
    //     e.preventDefault();
    //
    //     try {
    //         const docRef = doc(db, "materials", id);
    //         await saveMaterial(docRef);
    //     } catch (e) {
    //
    //     }
    //     // saveMaterial(material);
    //     console.log('SAVED')
    //     // console.log(savedMaterials)
    // }

    console.log(material)
    const viewMaterial = () => {
        const storage = getStorage();
        getDownloadURL(ref(storage, material.img))
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();
                console.log(url)
                window.open(url, "_blank");
            })
            .catch((error) => {
                console.log(error)
            });
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
                        {/*<div className="mark">*/}
                        {/*    ocena*/}
                        {/*</div>*/}
                    </div>
                    <div className="info gr3">
                        <h2 className="price">{material.price} zł</h2>
                        <div className="button-box">
                            {/*<button>ZOBACZ</button>*/}
                            <button onClick={viewMaterial}>ZOBACZ</button>
                        </div>
                    </div>

                <div className="gr4 description-box">
                    <p>{material.description}</p>
                </div>
            </div>
        </Fragment>
    )
}