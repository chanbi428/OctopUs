import { React, useState, useEffect, useRef } from "react";
import Card from "../../Card/Card";

import axios from "axios";
import "./FishingGame.css";
import { BASE_URL, config } from "../../../api/BASE_URL";

import Timer from "../../InGame/Timer";
import { useSelector, useDispatch } from "react-redux";
import { resetFisher } from "../../../features/gamer/gamerSlice";

import {
  CircularProgress,
  LinearProgress,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { lightBlue } from "@mui/material/colors";

import styled from "styled-components";
import MP_btn3 from "../../../effect/MP_btn3.mp3";
const FishingDivComponent = styled.div`
  position: relative; /* 상대위치 지정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  width: 1000px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  padding: 10px;
  background-color: #fdfcdc;
  overflow: hidden;
  border: 3px solid black;
  & .redTime {
    color: rgb(240, 113, 103);
  }
`;

const FishingTimer = styled.div`
  color: #13293d;
  font-size: 40px;
  font-weight: bold;
  font-family: BMJUA;
  & .redTime {
    color: rgb(240, 113, 103);
  }
  cursor: default;
`;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    margin: {
      margin: theme.spacing(1),
    },
    linearProgress: {
      variant: "buffer",
      height: "20px",
      borderRadius: "10px",
      backgroundColor: theme.palette.mode === "light" ? "#f4d35e" : "#f4d35e",
    },
  })
);
const FishingBottom = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(0, 129, 167, 0.7);
  border-radius: 20px;
  cursor: default;

  & .octo-score {
    display: flex;
    margin-left: 10px;
    font-size: 25px;
    text-align: center;
    align-items: center;
    justify-content: center;
    color: rgb(245, 0, 87);
    width: 15vw;
  }

  & .squid-score {
    display: flex;
    margin-right: 10px;
    font-size: 25px;
    text-align: center;
    align-items: center;
    justify-content: center;
    color: #f4d35e;
    width: 15vw;
  }

  & .octo-img {
    width: 5vw;
  }

  & .squid-img {
    width: 4vw;
  }

  & .octo-textbox {
    width: 9vw;
  }

  & .squid-textbox {
    width: 10vw;
  }

  & .octo-text {
    font-size: 20px;
    color: black;
  }

  & .squid-text {
    font-size: 20px;
    color: black;
  }

  & .fishing-game__btn {
    width: 9vw;
    height: 6vh;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    background-color: #f4d35e;
    border-radius: 5px;
    font-size: 20px;
    letter-spacing: 2px;

    & .clicked {
      width: 9vw;
      height: 6vh;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
      background-color: #f4d35e;
      border-radius: 5px;
      font-size: 20px;
      letter-spacing: 2px;
      border: 3px solid rgba(0, 0, 0, 0.21);
      border-bottom: 4px solid rgba(0, 0, 0, 0.21);
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
    }
  }

  & .fishing-game__btn:hover {
    width: 9vw;
    height: 6vh;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    background-color: #f4d35e;
    border-radius: 5px;
    font-size: 20px;
    letter-spacing: 2px;
    border: 3px solid rgba(0, 0, 0, 0.21);
    border-bottom: 4px solid rgba(0, 0, 0, 0.21);
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  }
`;

const FishingScore = styled.div`
  font-family: BMJUA;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
`;

const FishingComponent = (props) => {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState(props.job);
  const [roomId, setRoomId] = useState(props.roomId);
  const [count, setCount] = useState(0);
  const [citizenPercent, setCitizenPercent] = useState(50);
  const [mafiaPercent, setMafiaPercent] = useState(50);
  const [showMode, setShowMode] = useState(false);

  const [time, setTime] = useState(20);
  const classes = useStyles();

  const spaceCount = useRef;
  spaceCount.current = count;

  // timer로 돌아가기
  const { userInfo } = useSelector((state) => state.user);
  const { roomChief, gameTime } = useSelector((state) => state.wait);
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
    gameTime: gameTime,
  };
  var flag = {
    gameEnd: false, // 게임종료여부,
    voteGo: false, // 투표결과(최후변론 할지 안할지),
    agreeVoteGo: false, // 찬반투표결과(처형 할지 안할지)
  };

  useEffect(() => {
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
    updateCount(0);
    setShowMode(true);
    console.log("endGame : " + showMode);

    const startTimer = setTimeout(() => {
      // 타이머로 이동
      dispatch(resetFisher());
      obj["fisher"] = false;
      if (roomChief === userInfo.userName) {
        Timer(0, localUser, 20, flag, obj);
      }
      let data = citizenPercent > mafiaPercent ? true : false; // 게임 결과
      props.endGame(data);
    }, 3000);

    return () => clearTimeout(startTimer);
  }
  function countFun(e) {
    var audio = new Audio(MP_btn3);
    audio.play();
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
    let citizenData = data.citizen / 6;
    let mafiaData = data.mafia / 2;
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
      {!showMode && (
        <FishingDivComponent>
          <FishingTimer className={time < 6 ? "redTime" : null}>
            {time}
          </FishingTimer>
          {/* <div id="mainComponent"> */}
          {/* <div id="centerPlace"> */}
          <img
            src="images/minigame/fishbg.gif"
            className="fishing-game__img"
          ></img>
          <FishingBottom>
            <LinearProgress
              variant="determinate"
              value={citizenPercent}
              className={[classes.linearProgress, classes.margin]}
              color="secondary"
            />
            <FishingScore>
              <div className="octo-score">
                <img
                  src="images/minigame/octo.png"
                  alt=""
                  className="octo-img"
                />
                <div className="octo-textbox">
                  <div className="octo-text">문어</div>
                  <div>{citizenPercent.toFixed(1)}%</div>
                </div>
              </div>
              <button className="fishing-game__btn active" onClick={countFun}>
                {jobs === "마피아" ? "방해하기" : "도망치기"}
              </button>
              <div className="squid-score">
                <div className="squid-textbox">
                  <div className="squid-text">오징어</div>
                  <div>{mafiaPercent.toFixed(1)}%</div>
                </div>
                <img
                  src="images/minigame/squid.png"
                  alt=""
                  className="squid-img"
                />
              </div>
            </FishingScore>
          </FishingBottom>
        </FishingDivComponent>
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
