import { React, useState, useEffect, useRef } from "react";
import Card from "../../Card/Card";
import axios from "axios";
import "./FishingGame.css";
import { BASE_URL, config } from "../../../api/BASE_URL";

import Timer from "../../InGame/Timer";
import { useSelector } from "react-redux";

import { LinearProgress, makeStyles, createStyles } from "@material-ui/core";

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
  const [jobs, setJobs] = useState(props.job);
  const [roomId, setRoomId] = useState(props.roomId);
  const [count, setCount] = useState(0);
  const [citizenPercent, setCitizenPercent] = useState(50);
  const [mafiaPercent, setMafiaPercent] = useState(50);
  const [showMode, setShowMode] = useState(false);

  const [time, setTime] = useState(30);
  const classes = useStyles();

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

  useEffect(() => {
    // let time = 0;
    //   const updater = setInterval(() => {
    //     console.log("useEffect : " + count + " timer : " + time);
    //     updateCount(spaceCount.current);
    //     setCount(0);
    //     spaceCount.current = 0;
    //     time++;
    //     if (time >= 3) {
    //       return () => {
    //         console.log("timer 2 : " + time);
    //         clearInterval(updater);
    //       };
    //     }
    //   }, 1000); // 1000 -> 1 second / update percent time
    //   return () => {
    //     clearInterval(updater);
    //   };
    updateCount(spaceCount.current);
    setCount(0);
    spaceCount.current = 0;
  }, [count]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("timer : " + time);
      if (time > 0) setTime((time) => time - 1);
      if (time === 0) {
        console.log("FishGame end");
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
      let data = citizenPercent > mafiaPercent ? true : false; // 게임 결과
      props.endGame(data);
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
    console.log("update : " + jobs);
    if (jobs === "마피아") {
      citizen = 0;
      mafia = count;
    } else {
      citizen = count;
      mafia = 0;
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
    let citizenData = data.citizen;
    let mafiaData = data.mafia;
    let citizenPercent = (citizenData / (citizenData + mafiaData)) * 100;
    let mafiaPercent = (mafiaData / (citizenData + mafiaData)) * 100;
    if (citizenData === 0) {
      citizenPercent = 0;
    }
    if (mafiaData === 0) {
      mafiaPercent = 0;
    }
    setCitizenPercent(citizenPercent);
    setMafiaPercent(mafiaPercent);
  }

  return (
    <div>
      {/* {!startChange && showMode === false && <FishingGameStartCount />} */}
      {!showMode && (
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
              <div className="row justify-content-between" id="centerPlace">
                <div className="col-4" id="citizenPercent">
                  <span id="citizenPercent">
                    문어 : {citizenPercent.toFixed(1)}%
                  </span>
                </div>
                <div className="col-4" id="buttonCenter">
                  <button className="btn btn-primary" onClick={countFun}>
                    {jobs === '마피아'? '방해하기' : '도망치기'}
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
      {showMode &&
        (citizenPercent > mafiaPercent ? (
          <Card className="team_squid_card">
            <img src="images/octopus_signiture.png" alt="team_octopus" />
            <h2>문어 팀의 승리!</h2>
            <p>오늘 낮 투표가 정상적으로 진행됩니다.</p>
          </Card>
        ) : (
          <Card className="team_octopus_card">
            <img src="images/squid_std.png" alt="team_squid" />
            <h2>오징어 팀의 승리!</h2>
            <p>오늘 낮 투표를 진행하지 않습니다.</p>
          </Card>
        ))}
    </div>
  );
};

export default FishingComponent;
