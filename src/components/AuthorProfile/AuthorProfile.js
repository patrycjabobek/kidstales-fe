import React, { useContext, useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";
import styles from "./author-profile.module.scss";
import "reactjs-popup/dist/index.css";
import { UserContext } from "../../contexts/UserContext";
import { db } from "../../utils/firebase/firebase.utils";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import ListingItem from "../Listing/ListingItem";
import AuthorMaterialsList from "./AuthorMaterialsList";
import camera from "../../assets/icons/photo_camera_FILL0_wght400_GRAD0_opsz48.svg";
import userIcon from "../../assets/icons/account_circle_FILL1_wght400_GRAD200_opsz48.svg";
import OpinionModal from "../common/OpinionModal/OpinionModal";

// MUI
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import FlagIcon from "@mui/icons-material/Flag";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const StyledPopupEditor = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.5);
  }

  &-content {
    position: relative;
    width: 900px !important;
    height: 600px !important;
    padding: 20px 20px 40px 20px;
    z-index: 999;
    pointer-events: auto;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
  }

  &-arrow {
    width: 0;
  }

  [role="tooltip"].&-content {
    width: 200px;
    box-shadow: rgba(0, 0, 0, 0.16) 0 0 3px;
  }
`;

const StyledPopupReport = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.5);
  }

  &-content {
    position: relative;
    width: 600px !important;
    height: 400px !important;
    padding: 0;
    z-index: 999;
    pointer-events: auto;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
  }

  &-arrow {
    width: 0;
  }

  [role="tooltip"].&-content {
    width: 200px;
    box-shadow: rgba(0, 0, 0, 0.16) 0 0 3px;
  }
`;

const defaultFormFields = {
  imgUrl: "",
  bgUrl: "",
  userDescription: "",
};

export default function AuthorProfile() {
  const { currentUser } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [changeDetails, setChangeDetails] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { imgUrl, bgUrl, userDescription } = formFields;
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const usersRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(usersRef);

        const data = docSnap.exists() ? docSnap.data() : null;

        setUserData(data);
        setAvatar(data.avatar);
        console.log("DANE", data);
        console.log(data.userDescription);
      } catch (e) {
        console.log(e);
      }
    };
    getUserData();
  }, [currentUser]);
  function handleIssueReport() {}

  function cancel() {}

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const userRef = doc(db, "users", currentUser.uid);

      await updateDoc(userRef, {
        imgUrl: imgUrl,
        backgroundImg: bgUrl,
        userDescription: userDescription,
      });
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className={styles.main}>
      <div className={styles.authorContainer}>
        <div className={styles.grayContainer}>
          <button className={styles.saveBtn}>
            <span
              className={`${styles.bookmark} ${styles.materialSymbolsOutlined}`}
            >
              <BookmarkBorderIcon />
            </span>
          </button>
          <div className={styles.imgBox}>
            {avatar != null ? (
              <img src={avatar} />
            ) : (
              <img src={userIcon} className={styles.img} />
            )}
            {/*<img src="" alt="profile image" className="img"/>*/}
          </div>
          <StyledPopupEditor
            className="profile-edit"
            trigger={
              <Button
                sx={{
                  position: "absolute",
                  top: "120px",
                  right: "20px",
                  border: "none",
                  background: "#FE9549",
                  padding: " 5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "rgba(254,149,73,0.5)",
                  },
                }}
                startIcon={<EditIcon />}
              >
                {changeDetails ? "Zapisz" : "Profil"}
              </Button>
            }
          >
            {(close) => (
              <div>
                <div className={styles.profileEditHeader}>
                  <button onClick={close}>X</button>
                  <h3>Edytuj profil</h3>
                  <button
                    onClick={() => {
                      changeDetails && onSubmit();
                      setChangeDetails((prevState) => !prevState);
                    }}
                  >
                    Zapisz
                  </button>
                </div>
                <form action="" className={styles.formEditor}>
                  <div className={styles.imageArea}>
                    <input
                      id="bg-file-upload"
                      type="file"
                      className={styles.backgroundImg}
                      onChange={handleChange}
                      value={bgUrl}
                    />
                    <label
                      className={styles.labelFileUpload}
                      htmlFor="bg-file-upload"
                    >
                      <div className={styles.hiddenContent}>
                        <img src={camera} alt="" />
                        <button className={styles.uploadButton}></button>
                      </div>
                    </label>
                    <div className={styles.circle}>
                      <input
                        type="file"
                        className={styles.avatar}
                        id="avatar-file-upload"
                        onChange={handleChange}
                        value={imgUrl}
                      />
                      <label
                        className={styles.labelAvatarFileUpload}
                        htmlFor="avatar-file-upload"
                      >
                        <div className={styles.hiddenContent}>
                          <img src={camera} alt="" />
                          <button className={styles.uploadButton}></button>
                        </div>
                      </label>
                    </div>
                    <h3>{currentUser && currentUser.displayName}</h3>
                  </div>
                  <div>
                    <textarea
                      rows={15}
                      cols={115}
                      id="description"
                      name="description"
                      className={styles.userDescription}
                      onChange={handleChange}
                      value={userDescription}
                    />
                  </div>
                </form>
              </div>
            )}
          </StyledPopupEditor>
        </div>
        <div className={styles.userName}>
          <h3>{currentUser && userData.displayName}</h3>
        </div>
        <div className={styles.content}>
          <div className={styles.about}>
            <h4>O MNIE</h4>
            <p>{currentUser && userData.userDescription}</p>
          </div>
          <div className={styles.opinions}>
            <OpinionModal value={4.5} />
          </div>
        </div>
      </div>
      <div className={styles.materialsContainer}>
        <h3>TWOJE MATERIAŁY</h3>
        <AuthorMaterialsList />
      </div>
      <div className={styles.reviewsContainer}>
        <h3>OPINIE</h3>
      </div>
      <div className={styles.reportBtn}>
        <StyledPopupReport
          trigger={
            <button className={styles.flag}>
              <FlagIcon />
            </button>
          }
        >
          <div className={styles.reportComponent}>
            <div className={styles.reportHeader}>
              <h3>Zgłoś użytkownika</h3>
            </div>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Pomóż nam zrozumieć problem.Co jest nie tak z profilem tego
                użytkownika?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="hate"
                  control={<Radio />}
                  label="Propagowanie nienawiści"
                />
                <FormControlLabel
                  value="violence"
                  control={<Radio />}
                  label="Przemoc"
                />
                <FormControlLabel
                  value="anti-terms"
                  control={<Radio />}
                  label="Publikowanie materiałów niezgodnych z regulaminem"
                />
                <FormControlLabel
                  value="offensive"
                  control={<Radio />}
                  label="Obraźliwe treści"
                />
              </RadioGroup>
            </FormControl>
            <div>
              <input type="checkbox" id="offensive" name="blocking" />
              <label htmlFor="offensive">Zablokuj użytkownika</label>
            </div>

            <button onClick={cancel}>Anuluj</button>
            <button onClick={handleIssueReport}>Zgłoś</button>
          </div>
        </StyledPopupReport>
      </div>
    </div>
  );
}
