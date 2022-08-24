import { React, useState, useEffect } from "react";
import "./VoteAnimationComponent.scss";
import Card from "../../../Card/Card";

import MP_Bubbles from "../../../../effect/MP_Bubbles.mp3";

function VoteAnimationComponent(props) {
  useEffect(() => {
    var audio = new Audio(MP_Bubbles);
    audio.volume = 0.1;
    audio.play();
    setTimeout(() => audio.pause(), 3000);
  }, []);

  return (
    <div class="container_vote">
      <div class="base_vote">
        <div class="top-front_vote"></div>
        <div class="shadow_vote"></div>
        <div class="text_vote">vote</div>
      </div>
      <div class="top-top_vote"></div>
      <div class="top-top2_vote">
        <div class="slot3_vote"></div>
      </div>
      <div class="top-top3_vote">
        <div class="slot2_vote"></div>
      </div>
      <div class="ballot_vote"></div>
    </div>
  );
}

export default VoteAnimationComponent;
