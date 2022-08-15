import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import FishGameTutorial from "./FishingGameTutorial";
import FishGameCount from "./FishingGameStartCount";
import FishGame from "./FishingGame";

import Timer from "../../InGame/Timer";
import { BASE_URL, config } from "../../../api/BASE_URL";

import "./FishingGameStart.css";

const FishingGameStart = (props) => {
  const [roomId, setRoomId] = useState(props.roomId);
  const [startAnimation, setStartAnimation] = useState(true);
  const [startGame, setStartGame] = useState(false);
  const [startCount, setStartCount] = useState(false);
  const [startTutorial, setStartTutorial] = useState(false);

  // Redux store
  const { userInfo } = useSelector((state) => state.user);
  const { roomChief } = useSelector((state) => state.wait);
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
    console.log("props.roomId : " + props.roomId);
    console.log("state.roomId : " + roomId);
    makeDB();

    const timerForAnimation = setTimeout(() => { //stop animation start Tutorial
      setStartAnimation(false);
      setStartTutorial(true);
      const timerForTutorial = setTimeout(() => { //stop Tutorial start Count
        setStartTutorial(false);
        setStartCount(true);
        const timerForGame = setTimeout(() => { //stop Count start Game
          setStartCount(false);
          setStartGame(true);
          clearTimeout(timerForGame);
        }, 4500);
        clearTimeout(timerForTutorial);
      }, 10000);
      clearTimeout(timerForAnimation);
    }, 4000);
  }, []);

  async function makeDB() {
    // const roomId = props.roomId;
    let sendData = {roomId};
    console.log("sendData make : " + JSON.stringify(sendData));
    const result = await axios.post(
      BASE_URL + "/games/mini/fish/make",
       sendData,
      config
    );
    console.log("makeDB running... : " + result);
  }

  async function endGame(e){
    // const roomId = props.roomId;
    await axios.delete(BASE_URL + `/games/mini/fish/delete/${roomId}`, config);
    console.log("endGame on Starter : " + e);
    // dispatch();
    // if (roomChief === userInfo.userName) {
    //   Timer(0, localUser, 20, flag, obj);
    // }
    if(e){ // citizen win

    }
    else{ // mafia win

    }
    /*
    여기에 dispatch 사용해서 리덕스 값 갱신
    
    */
  }

  return (
    <div>
      {startAnimation && (
        <div className="fish-game__container">
          <img
            src="images/minigame/fishgame1.png"
            alt="낚시꾼"
            className="fish-game__img"
          />
        </div>
      )}
      {startTutorial && <FishGameTutorial />}
      {startCount && <FishGameCount />}
      {startGame && <FishGame endGame={endGame} roomId={roomId} job={obj.job}/>}
    </div>
  );
};

export default FishingGameStart;
