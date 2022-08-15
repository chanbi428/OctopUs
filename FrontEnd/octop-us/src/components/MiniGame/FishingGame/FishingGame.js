import { React, useState, useEffect, useRef } from "react";
import Card from "../../Card/Card";
import axios from "axios";
import "./FishingGame.css";
import FishingGameStartCount from "./FishingGameStartCount";
import { BASE_URL, config } from "../../../api/BASE_URL";

import Timer from "../../InGame/Timer";
import { useSelector } from "react-redux";

import {
  CircularProgress,
  LinearProgress,
  makeStyles,
  createStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
    },
    margin: {
      margin: theme.spacing(3),
    },
    linearProgress: {
      width: theme.spacing(30),
    },
  })
);

const FishingComponent = (props) => {
  const [user, setUser] = useState("");
  const [jobs, setJobs] = useState("mafia");
  const [roomId, setRoomId] = useState("1234");
  const [count, setCount] = useState(0);
  const [citizenPercent, setCitizenPercent] = useState(50);
  const [mafiaPercent, setMafiaPercent] = useState(50);
  const [showMode, setShowMode] = useState(false);
  const [existMode, setExistMode] = useState(true);
  const [startChange, setStartChange] = useState(true);

  const [time, setTime] = useState(45);
  const classes = useStyles();

  const mafiaWinMent = "오징어 팀의 승리로 오늘 투표를 진행하지 않습니다.";
  const citizenWinMent = "문어 팀의 승리! 투표로 넘어갑니다.";

  const spaceCount = useRef;
  spaceCount.current = count;

  // timer로 돌아가기
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

  // gamestart -> gametutorial -> startcount(3, 2, 1, go! 뜨는 부분) -> fishingGame으로 넘어오는 구조입니다
  // startcount -> fishinggame 변하는 부분으로 앞에 낚시게임 시작 애니메이션 - 튜토리얼 - 3, 2, 1, Go! 까지 15초
  // 15초 후에 fishingGame을 띄우기 위해 사용했습니다.
  useEffect(() => {
    if (!startChange) {
      const startTimer = setTimeout(() => {
        setStartChange(true);
      }, 15000); // 여기 수정 v
      return () => clearTimeout(startTimer);
    }
  }, [startChange]);

  useEffect(() => {
    if (startChange) {
      let time = 0;
      const updater = setInterval(() => {
        console.log("useEffect : " + count + " timer : " + time);
        updateCount(spaceCount.current);
        setCount(0);
        spaceCount.current = 0;
        time++;
        if (time >= 3) {
          return () => {
            console.log("timer 2 : " + time);
            clearInterval(updater);
          };
        }
      }, 10000); // 1000 -> 1 second / update percent time
      return () => {
        clearInterval(updater);
      };
    }
  }, [count]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("timer : " + time);
      if (time > 0) setTime((time) => time - 1);
      if (time === 0) {
        console.log("timer end");
        clearInterval(timer);
        endGame();
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  function endGame() {
    setShowMode(true);
    console.log("endGame : " + showMode);

    const startTimer = setTimeout(() => {
      // 타이머로 이동
      if (roomChief === userInfo.userName) {
        Timer(0, localUser, 20, flag, obj);
      }
      props.stateVisible(citizenPercent > mafiaPercent ? true : false);
    }, 3000);

    return () => clearTimeout(startTimer);
  }
  function countFun(e) {
    setCount(count + 1);
  }

  async function updateCount(count) {
    console.log("update : " + count);
    let citizen = 0;
    let mafia = 0;
    if (jobs === "citizen") {
      citizen = count;
      mafia = 0;
    } else {
      citizen = 0;
      mafia = count;
    }

    let sendData = { roomId, citizen, mafia };
    console.log("count : " + count);

    console.log(`data: ${JSON.stringify(sendData)}`);
    const { data } = await axios.post(
      BASE_URL + "/games/mini/fish",
      sendData,
      config
    );

    console.log("data : " + data);

    setCitizenPercent((data.citizen / (data.citizen + data.mafia)) * 100);
    setMafiaPercent((data.mafia / (data.citizen + data.mafia)) * 100);
  }

  return (
    <div>
      {!startChange && showMode === false && <FishingGameStartCount />}
      {showMode === false && (
        <div id="mainComponent">
          <p id="Clock">{time}</p>
          <Card>
            <div id="mainComponent">
              <div id="centerPlace">
                <img src="images/minigame/fishbg.jpg"></img>
                <LinearProgress
                  id="progressPercent"
                  variant="determinate"
                  value={citizenPercent}
                  className={[classes.linearProgress, classes.margin]}
                />
              </div>
              {/* <p>count : {count}</p> */}
              <div className="row justify-content-between" id="centerPlace">
                <div className="col-4" id="citizenPercent">
                  <span id="citizenPercent">
                    문어 : {citizenPercent.toFixed(1)}%
                  </span>
                </div>
                <div className="col-4" id="buttonCenter">
                  <button className="btn btn-primary" onClick={countFun}>
                    Click
                  </button>
                </div>
                <div className="col-4" id="mafiaPercent">
                  <span id="mafiaPercent">
                    오징어 : {mafiaPercent.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
      {startChange && showMode && (
        // {showMode && (
        <Card id="mainComponent">
          <div id="winMent">
            <p>
              {citizenPercent > mafiaPercent ? "문어" : "오징어"}팀의 승리!!
            </p>
            <img src="images/trophy.png" width={"500px"}></img>
            <p id="winMentExplane">
              {citizenPercent > mafiaPercent ? citizenWinMent : mafiaWinMent}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FishingComponent;
