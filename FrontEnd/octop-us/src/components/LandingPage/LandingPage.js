import React from "react";
import LandingForm from "./LandingForm";
import "./LandingPage.css";

const LandingPage = (props) => {
  return (
    <div>
      <img
        className="landing-page__bg-img"
        src="/images/landingimage.jpg"
        alt=""
      />
      <div className="landing-page__img-container">
        <img src="images/logo.png" alt="" />
      </div>
      <div className="landing-page__div">
        <LandingForm />
      </div>
    </div>
  );
};

export default LandingPage;
