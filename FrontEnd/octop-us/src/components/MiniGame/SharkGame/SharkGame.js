import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import SharkGameBoard from "./SharkGameBoard";
import SharkGameTimer from "./SharkGameTimer";
import SharkGameStartCount from "./SharkGameStartCount";
import "./SharkGame.css";

// 16칸 배열 생성
let array = [];
for (let i = 1; i <= 16; i++) {
  array.push(i);
}

function SharkGame(props) {
  const [numbers, setNumbers] = useState(array); // 1~16 숫자 배열
  const [gameflag, setGameFlag] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [current, setCurrent] = useState(1); // 게임 진행 시 클릭 할 숫자. 1 ~ 25
  const [startChange, setStartChange] = useState(false); // 앞에 애니메이션 -> 상어게임 연결 부분

  useEffect(() => {
    if (!startChange) {
      const startTimer = setTimeout(() => {
        setStartChange(true);
      }, 15000); // 여기 수정 v
      return () => clearTimeout(startTimer);
    }
    if (startChange) {
      setGameFlag(true);
      setNumbers(shuffleArray(array));
      console.log("배열");
      setCurrent(1);
    }
  }, [startChange]);

  const onClickHandler = (e) => {
    const num = parseInt(e.target.innerText);
    const isCorrect = async () => {
      const tmp = e.target.className;
      e.target.className = tmp + " Shark-game__correct";
      setTimeout(() => {
        e.target.className = tmp;
      }, 300);
    };
    const isIncorrect = async () => {
      const tmp = e.target.className;
      e.target.className = tmp + " Shark-game__incorrect";
      setTimeout(() => {
        e.target.className = tmp;
      }, 300);
    };
    const isEnd = () => {
      e.target.className = "Shark-game__end-cell";
    };
    if (num === current) {
      if (num <= 16) isCorrect();
      else isEnd();
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
    } else {
      isIncorrect();
    }
  };

  // 게임 종료
  const endGame = () => {
    setIsFinish(true);
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
        <div className="shark-game__board">
          <SharkGameTimer isFinish={isFinish} />
          <SharkGameBoard
            numbers={numbers}
            handleClick={onClickHandler}
          ></SharkGameBoard>
        </div>
      )}
    </div>
  );
}

export default SharkGame;
