import React, { useEffect, useState, useContext, useRef } from "react";
import ReactDOM from "react-dom";
import WaveSurfer from "wavesurfer.js";
import * as WaveSurferRegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.js";
import * as WaveSurferTimeLinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";

import { CategoriesContext } from "../../contexts/CategoriesContext";

import styles from "./audio-item.module.scss";
import OvalButton from "../Buttons/OvalButton";

import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";

export default function AudioItem(props) {
  const { id, title, author, price, img } = props.material;

  const [decimalPrice, setDecimalPrice] = useState(price);
  const [userData, setUserData] = useState([]);
  const [waveformLoader, setWaveformLoader] = useState(false);
  const [regions, setRegions] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const websurfer = useRef(null);
  const audioData = useRef(null);
  const { materalsByCat } = useContext(CategoriesContext);
  const { wavesurfer, setWavesurfer } = useState([]);

  useEffect(() => {
    setDecimalPrice((price) => {
      return (Math.round(price * 100) / 100).toFixed(2);
    });

    // const audioContainer = React.createElement("div");
    // audioContainer["t-" + id];
    // ReactDOM.Portal(audioContainer, document.body.getElementById("waveform"));
    // let trackId = "t" + id;

    // websurfer[trackId] = WaveSurfer.create({
    //   container: audioContainer,
    //   waveColor: "#000",
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

    // wavesurfer[trackId].drawBuffer();
    // // wavesurfer[trackId].load(url, peaks, false);
    // // return wavesurfer[trackId];

    // const audioContainer = React.createElement("div");
    // ReactDOM.Portal(
    //   audioContainer,
    //   document.body.selectElementById("waveform")
    // );
    // // document.body.appendChild

    // websurfer.current = WaveSurfer.create({
    //   container: audioContainer,
    //   waveColor: "#000",
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

    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setUserData(list);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // fetchData();
    // createWaveform(img);
  }, []);

  // const createWaveform = (file) => {
  //   if (regions.length > 0) {
  //     websurfer.current.regions.clearRegions();
  //   }
  //   setWaveformLoader(false);
  //   websurfer.load(file);
  // };

  const playPause = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
    if (websurfer.current.isPlaying()) {
      websurfer.current.pause();
    } else {
      websurfer.current.play();
    }
  };

  const uploadData = () => {};

  return (
    <div
      key={id}
      className={`${styles.audioContainer} ${styles.audioPlayerContainer}`}
    >
      <div className={styles.audioControls}>
        <Button
          sx={{
            borderRadius: "50%",
            "& svg": {
              fontSize: "50px",
              color: "#FE9549",
            },
            "&:hover": {
              background: "rgba(254,149,73,0.1)",
            },
          }}
        >
          {isPlaying ? (
            <PauseCircleOutlineIcon onClick={playPause} />
          ) : (
            <PlayCircleOutlineIcon onClick={playPause} />
          )}
        </Button>
      </div>

      <div className={styles.waveAudio} id={`waveform`}>
        <div className={styles.audioItemDetails}>
          <h4 className={styles.author}>{author}</h4>
          <h3>{title}</h3>
        </div>
      </div>
      <div className={styles.price}>
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
      </div>
      <div className={styles.button}>
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
      </div>
    </div>
  );
}
