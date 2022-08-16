import { useEffect } from "react";
import axios from "axios";

import { BASE_URL } from "../../../api/BASE_URL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import "./NightToDayLoading.css";
import { useSelector } from "react-redux";

import MP_Morning from "../../../effect/MP_Morning.mp3";

const NightToDayLoading = (props) => {
  // 승리 유저 조회 후 업데이트 하고 리스트 넘김
  let pathName = document.location.pathname.replace("/", "");
  let victoryUsers = [];
  const { userName } = useSelector((state) => state.gamer);
  const { roomChief } = useSelector((state) => state.wait);

  useEffect(() => {
    var audio = new Audio(MP_Morning);
    audio.play();
    setTimeout(() => audio.pause(), 3000);

    console.log(userName, roomChief, "NightToDay Loading 종료");
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/gamers/victory/team/${pathName}`)
        .then((res) => {
          console.log("종료1", res.data)
          if (res.data.victory) {
            axios
              .put(`${BASE_URL}/gamers/isvictory/gameTeam/${pathName}/${res.data.gameTeam}`)
              .then((res) => {
                console.log("종료2", res.data)
                axios
                  .get(`${BASE_URL}/gamers/winners`)
                  .then((res) => {
                    console.log("종료3", res.data)
                    victoryUsers = res.data.map((row) => row.userName);
                    props.setVictoryUser(victoryUsers);
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, []);

  return (
    <div className="sun-page">
      <div className="wrap-sun">
        <div className="circle-sun">
          <div className="wave-one-sun"></div>
          <div className="wave-two-sun"></div>
          <div className="wave-three-sun"></div>
          <div className="wave-four-sun"></div>

          <FontAwesomeIcon icon={faSun} />
          <FontAwesomeIcon icon={faSun} className="blur-sun" />

          <div className="cloud">
            <FontAwesomeIcon icon={faCloud} className="cloud1" />
            <FontAwesomeIcon icon={faCloud} className="cloud2" />
            <FontAwesomeIcon icon={faCloud} className="cloud3" />
            <FontAwesomeIcon icon={faCloud} className="cloud4" />
            <FontAwesomeIcon icon={faCloud} className="cloud5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NightToDayLoading;
