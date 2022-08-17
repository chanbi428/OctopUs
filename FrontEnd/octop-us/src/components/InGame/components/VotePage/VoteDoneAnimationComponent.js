import { React, useEffect } from "react";
import "./VoteAnimationComponent.scss";

import MP_Bubbles from "../../../../effect/MP_Bubbles.mp3";
import MP_VoteResult from "../../../../effect/MP_VoteResult.mp3";

function VoteDoneAnimationComponent(props) {
  useEffect(() => {
    var audio = new Audio(MP_Bubbles);
    var audio2 = new Audio(MP_VoteResult);
    audio.play();
    setTimeout(() => {
      audio.pause();
      audio2.play();
    }, 2000);
  }, []);

  return (
    <div>
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
        <div class="ballot_vote_up">
          <div class="vote_result_page">
            <p class="result_title">투표 결과</p>
            <p class="result_name">{props.voteName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoteDoneAnimationComponent;
