import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SharkGameBoard from "./SharkGameBoard";
import SharkGameTimer from "./SharkGameTimer";
import SharkGameStart from "./SharkGameStart";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 600px;
  border: 1px solid black;
`;

const StartButton = styled.button`
  margin-top: 30px;
  width: 100px;
  height: 50px;
`;

let array = [];
for (let i = 1; i <= 16; i++) {
  array.push(i);
}

function SharkGame() {
  const [numbers, setNumbers] = useState(array); // 1~16 숫자 배열
  const [gameFlag, setGameFlag] = useState(false); // 게임이 진행중인지 여부
  // 게임 진행 시 클릭해야 할 숫자. 초기 1, 누를 때마다 2, 3, 4 ... 25까지
  const [current, setCurrent] = useState(1);
  const [eventChange, setEventChange] = useState(false);

  // 이벤트 발생 -> 게임으로 화면 전환
  useEffect(() => {
    if (!eventChange) {
      const eventTimer = setTimeout(() => {
        setEventChange(true);
      }, 4000);
      return () => clearTimeout(eventTimer);
    }
  }, [eventChange]);

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

  // 게임 시작, 초기값 1
  const startGame = () => {
    setNumbers(shuffleArray(array));
    setCurrent(1);
    setGameFlag(true);
  };

  // 게임 종료
  const endGame = () => {
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
      {!eventChange && <SharkGameStart />}
      {eventChange && (
        <Container>
          <SharkGameBoard
            numbers={numbers}
            handleClick={onClickHandler}
          ></SharkGameBoard>
          {gameFlag ? (
            <SharkGameTimer />
          ) : (
            <StartButton onClick={startGame}>start</StartButton>
          )}
        </Container>
      )}
    </div>
  );
}

export default SharkGame;
