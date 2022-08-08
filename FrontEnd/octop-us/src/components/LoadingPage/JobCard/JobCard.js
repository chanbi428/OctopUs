import React, { useEffect } from 'react';
import './JobCard.scss'
import SvgComponent from './SvgComponent'

export const JobCard= () => {
    const flip = (evt) => {
      console.log(evt.target)
      const jobCard = document.querySelector(".card_job")
      // evt.target.classList.toggle('flipped_job')
      jobCard.classList.toggle("flipped_job")
      const audioDom = document.getElementById("audioHint");
      const currentTime = audioDom.currentTime;
      const duration = audioDom.duration;
      if (currentTime <= 0 || currentTime === duration) {
        audioDom.play();
      }
    }

    return (
      <div class="container_job">
        <div class="card_job" onClick={flip}>
          <div class="card_job front_job" 
          // onClick={(evt) => {
          //   evt.stopPropagation()
          //   console.log("front 클릭 방지!!")
          // }}
          ></div>
          <div class="card_job back_job">
            {/* <SVGComponent /> */}
          </div>
        </div>
        <audio src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/945546/%E7%BF%BB%E7%89%8C%E9%9F%B3%E6%95%88.m4a" id="audioHint"></audio>
      </div>
    )
}
export default JobCard;