import { React, useState, useEffect, useRef } from "react";
import Card from "../../Card/Card";
import axios from "axios";
import "./FishingCss.css";
import FishGameTutorial from "./FishingTutorial";

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

const FishingComponent = () => {
  const [user, setUser] = useState("");
  const [job, setJob] = useState("mafia");
  const [roomId, setRoomId] = useState("1234");
  const [count, setCount] = useState(0);
  const [citizenPercent, setCitizenPercent] = useState(50);
  const [mafiaPercent, setMafiaPercent] = useState(50);
  const [showMode, setShowMode] = useState(false);

  const [time, setTime] = useState(30);
  const classes = useStyles();

  const mafiaWinMent = "[마피아]팀의 승리로 인해 오늘 투표를 진행하지 않습니다.";
  const citizenWinMent = "[시민]팀의 승리로 인해 오늘 ...는 진행하지 않습니다.";

  const spaceCount = useRef;
  spaceCount.current = count;

  const BASE_URL = "http://localhost:8080";
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // makeDB();

  useEffect(() => {
    const updater = setInterval(() => {
      console.log("useEffect : " + count);
      updateCount(spaceCount.current);
      setCount(0);
      spaceCount.current = 0;
    }, 10000); // 1000 -> 1 second / update percent time

    return () => {
      clearInterval(updater);
    };
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
    console.log("endGame");
    setShowMode(true);
  }
  function countFun(e) {
    setCount(count + 1);
  }
  async function makeDB() {
    console.log("makeDB running...");
    await axios.get(BASE_URL + "/games/mini/fish/make", { roomId }, config);
  }
  async function updateCount(count) {
    console.log("update : " + count);
    let citizen = 0;
    let mafia = 0;
    if (job === "citizen") {
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
      {showMode === false && (
        <div id="mainComponent">
          <p id="Clock">{time}</p>
          <Card>
            <div id="mainComponent">
              <div id="centerPlace">
                <img src="images/fish/fishbg.jpg"></img>
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
                    시민 : {citizenPercent.toFixed(1)}%
                  </span>
                </div>
                <div className="col-4" id="buttonCenter">
                  <button className="btn btn-primary" onClick={countFun}>
                    Click
                  </button>
                </div>
                <div className="col-4" id="mafiaPercent">
                  <span id="mafiaPercent">
                    마피아 : {mafiaPercent.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
      {showMode === true && (
        <Card id="mainComponent">
          <div id="winMent">
            <p>
              {citizenPercent > mafiaPercent ? "시민" : "마피아"}팀의 승리!!
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
