import React from 'react';
import Popup from 'reactjs-popup';
import {signOutUser} from "../../utils/firebase/firebase.utils";
import {Link, useNavigate} from "react-router-dom";


export default function Settings() {
    const navigate = useNavigate();


    function handlePhoneNumberChange() {

    }

    function handleEmailChange() {

    }

     function handlePasswordChange() {

    }

     function handleAccountDeletion() {

    }

     function handleIssue() {

    }

    async function handleLogOut() {
            await signOutUser();
            navigate('/login');
    }

    function handleNavigation(path) {
        navigate(path);
    }

    return (
        <>
            <h3>Ustawienia</h3>
            <div className="account-settings">
                <h3>KONTO</h3>
                <Popup trigger={<button>Numer telefonu</button>} position="right center">
                    <div>
                        <div className="form-group">
                            <label htmlFor="displayName">Numer telefonu</label>
                            <input type="text"
                                   name="displayName"
                                   id="displayName"
                                   required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="displayName">Powtórz numer telefonu</label>
                            <input type="text"
                                   name="displayName"
                                   id="displayName"
                                   required/>
                        </div>
                        <button onClick={handlePhoneNumberChange}>Ustaw nowy numer</button>
                    </div>
                </Popup>
                <Popup trigger={<button>E-mail</button>} position="right center">
                    <div>
                        <div className="form-group">
                        <label htmlFor="displayName">E-mail</label>
                        <input type="text"
                               name="displayName"
                               id="displayName"
                               required/>
                     </div>
                        <div className="form-group">
                            <label htmlFor="displayName">Powtórz e-mail</label>
                            <input type="text"
                                   name="displayName"
                                   id="displayName"
                                   required/>
                        </div>
                        <p>Na podany adres e-mail zostanie przesłane potwierdznie zmiany adresu  </p>
                        <button onClick={handleEmailChange}>Ustaw nowy e-mail</button></div>
                </Popup>
                <Popup trigger={<button>Hasło</button>} position="right center">
                    <div>
                        <div className="form-group">
                            <label htmlFor="displayName">Hasło</label>
                            <input type="text"
                                   name="displayName"
                                   id="displayName"
                                   required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="displayName">Powtórz hasło</label>
                            <input type="text"
                                   name="displayName"
                                   id="displayName"
                                   required/>
                        </div>
                        <p>Użyj hasła, który ma przynajmniej 8 znaków, jeden znak specjalny i jedną cyfrę.</p>
                        <button onClick={handlePasswordChange}>Ustaw nowe hasło</button>
                    </div>
                </Popup>
                <Popup trigger={<button>Usuń konto</button>} position="right center">
                    <div>
                        <h3>Usuń moje konto</h3>
                        <p>Twoje konto zostanie permanentnie usunięte. Jesteś tego pewien?</p>
                        <button onClick={handleAccountDeletion}>Tak, usuń moje konto</button>
                    </div>
                </Popup>
            </div>
            <div className="support-settings">
                <h3>WSPARCIE</h3>
                <button>Zgłoś problem = przekieruj do kontaktu</button>
            </div>
            <div className="application-settings">
                <h3>O APLIKACJI</h3>
                <Link to='/privacy-policy'>Polityka prywatności</Link>
                <Link to='/terms'>Warunki świadczenia usług</Link>
            </div>
            <div className="login-settings">
                <h3>LOGIN</h3>
                <Popup trigger={<button>Wyloguj się</button>} position="right center">
                    <div>Popup content here !!</div>
                </Popup>
            </div>
        </>
    )
}