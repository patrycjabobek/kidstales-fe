import React, {useContext, useEffect, useState} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {UserContext} from "../../contexts/UserContext";

import {db, storage} from "../../utils/firebase/firebase.utils";

import {collection, addDoc, setDoc, doc} from "firebase/firestore";
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import './add-material.styles.css';

export default function AddMaterial() {
    const { currentUser } = useContext(UserContext);
    const [data, setData] = useState({});
    const [file, setFile] = useState("");
    const [category, setCategory] = useState("");
    const [per, setPer] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;

            console.log(name);
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setPer(progress);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, img: downloadURL }));
                    });
                }
            );
        };
        file && uploadFile();
    }, [file]);

    const handleChange = (ev) => {
        const { name,value } = ev.target;
        setData({...data, [name]: value});

    }

    console.log("data: ", data);
    const addMaterial = async (event) => {
        event.preventDefault();

        try {
            const res = await addDoc(collection(db, 'materials'), {
                ...data,
                author: currentUser.displayName,
                authorId: currentUser.uid,
                createdAt: new Date().toLocaleDateString()
            });
            console.log(res)

        } catch (er) {
            console.log(er)
        }
        navigate(-1);
    }


    return (
        <div className="add-material-container">
            <div>
                <h3>Dodaj utwór</h3>
                <p>Prześlij swoje materiały, wprowadź tytuł oraz opis, wstaw miniaturę , wyceń i kliknij DODAJ </p>
            </div>
            <div>
                <div>
                    <button onClick={() => navigate(-1)} className="mainBtn">WRÓĆ</button>
                </div>
                <div>
                    <form onSubmit={addMaterial}>
                        <div>
                            <div className="form-group">
                                <label htmlFor="title">Tytuł</label>
                                <input type="text"
                                       id="title"
                                       name="title"
                                       onChange={handleChange}
                                        required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Opis</label>
                                <input type="text"
                                       id="description"
                                       name="description"
                                       onChange={handleChange}
                                        required/>
                            </div>
                        </div>
                        <div>
                            <div className="form-group">
                                <label htmlFor="price">Cena</label>
                                <input type="number"
                                       min="0.00"
                                       max="10000.00"
                                       step="0.01"
                                       id="price"
                                       name="price"
                                       onChange={handleChange}
                                       required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Kategoria</label>
                                <select id="category"
                                        name="category"
                                        onChange={handleChange}>
                                    <option value="" disabled>Wybierz kategorię...</option>
                                    <option value="stories">Opowiadania</option>
                                    <option value="cartoons">Bajki</option>
                                    <option value="songs">Piosenki</option>
                                    <option value="other">Inne</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <input type="file"
                                   id="file"
                                   onChange={(e) => setFile(e.target.files[0])}
                                   className="input-material"/>
                        </div>
                    <button disabled={per !== null && per< 100} type="submit" className="mainBtn">DODAJ</button>
                    </form>
                </div>
            </div>
        </div>

    )
}