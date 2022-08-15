import axios from "axios";
import { React, useState } from "react";
import { useEffect } from "react";

import { BASE_URL } from "../../../../api/BASE_URL";
import "./RoundComponent.css";

function GameResultComponent(props) {
  let pathName = document.location.pathname.replace("/", "");
  const [winTeam, setWinTeam] = useState("");
  useEffect(() => {
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

  return <div>{winTeam} 승리!</div>;
}

export default GameResultComponent;
