import React, {  useState, useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom';

import { MainTitle, Wrapper} from '../../styledHelpers/Components'
import OvalButton from "../Buttons/OvalButton";

import styles from './login.module.scss';

import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

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
        navigate("/")
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('')
            setLoading(true)
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
            navigate('/')
        } catch (er){
            if (er.code === "auth/wrong-password"){
                setError('Błędne hasło')
            } else if (er.code === "auth/user-not-found"){
                setError('Nie ma takiego użytkownika');
            } else {
                setError('Błąd logowania')
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
            <div className={`${styles.section1} ${styles.loginInfo}`}>
                <h3>Dołacz do nas za darmo!</h3>
            </div>
            <div className={styles.section2} >
                <MainTitle>Stwórz swój profil</MainTitle>

                <div className={styles.signingSection}>
                    <div className={styles.thirdParty}>
                        <button  onClick={logGoogleUser} className={styles.googleBtn}>
                            Zaloguj się przez Google
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
                    <div className={styles.hrLabel}>
                        <span className={styles.label}>lub</span>
                    </div>
                    <div className={styles.loginForm}>
                        {error && <div className={`${styles.alert}  ${styles.alertDanger}`}>
                            <p>{error}</p>
                        </div>}
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                       id="email"
                                       name="email"
                                       onChange={handleChange}
                                       value={email} required/>
                            </div>
                            <div className={styles.formGroup} >
                                <label htmlFor="password">Hasło</label>
                                <input type="password"
                                       id="password"
                                       name="password"
                                       onChange={handleChange}
                                       value={password} required/>
                            </div>

                            <button disabled={loading}
                                    type="submit"
                                    className={styles.submitBtn}
                                        >Zaloguj się</button>
                        </form>
                        <div className={styles.otherOptions}>
                            <div className={styles.rememberMeField}>
                                <input type="checkbox" defaultChecked={true}/>
                                Zapamiętaj mnie
                            </div>
                            <Link to={'/password-reset'} className={styles.forgotPasswordField} href="">Zapomniałem hasła</Link>
                        </div>
                    </div>
                </div>

            </div>

        </Wrapper>
    )
}
