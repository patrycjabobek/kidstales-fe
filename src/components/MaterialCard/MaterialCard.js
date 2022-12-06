import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import styles from "./material-card.module.scss";

import { doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../../utils/firebase/firebase.utils";

import Button from "@mui/material/Button";

export function MaterialCard() {
  const [material, setMaterial] = useState({});
  const price = material.price;
  const [decimalPrice, setDecimalPrice] = useState(price);
  const [url, setUrl] = useState("");
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setDecimalPrice((price) => {
      return (Math.round(price * 100) / 100).toFixed(2);
    });

    const getDocument = async () => {
      try {
        const docRef = doc(db, "materials", id);
        console.log(docRef);
        await getDoc(docRef).then((doc) => {
          console.log(doc.data(), doc.id);
          setMaterial(doc.data());
        });
      } catch (e) {
        console.log(e);
      }
    };
    getDocument();
  }, []);

  // console.log(material)
  // const saveMaterialForUser = async (e) => {
  //     e.preventDefault();
  //
  //     try {
  //         const docRef = doc(db, "materials", id);
  //         await saveMaterial(docRef);
  //     } catch (e) {
  //
  //     }
  //     // saveMaterial(material);
  //     console.log('SAVED')
  //     // console.log(savedMaterials)
  // }

  console.log(material);
  const viewMaterial = () => {
    const storage = getStorage();
    getDownloadURL(ref(storage, material.img))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        console.log(url);
        window.open(url, "_blank");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment key={id}>
      <div className={styles.materialCardContainer}>
        <div className={styles.gr1}>
          {/*<button onClick={() => navigate(-1)} className={`${styles.mainBtn} ${styles.backBtn}`}>Powrót</button>*/}
          {/*<button  type="submit" className={`${styles.mainBtn} ${styles.addBtn}`}>Dodaj</button>*/}
          <Button
            variant="contained"
            sx={{
              "&:hover": {
                textDecoration: "none",
                backgroundColor: "rgb(254,149,73)",
                opacity: "0.8",
              },
              padding: "7px 20px 4px 20px",
              background: "#FE9549",
              color: "#fff",
              fontFamily: "Overpass, sans-serif",
              letterSpacing: "0.6px",
              fontSize: "16px",
              margin: "0 0px 30px 0px",
              cursor: "pointer",
            }}
            onClick={() => navigate(-1)}
          >
            POWRÓT
          </Button>
        </div>
        <div className={`${styles.imgContainer} ${styles.gr2}`}>
          <img src={material.img} alt={`${material.title}`} />
        </div>

        <div className={`${styles.info} ${styles.gr3}`}>
          <div className={styles.infoDetails}>
            <h3>{material.title}</h3>
            <h4>{material.author}</h4>
          </div>
          {/*<div className="mark">*/}
          {/*    ocena*/}
          {/*</div>*/}
        </div>
        <div className={`${styles.info} ${styles.gr4}`}>
          <h2 className={styles.price}>{`${price} zł`}</h2>
          <div className={styles.buttonBox}>
            {/*<button>ZOBACZ</button>*/}
            <button onClick={viewMaterial}>ZOBACZ</button>
          </div>
        </div>

        <div className={`${styles.gr5} ${styles.descriptionBox}`}>
          <p>{material.description}</p>
        </div>
      </div>
    </Fragment>
  );
}
