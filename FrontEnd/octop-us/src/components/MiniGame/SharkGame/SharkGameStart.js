import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { BASE_URL, config } from "../../../api/BASE_URL";
import axios from "axios";

import "./SharkGameStart.css";

const SharkGameStart = () => {
  // const { userInfo } = useSelector((state) => state.user);
  // const { userList } = useSelector((state) => state.gamer);
  // const { roomId } = useSelector((state) => state.wait);

  // 게임 시작시 userName과 roomId 보내기 - 되는 코드임 나중에 주석 풀기
  // const roomId = roomId;
  // const userName = userInfo.userName;
  // let gameTeam = "";
  // for (let i = 0; i < 8; i++) {
  //   if (userList[i]["userName"] === userName) {
  //     gameTeam = userList[i]["gameTeam"];
  //     break;
  //   }
  // }

  // console.log("상어게임 시작", roomId, userName, gameTeam);
  // useEffect(() => {
  //   axios.post(
  //     BASE_URL + "/games/mini/shark",
  //     { userName: userName, roomId: roomId, gameTeam: gameTeam },
  //     config
  //   );
  //   console.log("상어 잘 보내졌나");
  // }, []);

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
