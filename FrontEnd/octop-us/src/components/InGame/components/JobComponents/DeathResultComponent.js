import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../Card/Card";
import { BASE_URL } from "../../../../api/BASE_URL";
import axios from "axios";
import "./RoundComponent.css";
import { updateUserListforDead } from "../../../../features/gamer/gamerSlice";

import "./DeathResultComponent.css";
import MP_Scary from "../../../../effect/MP_Scary.mp3";
import MP_noEvent from "../../../../effect/MP_noEvent.mp3";
// import MP_Cannon from "../../../../effect/MP_Cannon.mp3";

function DeathResultComponent(props) {
  useEffect(() => {
    if (props.killed !== "없음") {
      var audio = new Audio(MP_Scary);
      audio.volume = 0.2; // 여기
      audio.play();

      setTimeout(() => audio.pause(), 3000);
    } else {
      var audio = new Audio(MP_noEvent);
      audio.volume = 0.2; // 여기
      audio.play();

      setTimeout(() => audio.pause(), 3000);
    }
  }, []);

  return (
    <div className="mafiaKillBox">
      {props.killed !== "없음" ? (
        <Card className="mafia_cardbox">
          <img
            src="images/mafia_kill.png"
            alt="squid killed someone"
            className="squid_kill"
          />
          <div className="kill_explain">
            <p> 지난 밤, {props.killed} 이/가 </p>
            <p> 오징어에게 살해당했습니다.</p>
          </div>
        </Card>
      ) : (
        <Card className="mafia_cardbox_not">
          <img
            src="images/nothings.png"
            alt="nothing happend"
            className="squid_nothing"
          />
          <div className="kill_explain">
            <p> 지난 밤, </p>
            <p> 아무 일도 일어나지 않았습니다.</p>
          </div>
        </Card>
      )}
    </div>
  );
}

export default DeathResultComponent;
