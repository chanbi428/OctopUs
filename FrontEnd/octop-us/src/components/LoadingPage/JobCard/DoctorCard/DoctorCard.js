import React from 'react';
import './DoctorCard.scss'

export const JobCard= () => {
    const flip = (evt) => {
      console.log(evt.target)
      const jobCard = document.querySelector(".card_doc")
      jobCard.classList.toggle("flipped_doc")
      const audioDom = document.getElementById("audioHint");
      const currentTime = audioDom.currentTime;
      const duration = audioDom.duration;
      if (currentTime <= 0 || currentTime === duration) {
        audioDom.play();
      }
    }

    return (
      <div className="container_doc">
        <div className="card_doc" onClick={flip}>
          <div className="card_doc front_doc"></div>
          <div className="card_doc back_doc"></div>
        </div>
        <audio src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/945546/%E7%BF%BB%E7%89%8C%E9%9F%B3%E6%95%88.m4a" id="audioHint"></audio>
      </div>
    )
}
export default JobCard;