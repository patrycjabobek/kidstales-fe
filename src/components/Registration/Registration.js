import React, {  useState } from 'react'
import {Wrapper} from "../../styledHelpers/Components";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import {auth, createAuthUserWithEmailANdPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    identity: ''
}

export default function Registration() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword, identity} = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleChange = (ev) => {
        const { name,value } = ev.target;
        setFormFields({...formFields, [name]: value});
    }

    const [user, setUser] = useState({});
    const { signup } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Hasła nie pasują do siebie');
        } else if (password.length < 6) {
            return setError("Hasło powinno mieć co najmniej 6 znaków")
        }
        try {
            setError('');
            setLoading(true);
            const res = await createAuthUserWithEmailANdPassword(email, password);

            await createUserDocumentFromAuth(user, {displayName, identity});
            console.log(res)
            resetFormFields();
            navigate('/login');
        } catch(e) {
            if (e.code === "auth/email-already-in-use") {
                setError("Ten email jest już zarejestrowany");
            } else if (e.code === "auth/invalid-email") {
                setError("Email niepoprawny");
            } else if (e.code === "auth/operation-not-allowed") {
                setError("Operation not allowed.");
            } else if (e.code === "auth/weak-password") {
                setError("Hasło zbyt słabe");
            }
            console.log(e);
        }
        setLoading(false)
    }

    return (
        <Wrapper className={'registration-form'}>
            <div >
                <h3>Dołącz do nas za darmo!</h3>
                {error && <div className="alert alert-danger">
                    <p>{error}</p>
                </div>}
                <form onSubmit={handleSubmit}>
                    {/*<div className={'personalData-field'}>*/}
                        <div className="form-group">
                            <label htmlFor="displayName">Imię i Nazwisko</label>
                            <input type="text"
                                   name="displayName"
                                   id="displayName"
                                   onChange={handleChange}
                                   value={displayName} required/>
                        </div>
                    {/*</div>*/}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                               id="email"
                               name="email"
                               onChange={handleChange}
                               value={email} required/>
                    </div>
                    <div className="form-group" >
                        <label htmlFor="password">Hasło</label>
                        <input type="password"
                               id="password"
                               name="password"
                               onChange={handleChange}
                               value={password} required/>
                    </div>
                    <div className="form-group" >
                        <label htmlFor="confirmPassword">Powtórz hasło</label>
                        <input type="password"
                               id="confirmPassword"
                               name="confirmPassword"
                               onChange={handleChange}
                               value={confirmPassword} required/>
                    </div>
                    <h5>Jestem</h5>
                    <div className="form-group radio-group" >
                        <input type="radio"
                               id="parent"
                               name="identity"
                               onChange={handleChange}
                               value="parent"
                                />
                        <label htmlFor="parent">Rodzicem/Opiekunem</label>
                        <input type="radio"
                               id="author"
                               name="identity"
                               onChange={handleChange}
                               value='author'/>
                        <label htmlFor="author">Twórcą</label>
                    </div>
                    <button disabled={loading}
                            type="submit"
                            className={'submitBtn'}
                    >Zarejestruj się</button>
                </form>
                <div className={'regulations'}>Rejestrując się, zgadzasz się na <Link to={'/regulamin'}>Regulamin</Link> oraz <Link to={'/privacy-policy'}>Politykę prywatności</Link></div>
            </div>
            <div>

            </div>
        </Wrapper>
    )
}
