import React from "react";
import { useDispatch } from "react-redux";
import { setCrazyJobs } from "../../../../features/gamer/gamerSlice";
import "./CrazyCard.scss";

export const CrazyCard = () => {
  const dispatch = useDispatch();
  const flip = (evt) => {
    const jobCard = document.querySelector(".card_crazy");
    jobCard.classList.toggle("flipped_crazy");
    const audioDom = document.getElementById("audioHint");
    const currentTime = audioDom.currentTime;
    const duration = audioDom.duration;
    if (currentTime <= 0 || currentTime === duration) {
      audioDom.volume = 0.03;
      audioDom.play();
      dispatch(setCrazyJobs());
    }
  };

  return (
    <div>
      <div className="container_crazy">
        <div className="card_crazy" onClick={flip}>
          <div className="card_crazy front_crazy"></div>
          <div className="card_crazy back_crazy"></div>
        </div>
        <audio
          volume="0.01"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/945546/%E7%BF%BB%E7%89%8C%E9%9F%B3%E6%95%88.m4a"
          id="audioHint"
        ></audio>
      </div>
      <div className="guide_crazy">카드를 눌러 직업을 확인하세요!</div>
    </div>
  );
};
export default CrazyCard;
