import React, {useContext, useState} from 'react';
import {UserContext} from "../../contexts/UserContext";
import {db} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    identity: ''
}


export default function Identity() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { currentUser } = useContext(UserContext);
    const {identity} = formFields;
    const [userDetails, setUserDetails] = useState('')


    console.log()
    function handleIdentityOption() {
        const data = getData();
        db.collection('users').doc(currentUser.uid).update({identity: identity});
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
                       onSubmit={handleIdentityOption}/>
                <label htmlFor="author">Twórcą</label>
                <input type="radio"
                       value="author"
                       id="author"
                       name="identity"
                       onChange={handleChange}
                       onSubmit={handleIdentityOption}/>
            </div>
        </>


    )
}