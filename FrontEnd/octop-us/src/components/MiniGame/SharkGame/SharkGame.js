import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SharkGameBoard from "./SharkGameBoard";
import SharkGameTimer from "./SharkGameTimer";
import SharkGameStartCount from "./SharkGameStartCount";
import SharkGameTutorial from "./SharkGameTutorial";

import { BASE_URL, config } from "../../../api/BASE_URL";
import { useSelector } from "react-redux";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 600px;
  border: 1px solid black;
  flex-direction: column;
`;

const StartButton = styled.button`
  margin-top: 30px;
  width: 100px;
  height: 50px;
`;

// 16칸 배열 생성
let array = [];
for (let i = 1; i <= 16; i++) {
  array.push(i);
}

function SharkGame(props) {
  const [numbers, setNumbers] = useState(array); // 1~16 숫자 배열
  const [gameFlag, setGameFlag] = useState(false); // 게임이 진행중인지 여부
  const [current, setCurrent] = useState(1); // 게임 진행 시 클릭 할 숫자. 1 ~ 25
  const [startChange, setStartChange] = useState(false);
  // const { userInfo } = useSelector((state) => state.user);
  // const { gamerInfo } = useSelector((state) => state.gamer);

  useEffect(() => {
    if (!startChange) {
      const startTimer = setTimeout(() => {
        setStartChange(true);
      }, 15000); // 여기 수정 v
      return () => clearTimeout(startTimer);
    }
    if (startChange) {
      // 게임 시작시 userName과 roomId 보내기 - 되는 코드임 나중에 주석 풀기
      // const user_name = gamerInfo.userName;
      // const room_id = gamerInfo.roomId;
      // axios.post(BASE_URL + "games/mini/shark", { user_name, room_id }, config);
      setNumbers(shuffleArray(array));
      setCurrent(1);
      setGameFlag(true);
    }
  }, [startChange]);

  const onClickHandler = (num) => {
    if (num === current) {
      if (num === 32) {
        endGame();
      }
      const index = numbers.indexOf(num);
      setNumbers((numbers) => [
        ...numbers.slice(0, index),
        num < 17 ? num + 16 : 0,
        ...numbers.slice(index + 1),
      ]);
      setCurrent((current) => current + 1);
    }
  };

  // 게임 종료
  const endGame = (time) => {
    setGameFlag(false);
  };

  // 배열 섞기
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div>
      {!startChange && <SharkGameStartCount />}
      {startChange && (
        <Container>
          <SharkGameTimer />
          <SharkGameBoard
            numbers={numbers}
            handleClick={onClickHandler}
          ></SharkGameBoard>
        </Container>
      )}
    </div>
  );
}

export default SharkGame;
