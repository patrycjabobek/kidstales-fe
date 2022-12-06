import React, { useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import {
  db,
  signOutUser,
  deleteUserAccount,
  updateUserEmail,
  updateUserPassword,
} from "../../utils/firebase/firebase.utils";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { doc, getDoc } from "firebase/firestore";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import styles from "./settings.module.scss";

import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defaultFormFields = {
  email: "",
  confirmEmail: "",
  emailPassword: "",
  oldPassword: "",
  password: "",
  confirmPassword: "",
  bankAccountNumber: "",
  deleteAccPassword: "",
  phoneNumber: "",
  confirmPhoneNumber: "",
};

export default function Settings() {
  const { currentUser } = useContext(UserContext);
  const [identity, setIdentity] = useState("");
  const [open, setOpen] = React.useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {
    email,
    confirmEmail,
    emailPassword,
    oldPassword,
    password,
    confirmPassword,
    bankAccountNumber,
    deleteAccPassword,
    phoneNumber,
    confirmPhoneNumber,
  } = formFields;
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormFields({ ...formFields, [name]: value });
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const usersRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(usersRef);

        const data = docSnap.exists() ? docSnap.data() : null;

        setIdentity(data.identity);
      } catch (e) {
        console.log(e);
      }
    };
    getUserData();
  }, [currentUser]);

  function promptForCredentials(email, password) {
    return EmailAuthProvider.credential(email, password);
  }

  function handleEmailChange(e) {
    e.preventDefault();

    if (email !== confirmEmail) {
      return setError("Emaile nie pasują do siebie");
    }

    const credential = promptForCredentials(currentUser.email, emailPassword);

    reauthenticateWithCredential(currentUser, credential)
      .then(() => {
        try {
          setError("");
          updateUserEmail(currentUser, email)
            .then(() => {
              console.log("Email updated successufully!");
              setOpen(true);
            })
            .catch((e) => {
              console.log("err", e);
            });
        } catch (e) {
          console.log(e);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handlePasswordChange(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Hasła nie pasują do siebie");
    } else if (password.length < 6) {
      return setError("Hasło powinno mieć co najmniej 6 znaków");
    }
    const credential = promptForCredentials(currentUser.email, oldPassword);

    reauthenticateWithCredential(currentUser, credential)
      .then(() => {
        try {
          setError("");
          updateUserPassword(currentUser, password)
            .then(() => {
              console.log("Password updated successufully!");
              setOpen(true);
            })
            .catch((e) => {
              console.log(e);
            });
        } catch (e) {
          console.log(e);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAccountDeletion(e) {
    e.preventDefault();

    const credential = promptForCredentials(
      currentUser.email,
      deleteAccPassword
    );

    reauthenticateWithCredential(currentUser, credential)
      .then(() => {
        try {
          deleteUserAccount(currentUser);
          navigate("/login");
        } catch (e) {
          console.log(e);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //
  //  function handleIssue() {
  // }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  async function handleSignOut() {
    await signOutUser();
    navigate("/login");
  }

  function handleNavigation(path) {
    navigate(path);
  }

  function handleBankAccountNumberChange(e) {
    e.preventDefault();

    try {
      setOpen(true);
    } catch {
      console.log(e);
    }
  }

  return (
    <>
      <div className={styles.headerContainer}>
        <h3 className={styles.header}>Ustawienia</h3>
        <div className={styles.line} />
      </div>
      <div className={styles.settingsContainer}>
        <div className={styles.accountSettings}>
          <h3>KONTO</h3>
          <div className={styles.grid}>
            <Popup trigger={<button>E-mail</button>}>
              <div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" style={{ color: "#5961A5" }}>
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={email}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="confirmEmail" style={{ color: "#5961A5" }}>
                    Powtórz e-mail
                  </label>
                  <input
                    type="email"
                    name="confirmEmail"
                    id="confirmEmail"
                    onChange={handleChange}
                    value={confirmEmail}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="emailPassword" style={{ color: "#5961A5" }}>
                    Hasło
                  </label>
                  <input
                    type="password"
                    name="emailPassword"
                    id="emailPassword"
                    onChange={handleChange}
                    value={emailPassword}
                    required
                  />
                </div>
                <p>
                  Na podany adres e-mail zostanie przesłane potwierdznie zmiany
                  adresu
                </p>
                <button onClick={handleEmailChange} className="popup-button">
                  Ustaw nowy e-mail
                </button>
              </div>
            </Popup>
            <Popup trigger={<button>Hasło</button>}>
              <div>
                <div className={styles.formGroup}>
                  <label htmlFor="oldPassword" style={{ color: "#5961A5" }}>
                    Stare Hasło
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    onChange={handleChange}
                    value={oldPassword}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="password" style={{ color: "#5961A5" }}>
                    Nowe Hasło
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={password}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword" style={{ color: "#5961A5" }}>
                    Powtórz nowe hasło
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={handleChange}
                    value={confirmPassword}
                    required
                  />
                </div>
                <p>
                  Użyj hasła, który ma przynajmniej 8 znaków, jeden znak
                  specjalny i jedną cyfrę.
                </p>
                <button onClick={handlePasswordChange} className="popup-button">
                  Ustaw nowe hasło
                </button>
              </div>
            </Popup>
            {identity === "author" && (
              <Popup trigger={<button>Rachunek bankowy do rozliczeń</button>}>
                <div>
                  <div className={styles.formGroup}>
                    <label
                      htmlFor="bankAccountNumber"
                      style={{ color: "#5961A5" }}
                    >
                      Numer rachunku
                    </label>
                    <input
                      type="number"
                      name="bankAccountNumber"
                      id="bankAccountNumber"
                      onChange={handleChange}
                      value={bankAccountNumber}
                      required
                    />
                  </div>
                  <p>
                    Na podany numer rachunku będziesz mógł sie rozliczać ze
                    swojej twórczości
                  </p>
                  <button
                    onClick={handleBankAccountNumberChange}
                    className="popup-button"
                  >
                    Ustaw numer rachunku
                  </button>
                </div>
              </Popup>
            )}
            <div className={styles.line2} />
            <Popup trigger={<button>Usuń konto</button>}>
              <div>
                <h3>Usuń moje konto</h3>
                <div className={styles.formGroup}>
                  <label
                    htmlFor="deleteAccPassword"
                    style={{ color: "#5961A5" }}
                  >
                    Hasło
                  </label>
                  <input
                    type="password"
                    name="deleteAccPassword"
                    id="deleteAccPassword"
                    onChange={handleChange}
                    value={deleteAccPassword}
                    required
                  />
                </div>
                <p>
                  Twoje konto zostanie permanentnie usunięte. Jesteś tego
                  pewien?
                </p>
                <button
                  onClick={handleAccountDeletion}
                  className="popup-button"
                >
                  Tak, usuń moje konto
                </button>
              </div>
            </Popup>
          </div>
        </div>
        <div className={styles.supportSettings}>
          <h3>WSPARCIE</h3>
          <button
            onClick={() => {
              navigate("/contact");
            }}
          >
            Zgłoś problem
          </button>
        </div>
        <div className={styles.applicationSettings}>
          <h3>O APLIKACJI</h3>
          <div className={styles.grid}>
            <Link to="/privacy-policy">Polityka prywatności</Link>
            <Link to="/terms">Warunki świadczenia usług</Link>
          </div>
        </div>
        <div className={styles.loginSettings}>
          <h3>LOGOWANIE</h3>
          <button onClick={handleSignOut}>Wyloguj się</button>
        </div>
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{
              width: "100%",
              "& .MuiSnackbarContent-root": { backgroundColor: "#3eaf3ea3" },
            }}
          >
            Potwierdzenie zmiany maila zostało wysłane!
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
