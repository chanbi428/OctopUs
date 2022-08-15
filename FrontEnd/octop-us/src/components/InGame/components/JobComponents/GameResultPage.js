import axios from "axios";
import { React, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { BASE_URL } from "../../../../api/BASE_URL";
import "./RoundComponent.css";

import MP_EndGame from "../../../../effect/MP_EndGame.mp3";

function GameResultComponent(props) {
  let pathName = document.location.pathname.replace("/", "");
  const [winTeam, setWinTeam] = useState("");
  const room = useSelector((state) => state.wait);
  useEffect(() => {
    var audio = new Audio(MP_EndGame);
    audio.loop = true;
    audio.volume = 0.5;
    audio.play();

    // setTimeout(() => audio.pause(), room.gameTime); // 나중에는 이거 사용
    setTimeout(() => audio.pause(), 3000); // 테스트용

    axios
      .delete(`${BASE_URL}/games/end/${pathName}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`${BASE_URL}/gamers/victory/team/${pathName}`)
      .then((res) => setWinTeam(res.data.gameTeam))
      .catch((err) => console.log(err));

    axios
      .put(`${BASE_URL}/rooms/update/status/end/${pathName}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  });

  return <div className="winner-text">{winTeam}팀 승리!</div>;
}

export default GameResultComponent;
