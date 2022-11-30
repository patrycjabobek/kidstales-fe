import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

import { db, storage } from "../../utils/firebase/firebase.utils";

import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import styles from "./add-material.module.scss";
import { Line } from "../../styledHelpers/Components";

import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddMaterial() {
  const { currentUser } = useContext(UserContext);
  const [data, setData] = useState({});
  const [file, setFile] = useState("");
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState("");
  const [per, setPer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

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
          console.log("error", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
          console.log("dodano do storage", name);
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setData({ ...data, [name]: value });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // console.log("data: ", data);
  const addMaterial = async (ev) => {
    console.log("klik");
    ev.preventDefault();

    try {
      const res = await addDoc(collection(db, "materials"), {
        ...data,
        author: currentUser.displayName,
        authorId: currentUser.uid,
        createdAt: new Date().toLocaleDateString(),
      });
      console.log(res);
      console.log("dodano do bazy");
      setOpen(true);
    } catch (er) {
      console.log(er);
    }
    // navigate(-1);
  };

  return (
    <div className={styles.addMaterialContainer}>
      <div className={styles.headerContainer}>
        <h3 className={styles.headerContainerTitle}>Dodaj utwór</h3>
        <p className={styles.headerContainerInfo}>
          Prześlij swoje materiały, wprowadź tytuł oraz opis, wstaw miniaturę ,
          wyceń i kliknij DODAJ{" "}
        </p>
        <Line />
      </div>
      <div>
        <div className={styles.formContainer}>
          <form onSubmit={addMaterial} className={styles.form}>
            <div className={styles.actionContainer}>
              {/*<button onClick={() => navigate(-1)} className={`${styles.mainBtn} ${styles.backBtn}`}>Powrót</button>*/}
              {/*<button  type="submit" className={`${styles.mainBtn} ${styles.addBtn}`}>Dodaj</button>*/}
              <Button
                variant="outlined"
                sx={{
                  "&:hover": {
                    textDecoration: "none",
                    backgroundColor: "rgba(162,170,186,0.2)",
                    border: "1px solid #a2aaba",
                  },
                  padding: "7px 20px 4px 20px",
                  background: "#fff",
                  color: "#a2aaba",
                  border: "1px solid #a2aaba",
                  fontFamily: "Overpass, sans-serif",
                  letterSpacing: "0.6px",
                  fontSize: "16px",
                  margin: "20px 10px",
                  cursor: "pointer",
                }}
                onClick={() => navigate(-1)}
              >
                POWRÓT
              </Button>

              <Button
                variant="outlined"
                type="submit"
                sx={{
                  border: "none",
                  padding: "7px 20px 4px 20px",
                  background: "#FE9549",
                  color: "#fff",
                  fontFamily: "Overpass, sans-serif",
                  letterSpacing: "0.6px",
                  fontSize: "16px",
                  margin: "20px 10px",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "none",
                    backgroundColor: "rgb(254,149,73)",
                    border: "1px solid #FE9549",
                    opacity: "0.8",
                  },
                }}
              >
                DODAJ
              </Button>
            </div>
            <div className={styles.col1}>
              <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.labelForm}>
                  Tytuł
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.labelForm}>
                  Opis
                </label>
                <textarea
                  cols={5}
                  rows={12}
                  id="description"
                  name="description"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.col2}>
              <div className={styles.formGroup}>
                <label htmlFor="price" className={styles.labelForm}>
                  Cena
                </label>
                <input
                  type="number"
                  min="0.00"
                  max="10000.00"
                  step="0.01"
                  id="price"
                  name="price"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="category" className={styles.labelForm}>
                  Kategoria
                </label>
                <select id="category" name="category" onChange={handleChange}>
                  <option value="" disabled>
                    Wybierz kategorię...
                  </option>
                  <option value="stories">Opowiadania</option>
                  <option value="cartoons">Bajki</option>
                  <option value="songs">Piosenki</option>
                  <option value="other">Inne</option>
                </select>
              </div>
            </div>
            <div className={styles.col3}>
              <div className={styles.formGroup}>
                <label htmlFor="file" className={styles.labelForm}>
                  Materiał
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className={styles.inputMaterial}
                />
              </div>
              {/*<div className={styles.formGroup}>*/}
              {/*    <label htmlFor="miniature" className={styles.labelForm}>Miniatura</label>*/}
              {/*    <input type="file"*/}
              {/*           id="miniature"*/}
              {/*           onChange={(e) => setMiniature(e.target.files[0])}*/}
              {/*           className={styles.inputMaterial}/>*/}
              {/*</div>*/}
            </div>
          </form>
        </div>
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Dodano utwór!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
