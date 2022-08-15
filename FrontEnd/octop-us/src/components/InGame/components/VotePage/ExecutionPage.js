import { useEffect, useState } from "react";
import "./ExecutionPage.css";

import MP_Cannon from "../../../../effect/MP_Cannon.mp3";

function ExecutionPage(props) {
  useEffect(() => {
    const document = window.document;

    var audio = new Audio(MP_Cannon);
    audio.play();

    setTimeout(() => {
      const userImg = document.getElementById("userImg-" + "execution");
      const video = document.getElementById("video-" + props.streamId);
      const avatar = userImg.getContext("2d");
      avatar.drawImage(video, 80, 0, 600, 600, 0, 0, 375, 188);
    }, 50);
  }, []);

  const [time, setTime] = useState(10);
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
  }

  return (
    <div className="cam-img fade-in-box">
      <img src="images/dead.png" className="dead-img" />
      <canvas id={"userImg-" + "execution"} className="execution-img" />
    </div>
  );
}

export default ExecutionPage;
