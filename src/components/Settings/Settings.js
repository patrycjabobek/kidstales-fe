import React, {useContext, useEffect, useState} from 'react';
import Popup from 'reactjs-popup';
import {
    db,
    signOutUser,
    deleteUserAccount,
    updateUserEmail,
    updateUserPassword
} from "../../utils/firebase/firebase.utils";
import {Link, useNavigate} from "react-router-dom";
import {UserContext} from "../../contexts/UserContext";
import {doc, getDoc} from "firebase/firestore";

import './settings.styles.css';


const defaultFormFields = {
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    bankAccountNumber: '',
    phoneNumber: '',
    confirmPhoneNumber: ''
}


export default function Settings() {
    const  { currentUser } = useContext(UserContext);
    const [identity, setIdentity] = useState("");
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, confirmEmail, password, confirmPassword, bankAccountNumber, phoneNumber, confirmPhoneNumber} = formFields;
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleChange = (ev) => {
        const { name,value } = ev.target;
        setFormFields({...formFields, [name]: value});
    }


    useEffect(() => {
        const getUserData = async () => {

            try {
                const usersRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(usersRef);

                const data = docSnap.exists() ? docSnap.data() : null

                setIdentity(data.identity);

            } catch (e) {
                console.log(e)
            }
        }
        getUserData();
    }, [currentUser])



    function handleEmailChange(e) {
        e.preventDefault();

        if (email !== confirmEmail) {
            return setError('Emaile nie pasują do siebie');
        }
        try {
            setError('');
            updateUserEmail(currentUser, email).then(() => {
                console.log("Email updated successufully!")
            }).catch((e) => {
                console.log(e)
            });
        } catch (e) {
            console.log(e)
        }
    }

     function handlePasswordChange(e) {
         e.preventDefault();

         if (password !== confirmPassword) {
             return setError('Hasła nie pasują do siebie');
         } else if (password.length < 6) {
             return setError("Hasło powinno mieć co najmniej 6 znaków");
         }

         try {
             setError('');
             updateUserPassword(currentUser, password).then(() => {
                 console.log("Password updated successufully!")
             }).catch((e) => {
                 console.log(e)
             });
         } catch (e) {
             console.log(e);
         }
    }

     function handleAccountDeletion(e) {
        e.preventDefault();

         deleteUserAccount(currentUser);
         navigate("/login");
     }
    //
    //  function handleIssue() {
    // }

    async function handleSignOut() {
        await signOutUser();
        navigate('/login');
    }

    function handleNavigation(path) {
        navigate(path);
    }

    function handleBankAccountNumberChange(e) {
        e.preventDefault();

    }

    return (
        <>
            <div className="header-container">
                <h3 className="header">Ustawienia</h3>
                <div className="line"/>
            </div>
            <div className="settings-container">
                <div className="account-settings">
                    <h3>KONTO</h3>
                    <div className="grid">
                        <Popup trigger={<button>E-mail</button>} >
                            <div>
                                <div className="form-group">
                                    <label htmlFor="email"
                                        style={{color: "#5961A5"}}>E-mail</label>
                                    <input type="email"
                                           name="email"
                                           id="email"
                                           onChange={handleChange}
                                           value={email}
                                           required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmEmail" style={{color: "#5961A5"}}>Powtórz e-mail</label>
                                    <input type="email"
                                           name="confirmEmail"
                                           id="confirmEmail"
                                           onChange={handleChange}
                                           value={confirmEmail}
                                           required/>
                                </div>
                                <p>Na podany adres e-mail zostanie przesłane potwierdznie zmiany adresu  </p>
                                <button onClick={handleEmailChange} className="popup-button">Ustaw nowy e-mail</button></div>
                        </Popup>
                        <Popup trigger={<button>Hasło</button>} >
                            <div>
                                <div className="form-group">
                                    <label htmlFor="password" style={{color: "#5961A5"}}>Hasło</label>
                                    <input type="password"
                                           name="password"
                                           id="password"
                                           onChange={handleChange}
                                           value={password}
                                           required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword" style={{color: "#5961A5"}}>Powtórz hasło</label>
                                    <input type="password"
                                           name="confirmPassword"
                                           id="confirmPassword"
                                           onChange={handleChange}
                                           value={confirmPassword}
                                           required/>
                                </div>
                                <p>Użyj hasła, który ma przynajmniej 8 znaków, jeden znak specjalny i jedną cyfrę.</p>
                                <button onClick={handlePasswordChange} className="popup-button">Ustaw nowe hasło</button>
                            </div>
                        </Popup>
                        {
                            identity === "author" &&
                            <Popup trigger={<button>Rachunek bankowy do rozliczeń</button>} >
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="bankAccountNumber" style={{color: "#5961A5"}}>Numer rachunku</label>
                                        <input type="number"
                                               name="bankAccountNumber"
                                               id="bankAccountNumber"
                                               onChange={handleChange}
                                               value={bankAccountNumber}
                                               required/>
                                    </div>
                                    <p>Na podany numer rachunku będziesz mógł sie rozliczać ze swojej twórczości</p>
                                    <button onClick={handleBankAccountNumberChange} className="popup-button">Ustaw numer rachunku</button>
                                </div>
                            </Popup>
                        }
                        <div className="line2"/>
                        <Popup trigger={<button>Usuń konto</button>} >
                            <div>
                                <h3>Usuń moje konto</h3>
                                <p>Twoje konto zostanie permanentnie usunięte. Jesteś tego pewien?</p>
                                <button onClick={handleAccountDeletion} className="popup-button">Tak, usuń moje konto</button>
                            </div>
                        </Popup>
                    </div>
                </div>
                <div className="support-settings">
                    <h3>WSPARCIE</h3>
                    <button onClick={() => {navigate("/contact")}}>Zgłoś problem</button>
                </div>
                <div className="application-settings">
                    <h3>O APLIKACJI</h3>
                    <div className="grid">
                        <Link to='/privacy-policy'>Polityka prywatności</Link>
                        <Link to='/terms'>Warunki świadczenia usług</Link>
                    </div>
                </div>
                <div className="login-settings">
                    <h3>LOGIN</h3>
                    <button onClick={handleSignOut}>Wyloguj się</button>
                </div>
            </div>
        </>

    )
}