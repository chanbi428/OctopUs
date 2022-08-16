import axios from "axios";
import { React, useState } from "react";
import { useEffect } from "react";

import { BASE_URL } from "../../../../api/BASE_URL";
import "./RoundComponent.css";

import MP_EndGame from "../../../../effect/MP_EndGame.mp3";

function GameResultComponent(props) {
  let pathName = document.location.pathname.replace("/", "");
  const [winTeam, setWinTeam] = useState("");
  useEffect(() => {
    var audio = new Audio(MP_EndGame);
    audio.play();
    axios
      .get(`${BASE_URL}/gamers/${props.victoryUsers[0]}`)
      .then((res) => (setWinTeam(res.data.gameTeam)))
      .catch((err) => console.log(err));
    
    axios
      .delete(`${BASE_URL}/games/end/${pathName}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    axios
      .put(`${BASE_URL}/rooms/update/status/end/${pathName}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

  },[]);

  return <div className="winner-text">{winTeam}팀 승리!</div>;
}

export default GameResultComponent;
