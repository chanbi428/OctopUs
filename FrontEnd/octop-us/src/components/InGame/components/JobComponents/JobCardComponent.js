import { React, useState } from "react";

import "./JobCardComponent.css";

function JobCardComponent(props) {
  return (
    <div>
      <div className="hover-card">
        <img src="icons/jobIcon.png" className="hover-card__job-img" />
        {props.gameJob === "의사" && (
          <img
            src="images/jobCard/front_doctor.png"
            alt=""
            className="job-cards"
          />
        )}
        {props.gameJob === "시장" && (
          <img
            src="images/jobCard/front_mayor.png"
            alt=""
            className="job-cards"
          />
        )}
        {props.gameJob === "재간둥이" && (
          <img
            src="images/jobCard/front_neutral.png"
            alt=""
            className="job-cards"
          />
        )}
        {(props.gameJob === "경찰" || props.gameJob === "크레이지경찰") && (
          <img
            src="images/jobCard/front_police.png"
            alt=""
            className="job-cards"
          />
        )}
        {props.gameJob === "기자" && (
          <img
            src="images/jobCard/front_reporter.png"
            alt=""
            className="job-cards"
          />
        )}
        {props.gameJob === "마피아" && (
          <img
            src="images/jobCard/front_squid.png"
            alt=""
            className="job-cards"
          />
        )}
      </div>
    </div>
  );
}

export default JobCardComponent;
