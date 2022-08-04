import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SharkGameBoard from "./SharkGameBoard";
import SharkGameTimer from "./SharkGameTimer";

let array = [];
for (let i = 1; i <= 16; i++) {
  array.push(i);
}

function SharkGame() {
  const [numbers, setNumbers] = useState(array); // 1~16 숫자 배열
  const [gameFlag, setGameFlag] = useState(false); // 게임이 진행중인지 여부
  // 게임 진행 중 특정시점에서 클릭해야 할 숫자.
  // 처음에는 1, 누를 때마다 2, 3, 4 ... 25까지
  const [current, setCurrent] = useState(1);

  const onClickHandler = (num) => {
    // console.log(num);
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

  const startGame = () => {
    setNumbers(shuffleArray(array));
    setCurrent(1);
    setGameFlag(true);
  };

  const endGame = () => {
    setGameFlag(false);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  return (
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
  );
}

const Container = styled.div`
  width: 600px;
  height: 600px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StartButton = styled.button`
  margin-top: 30px;
  width: 100px;
  height: 50px;
`;

export default SharkGame;
