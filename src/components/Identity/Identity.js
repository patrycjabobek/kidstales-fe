import React, {useContext, useState} from 'react';
import {UserContext} from "../../contexts/UserContext";
import {db} from "../../utils/firebase/firebase.utils";
import {useNavigate} from "react-router-dom";
import {doc, updateDoc} from "firebase/firestore";

const defaultFormFields = {
    identity: ''
}


export default function Identity() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { currentUser } = useContext(UserContext);
    const {identity} = formFields;
    const navigate = useNavigate();

    const handleIdentityOption = async () => {
        const data = getData();
        const userRef = doc(db, 'users', currentUser.uid);
        // await updateDoc(userRef, {
        //     identity
        // })
        // navigate('/');
    }

    const getData = async () => {
        const snapshot = await db.collection('users').doc(currentUser.uid).get();
        const data = snapshot.data();
        console.log(data);
    }
    const handleChange = (ev) => {
        const { name,value } = ev.target;
        setFormFields({...formFields, [name]: value});
    }


    return (
        <>
            <h3>Jestem</h3>
            <div className="form-group radio-group" >
                <label htmlFor="parent">Rodzicem</label>
                <input type="radio"
                       value="parent"
                       id="parent"
                       name="identity"
                       onChange={handleChange}
                       onClick={handleIdentityOption}/>
                <label htmlFor="author">Twórcą</label>
                <input type="radio"
                       value="author"
                       id="author"
                       name="identity"
                       onChange={handleChange}
                       onClick={handleIdentityOption}/>
            </div>
        </>


    )
}