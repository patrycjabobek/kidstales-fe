import React, { useEffect, useState, useContext, useRef } from "react";
// import WaveSurfer from "wavesurfer.js";
// import * as WaveSurferRegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.js";
// import * as WaveSurferTimeLinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";

import { CategoriesContext } from "../../contexts/CategoriesContext";

import styles from "./listing-item.module.scss";
import OvalButton from "../Buttons/OvalButton";
import eyeIcon from "../../assets/icons/visibility_FILL0_wght400_GRAD0_opsz48.svg";
import userIcon from "../../assets/icons/account_circle_FILL1_wght400_GRAD200_opsz48.svg";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";

export default function ListingItem(props) {
  const { id, title, author, authorId, price, createdAt, avatar, img } =
    props.material;
  const { materalsByCat } = useContext(CategoriesContext);
  const [decimalPrice, setDecimalPrice] = useState(price);
  const [userData, setUserData] = useState([]);
  const [allMaterials, setAllMaterials] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [waveformLoader, setWaveformLoader] = useState(false);
  const [regions, setRegions] = useState([]);
  const [isPaused, setIsPaused] = useState(true);
  const websurfer = useRef(null);
  const audioData = useRef(null);

  useEffect(() => {
    setDecimalPrice((price) => {
      return (Math.round(price * 100) / 100).toFixed(2);
    });

    // websurfer.current = WaveSurfer.create({
    //   container: "waveform",
    //   waveColor: "",
    //   progressColor: "",
    //   cursorColor: "",
    //   barWidth: "",
    //   barRadius: "",
    //   cursorwidth: "",
    //   height: "",
    //   barGap: "",
    //   plugins: [
    //     WaveSurferRegionsPlugin.create({ maxLength: 60 }),
    //     WaveSurferTimeLinePlugin.create({ container: "#waveform-timeline" }),
    //   ],
    // });

    // websurfer.current.on("ready", () => {
    //   setWaveformLoader(true);
    // });

    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUserData(list);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    setAllMaterials(props.material);
    getAvatars(userData, props.material);

    createWaveform(img);

    function getAvatars(arr1, arr2) {
      let start = 0;
      let merge = [];
      while (start < arr2.length) {
        if (arr1[start].id === arr2[start].authorId) {
          //pushing the merged objects into array
          merge.push({ ...arr1[start], ...arr2[start] });
        }
        //incrementing start value
        start = start + 1;
      }
      return merge;
    }
  }, []);

  const createWaveform = (file) => {
    // if (regions.length > 0) {
    //   websurfer.current.regions.clearRegions();
    // }
    // setWaveformLoader(false);
    // websurfer.load(file);
  };

  const playPause = () => {
    // if (isPaused) {
    //   setIsPaused(false);
    // } else {
    //   setIsPaused(true);
    // }
    // if (websurfer.current.isPlaying()) {
    //   websurfer.current.pause();
    // } else {
    //   websurfer.current.play();
    // }
  };

  const uploadData = () => {};

  return (
    <tr key={id} className={styles.listingItem}>
      <td className={styles.image}>
        {avatar != null ? (
          <Avatar src={avatar} alt={`${title}`} />
        ) : (
          <Avatar src={userIcon} alt="no avatar" />
        )}
      </td>
      <td className={styles.mark}>Ocena</td>
      <td className={styles.price}>
        {price === "0" ? (
          <OvalButton
            url={""}
            backgroundColor={"#FE9549"}
            color={"#FFF"}
            borderRadius={"5px"}
            padding={"6px 15px"}
            fontSize={"0.875rem"}
            fontWeight={"500"}
            content={"FREE"}
          ></OvalButton>
        ) : (
          <OvalButton
            url={""}
            backgroundColor={"#3D27C5"}
            color={"#FFF"}
            borderRadius={"5px"}
            padding={"6px 15px"}
            fontSize={"0.875rem"}
            fontWeight={"500"}
            content={decimalPrice}
          ></OvalButton>
        )}
      </td>
      <td className={styles.listingItemDetails}>
        <div className={styles.title}>{title}</div>
        <div className={styles.more}>
          <h3>{author}</h3>
          <h3 className={styles.views}>
            <img className={styles.icon} src={eyeIcon} alt="" />
            views
          </h3>
          <h3>{createdAt.toLocaleString()}</h3>
        </div>
      </td>
      <td className={styles.button}>
        <OvalButton
          url={`/listing/${id}`}
          backgroundColor={"#FE9549"}
          color={"#FFF"}
          borderRadius={"20px"}
          padding={"6px 32px"}
          fontSize={"1rem"}
          fontWeight={"500"}
          content={"ZOBACZ"}
        ></OvalButton>
      </td>
    </tr>
  );
}
