import { useEffect, useState } from "react";
import "./ExecutionPage.css";

import MP_Cannon from "../../../../effect/MP_Cannon.mp3";

function ExecutionPage(props) {
  useEffect(() => {
    const document = window.document;

    var audio = new Audio(MP_Cannon);
    audio.volume = 0.2;
    audio.play();

    setTimeout(() => {
      const userImg = document.getElementById("userImg-" + "execution");
      const video = document.getElementById("video-" + props.streamId);
      const avatar = userImg.getContext("2d");
      avatar.drawImage(video, 80, 0, 600, 600, 0, 0, 375, 188);
    }, 400);
  }, []);

  return (
    <div className="cam-img fade-in-box">
      <img src="images/dead.png" className="dead-img" />
      <canvas id={"userImg-" + "execution"} className="execution-img" />
    </div>
  );
}

export default ExecutionPage;
