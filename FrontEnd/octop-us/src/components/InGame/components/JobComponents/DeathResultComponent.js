import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../Card/Card";
import { BASE_URL } from "../../../../api/BASE_URL";
import axios from "axios";
import "./RoundComponent.css";
import { updateUserListforDead } from "../../../../features/gamer/gamerSlice";

function DeathResultComponent(props) {
  return (
    <div className="mafiaKillBox">
      <Card>
        {props.killed !== "없음" && <img src="images/mafia_kill.png" alt="squid killed someone" />}
        {props.killed === "없음" ? (
          <div>지난 밤, 아무 일도 일어나지 않았습니다.</div>
        ) : (
          <div>지난 밤, {props.killed} 이/가 오징어에게 살해당했습니다.</div>
        )}
      </Card>
    </div>
  );
}

export default DeathResultComponent;
