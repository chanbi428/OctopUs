import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import Card from "../../Card/Card";
import SharkGame from "./SharkGame";
import Timer from "../../InGame/Timer";
import { useSelector } from "react-redux";
import { BASE_URL, config } from "../../../api/BASE_URL";

const SharkGameResult = () => {
  const [resultChange, setresultChange] = useState(false);
  // const { userInfo } = useSelector((state) => state.user);
  // const { gamerInfo } = useSelector((state) => state.gamer);
  const { userInfo } = useSelector((state) => state.user);
  const { roomChief, roomId } = useSelector((state) => state.wait);
  const { localUser } = useSelector((state) => state.gamer);
  const { minigameResult, job, hasSkill, isDead, shark, fisher, reporter } =
    useSelector((state) => state.gamer);
  const obj = {
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
        setresultChange(true);
        // 결과 받아오기
        // const { data } = axios.get(
        //   `${BASE_URL}/games/mini/shark/result/${roomId}`
        // );
      }, 45000); // 여기 수정 v
      return () => {
        clearTimeout(startTimer);
        // 타이머로 이동
        console.log(localUser);
        if (roomChief === userInfo.userName) {
          Timer(30, localUser, 10, flag, obj);
        }
      };
    }
  }, [resultChange]);
  return (
    <div>
      {!resultChange && <SharkGame />}
      {resultChange && <Card className="container">마피아 승리!</Card>}
    </div>
  );
};

export default SharkGameResult;
