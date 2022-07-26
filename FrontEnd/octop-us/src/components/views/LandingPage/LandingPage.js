import React from "react";
import LandingForm from "./LandingForm";
// import Modal from "react-bootstrap/Modal";
import "./LandingPage.css";

const LandingPage = (props) => {
  return (
    <div className="landing-page__div">
      <h2>LandingPage</h2>
      <div>
        <LandingForm />
      </div>
    </div>
  );
};

export default LandingPage;
