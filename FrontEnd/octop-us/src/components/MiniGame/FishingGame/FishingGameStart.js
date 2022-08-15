import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  mafiaWinAtMinigame,
  mafiaLoseAtMinigame,
} from "../../../features/gamer/gamerSlice";
import { BASE_URL, config } from "../../../api/BASE_URL";

import "./FishingGameStart.css";

const FishingGameStart = () => {
  const { roomId } = useSelector((state) => state.wait);
  // const [roomId, setRoomId] = useState("1234");
  // const { gamerInfo } = useSelector((state) => state.gamer);
  // const [visible, setVisible] = useState(true);

  useEffect(() => {
    makeDB();
  }, []);

  async function makeDB() {
    console.log("makeDB running...");
    await axios.get(BASE_URL + "/games/mini/fish/make", { roomId }, config);
  }

  //   const stateVisible = (e) => {
  //   setVisible(false);
  //   if(e === true){
  //     dispatch(mafiaLoseAtMinigame);
  //   }
  //   else{
  //     dispatch(mafiaWinAtMinigame);
  //   }
  // };
  return (
    <div className="fish-game__container">
      <img
        src="images/minigame/fishgame1.png"
        alt="낚시꾼"
        className="fish-game__img"
      />
    </div>
  );
};

export default FishingGameStart;
