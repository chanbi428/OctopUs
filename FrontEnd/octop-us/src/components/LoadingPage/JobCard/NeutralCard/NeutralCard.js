import React from "react";
import "./NeutralCard.scss";

export const NeutralCard = () => {
  const flip = (evt) => {
    console.log(evt.target);
    const jobCard = document.querySelector(".card_neu");
    jobCard.classList.toggle("flipped_neu");
    const audioDom = document.getElementById("audioHint");
    const currentTime = audioDom.currentTime;
    const duration = audioDom.duration;
    if (currentTime <= 0 || currentTime === duration) {
      audioDom.play();
    }
  };

  return (
    <div>
      <div className="container_neu">
        <div className="card_neu" onClick={flip}>
          <div className="card_neu front_neu"></div>
          <div className="card_neu back_neu"></div>
        </div>
        <audio
          volume="0.2"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/945546/%E7%BF%BB%E7%89%8C%E9%9F%B3%E6%95%88.m4a"
          id="audioHint"
        ></audio>
      </div>
      <div className="guide_neu">카드를 눌러 직업을 확인하세요!</div>
    </div>
  );
};
export default NeutralCard;
