import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../Card/Card";
import SharkGame from "./SharkGame";
import Timer from "../../InGame/Timer";

import {
  resetShark,
  mafiaWinAtMinigame,
  mafiaLoseAtMinigame,
} from "../../../features/gamer/gamerSlice";
import { BASE_URL } from "../../../api/BASE_URL";
import axios from "axios";

const SharkGameResult = () => {
  const [resultChange, setresultChange] = useState(false);
  const [getWin, setGetWin] = useState("시민");
  const { userInfo } = useSelector((state) => state.user);
  const { roomId } = useSelector((state) => state.wait);
  const { roomChief } = useSelector((state) => state.wait);
  const { localUser } = useSelector((state) => state.gamer);
  const { minigameResult, job, hasSkill, isDead, shark, fisher, reporter } =
    useSelector((state) => state.gamer);

  const dispatch = useDispatch();
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
        // 결과 받아오기
        axios
          .get(`${BASE_URL}/games/mini/shark/result/${roomId}`)
          .then((res) => {
            if (res.data.gameTeam === "마피아") {
              dispatch(mafiaWinAtMinigame());
              setGetWin("마피아");
              setresultChange(true); // result 띄워 줘라
            } else {
              dispatch(mafiaLoseAtMinigame());
              setresultChange(true); // result 띄워 줘라
            }
          });
      }, 45000); // 여기 수정 v
      return () => {
        clearTimeout(startTimer);
        obj["shark"] = false; // shark 게임 끝났다
        dispatch(resetShark()); // true로 되어 있던 shark false로 초기화
        console.log("상어 게임 끝 obj:shark false로 변경", obj["shark"]);
        // 타이머로 이동
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
          {getWin === "마피아"
            ? "오징어 팀의 승리로 오늘 투표를 진행하지 않습니다."
            : "문어 팀의 승리! 투표로 넘어갑니다."}
        </Card>
      )}
    </div>
  );
};

export default SharkGameResult;
