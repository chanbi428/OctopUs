import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../Card/Card";
import { BASE_URL } from "../../../../api/BASE_URL";
import axios from "axios";
import "./RoundComponent.css";
import { updateUserListforDead } from "../../../../features/gamer/gamerSlice";

function DeathResultComponent(props) {
  const [killed, setKilled] = useState("");
  const gamerData = useSelector((state) => state.gamer);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("마피아 처형 페이지 결과 확인 위함!!");

    axios.get(`${BASE_URL}/nights/result/${gamerData.roomId}`).then((res) => {
      console.log("밤 결과 확인!", res.data);
      setKilled(res.data.userName);
      console.log("killed  state에 잘 들어갔는지 확인!!", killed);
      if (res.data.userName != "없음") {
        console.log("누가 죽었니?", res.data.userName);
        dispatch(updateUserListforDead({ userName: res.data.userName }));
      }
    });
  });

  return (
    <div className="mafiaKillBox">
      <Card>
        {killed !== "없음" && <img src="images/mafia_kill.png" alt="squid killed someone" />}
        {killed === "없음" ? (
          <div>지난 밤, 아무 일도 일어나지 않았습니다.</div>
        ) : (
          <div>지난 밤, {killed} 이/가 오징어에게 살해당했습니다.</div>
        )}
      </Card>
    </div>
  );
}

export default DeathResultComponent;
