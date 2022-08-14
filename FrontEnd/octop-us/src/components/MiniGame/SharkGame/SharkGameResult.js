import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../../Card/Card";
import SharkGame from "./SharkGame";
import Timer from "../../InGame/Timer";

import {
  mafiaWinAtMinigame,
  mafiaLoseAtMinigame,
} from "../../../features/gamer/gamerSlice";
import { BASE_URL, config } from "../../../api/BASE_URL";
import axios from "axios";

const SharkGameResult = () => {
  const [resultChange, setresultChange] = useState(false);
  const [getWin, setGetWin] = useState("시민");
  const { userInfo } = useSelector((state) => state.user);
  const { gamerInfo } = useSelector((state) => state.gamer);
  const { roomChief, roomId } = useSelector((state) => state.wait);
  const { localUser } = useSelector((state) => state.gamer);
  const { minigameResult, job, hasSkill, isDead, shark, fisher, reporter } =
    useSelector((state) => state.gamer);
  const obj = {
    roomChief: roomChief,
    minigameResult: minigameResult,
    job: job,
    hasSkill: hasSkill,
    isDead: isDead,
    shark: shark,
    fisher: fisher,
    reporter: reporter,
  };
  var flag = {
    gameEnd: false, // 게임종료여부,
    voteGo: false, // 투표결과(최후변론 할지 안할지),
    agreeVoteGo: false, // 찬반투표결과(처형 할지 안할지)
  };

  useEffect(() => {
    if (!resultChange) {
      const startTimer = setTimeout(() => {
        obj.shark = false; // shark 게임 끝났다
        // 결과 받아오기
        const { data } = axios.get(
          `${BASE_URL}/games/mini/shark/result/${roomId}`
        );

        if (data.game_team === "마피아") {
          mafiaWinAtMinigame();
          setGetWin("마피아");
        } else {
          mafiaLoseAtMinigame();
        }
        setresultChange(true); // result 띄워 줘라
      }, 45000); // 여기 수정 v
      return () => {
        clearTimeout(startTimer);
        // 타이머로 이동
        console.log(localUser);
        if (roomChief === userInfo.userName) {
          Timer(0, localUser, 20, flag, obj);
        }
      };
    }
  }, [resultChange]);

  return (
    <div>
      {!resultChange && <SharkGame />}
      {resultChange && (
        <Card className="container">
          {/* 되는 코드 지우지 말 것 */}
          {{ getWin } === "마피아"
            ? "오징어 팀의 승리로 오늘 투표를 진행하지 않습니다."
            : "문어 팀의 승리! 투표로 넘어갑니다."}
          {/* 오징어 팀의 승리로 투표를 진행하지 않습니다. */}
        </Card>
      )}
    </div>
  );
};

export default SharkGameResult;
