import React from 'react';
import './MayorCard.scss'

export const MayorCard= () => {
    const flip = (evt) => {
      console.log(evt.target)
      const jobCard = document.querySelector(".card_may")
      jobCard.classList.toggle("flipped_may")
      const audioDom = document.getElementById("audioHint");
      const currentTime = audioDom.currentTime;
      const duration = audioDom.duration;
      if (currentTime <= 0 || currentTime === duration) {
        audioDom.play();
      }
    }

    return (
      <div>
        <div className="container_may">
          <div className="card_may" onClick={flip}>
            <div className="card_may front_may"></div>
            <div className="card_may back_may"></div>
          </div>
          <audio src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/945546/%E7%BF%BB%E7%89%8C%E9%9F%B3%E6%95%88.m4a" id="audioHint"></audio>
        </div>
        <div className="guide_may">카드를 눌러 직업을 확인하세요!</div>
      </div>
      
    )
}
export default MayorCard;