import React from "react";
import { useSelector } from "react-redux";

import { BASE_URL, config } from "../../../api/BASE_URL";
import axios from "axios";

import "./SharkGameStart.css";

const SharkGameStart = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { userList } = useSelector((state) => state.gamer);
  const { roomId } = useSelector((state) => state.wait);

  // 게임 시작시 userName과 roomId 보내기 - 되는 코드임 나중에 주석 풀기
  const room_id = roomId;
  const user_name = userInfo.userName;
  let game_team = "";
  for (let i = 0; i < 8; i++) {
    if (userList[i]["userName"] === user_name) {
      game_team = userList[i]["gameTeam"];
      break;
    }
  }

  console.log("상어게임 시작", room_id, user_name, game_team);
  axios.post(
    BASE_URL + "/games/mini/shark",
    { user_name, room_id, game_team },
    config
  );

  return (
    <div className="shark-game__container">
      <img
        src="images/minigame/Shark.png"
        alt="상어"
        className="shark-game__img"
      />
    </div>
  );
};

export default SharkGameStart;
