import React from 'react';
import './ReporterCard.scss'

export const JobCard= () => {
    const flip = (evt) => {
      console.log(evt.target)
      const jobCard = document.querySelector(".card_rep")
      jobCard.classList.toggle("flipped_rep")
      const audioDom = document.getElementById("audioHint");
      const currentTime = audioDom.currentTime;
      const duration = audioDom.duration;
      if (currentTime <= 0 || currentTime === duration) {
        audioDom.play();
      }
    }

    return (
      <div className="container_rep">
        <div className="card_rep" onClick={flip}>
          <div className="card_rep front_rep"></div>
          <div className="card_rep back_rep"></div>
        </div>
        <audio src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/945546/%E7%BF%BB%E7%89%8C%E9%9F%B3%E6%95%88.m4a" id="audioHint"></audio>
      </div>
    )
}
export default JobCard;