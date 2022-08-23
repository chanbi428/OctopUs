import axios from "axios";
import { React, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { BASE_URL } from "../../../../api/BASE_URL";
import "./RoundComponent.css";
import "./GameResultPage.css";

import MP_EndGame from "../../../../effect/MP_EndGame.mp3";

function GameResultComponent(props) {
  let pathName = document.location.pathname.replace("/", "");
  const [winTeam, setWinTeam] = useState("");
  const room = useSelector((state) => state.wait);
  const gamer = useSelector((state) => state.gamer);
  useEffect(() => {
    var audio = new Audio(MP_EndGame);
    audio.loop = true;
    audio.volume = 0.5;
    audio.play();
    axios
      .get(`${BASE_URL}/gamers/${props.victoryUsers[0]}`)
      .then((res) => {
        setWinTeam(res.data.gameTeam);
        // if (res.data.gameTeam === "중립") {
        //   setWinTeam("재간둥이");
        // } else {
        //   setWinTeam(res.data.gameTeam);
        // }
      })
      .catch((err) => console.log(err));

    // setTimeout(() => audio.pause(), room.gameTime); // 나중에는 이거 사용
    setTimeout(() => audio.pause(), 3000); // 테스트용

    axios
      .delete(`${BASE_URL}/games/end/${pathName}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    axios
      .put(`${BASE_URL}/rooms/update/status/end/${pathName}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    
    if(props.victoryUsers.includes(gamer.userName)) {
      props.setFilter()
      console.log("필터링 됨")
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      props.resetFilter()
    }, 15000);
  },[])

  return (
    <div>
      {winTeam === "마피아" && (
        <div className="winner-text">오징어팀 승리!</div>
      )}
      {winTeam === "시민" && <div className="winner-text">문어팀 승리!</div>}
      {winTeam === "중립" && <div className="winner-text">재간둥이 승리!</div>}
    </div>
  );
}

export default GameResultComponent;
