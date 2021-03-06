import React, { useRef, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import FacebookLogin from 'react-facebook-login';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import './login.css'
import { MainTitle, Wrapper} from '../../styledHelpers/Components'
import OvalButton from "../Buttons/OvalButton";
import {signInWithEmailAndPassword} from "firebase/auth";
// import { auth } from "./firebase-config";
import {auth,
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../utils/Firebase/firebase.utils";

const customGoogleStyle = {
    padding: '10px',
    fontSize: '0.85rem',
    width: '100%',
    margin: '10px 0',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '5px',
    backgroundImage: 'url("../../assets/images/btn_google_light_normal_ios.svg")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left 24px center',
    cursor: 'pointer'
}

const defaultFormFields = {
    email: '',
    password: ''
}

export default function Login() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('')
            setLoading(true)
            const res = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(res);
            resetFormFields();
            // navigate('/dashboard')
        } catch (er){
            if (er.code === "auth/wrong-password"){
                setError('B????dne has??o')
            } else if (er.code === "auth/user-not-found"){
                setError('Nie ma takiego u??ytkownika');
            } else {
                setError('B????d logowania')
            }
        }
        setLoading(false)
    }

    const handleChange = (ev) => {
        const { name, value } = ev.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <Wrapper>
            <div className={'section1 login-info'}>
                <h3>Do??acz do nas za darmo!</h3>
            </div>
            <div className={'section2'}>
                <MainTitle>Stw??rz sw??j profil</MainTitle>
                {error && <div className="alert alert-danger">
                    <p>{error}</p>
                </div>}
                <div className={'signing-section'}>
                    <div className={'thirdParty'}>
                        <button  onClick={logGoogleUser}>
                            Sign In with Google
                        </button>
                        <OvalButton url={'/register'}
                                    content={'Zarejestruj sie przez adres e-mail'}
                                    backgroundColor={'#4753BC'}
                                    color={'#fff'}
                                    borderRadius={'5px'}
                                    padding={'10px'}
                                    width={'100%'}
                                    fontSize={'0.85rem'}
                                    fontWeight={'normal'}/>
                    </div>
                    <div className={'hr-label'}>
                        <span className={'label'}>lub</span>
                    </div>
                    <div className={'loginForm'}>
                        {error && <div className="alert alert-danger">
                            <p>{error}</p>
                        </div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                       id="email"
                                       name="email"
                                       onChange={handleChange}
                                       value={email} required/>
                            </div>
                            <div className="form-group" >
                                <label htmlFor="password">Has??o</label>
                                <input type="password"
                                       id="password"
                                       name="password"
                                       onChange={handleChange}
                                       value={password} required/>
                            </div>

                            <button disabled={loading}
                                    type="submit"
                                    className={'submitBtn'}
                                        >Zaloguj si??</button>
                        </form>
                        <div className={'other-options'}>
                            <div className={'rememberMe-field'}>
                                <input type="checkbox" defaultChecked={true}/>
                                Zapami??taj mnie
                            </div>
                            <Link to={'/password-reset'} className={'forgotPassword-field'} href="">Zapomnia??em has??a</Link>
                        </div>
                    </div>
                </div>

            </div>

        </Wrapper>
    )
}
