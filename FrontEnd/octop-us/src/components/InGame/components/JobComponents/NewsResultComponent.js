import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../../Card/Card";
import { BASE_URL } from "../../../../api/BASE_URL";
import axios from "axios";

import "./NewsResultComponent.css";
import typing from "../../../../effect/typing.mp3";

function NewsResultComponent(props) {
  const [unveiled, setUnveiled] = useState({
    userName: "",
    gameJob: "",
  });
  const gamerData = useSelector((state) => state.gamer);

  useEffect(() => {
    axios.get(`${BASE_URL}/nights/reporter/${gamerData.roomId}`).then((res) => {
      setUnveiled({ userName: res.data.userName, gameJob: res.data.gameJob });
    });
    var audio = new Audio(typing);
    audio.volume = 0.2; // 여기
    audio.play();

    setTimeout(() => audio.pause(), 3000);
  }, []);

  return (
    <div className="reportBox">
      <Card className="news-card">
        <h2>Mooner's News</h2>
        <img
          src="images/temp_news.png"
          alt="reporter's news.png"
          className="newspaper"
          width="400px"
          height="400px"
        />
        <p>{unveiled.userName} 은/는</p>
        <p>{unveiled.gameJob}임이 밝혀졌습니다!</p>
      </Card>
    </div>
  );
}

export default NewsResultComponent;
