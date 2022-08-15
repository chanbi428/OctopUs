import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { BASE_URL, config } from "../../../api/BASE_URL";
import axios from "axios";

const Container = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
  width: 300px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
  color: #13293d;
  & .redTime {
    color: rgb(240, 113, 103);
  }
`;

const Timer = styled.div`
  text-align: right;
  font-family: BMJUA;
`;

const MyRecord = styled.div`
  font-family: BMJUA;
`;

function SharkGameTimer({ isFinish }) {
  const [timeElapsed, setTimeElapsed] = useState(30); // 30초 제한
  const [playTime, setPlayTime] = useState(0); // 1초씩 줄어들기
  const [finishRecord, setFinishRecord] = useState(null); // 내 플레이타임 기록

  const { userInfo } = useSelector((state) => state.user);
  const { userList } = useSelector((state) => state.gamer);
  const { roomId } = useSelector((state) => state.wait);

  const userName = userInfo.userName;
  let gameTeam = "";
  for (let i = 0; i < 8; i++) {
    if (userList[i]["userName"] === userName) {
      gameTeam = userList[i]["gameTeam"];
      break;
    }
  }

  const record = useRef();
  record.current = playTime;

  // 보드판 위에 뜨는 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeElapsed > 0 && !isFinish) {
        setTimeElapsed((timeElapsed) => timeElapsed - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
      console.log("지금 몇초인지" + record.current / 1000);
    };
  }, [timeElapsed]);

  // 본인 playTime 기록
  useEffect(() => {
    const playtimecount = setInterval(() => {
      setPlayTime((playTime) => playTime + 30);
    }, 30);
    return () => {
      clearInterval(playtimecount);
    };
  }, []);

  // 게임 끝났을 때 내 기록 보내기
  useEffect(() => {
    if (isFinish) {
      const myTime = playTime / 1000;
      console.log(`게임 끝! 내 기록: ${myTime}`);
      setFinishRecord(myTime);
      axios.post(
        BASE_URL + "/games/mini/shark",
        {
          userName: userName,
          roomId: roomId,
          gameTeam: gameTeam,
          time: myTime,
        },
        config
      );
      console.log("상어 잘 보내졌나");
    }
  }, [isFinish]);

  return (
    <Container>
      {!finishRecord ? (
        <Timer className={timeElapsed < 6 ? "redTime" : null}>
          {timeElapsed}
        </Timer>
      ) : (
        <MyRecord>내 기록 : {finishRecord}초</MyRecord>
      )}
    </Container>
  );
}

export default SharkGameTimer;
