import {React, useState} from 'react';
import "./VoteAnimationComponent.scss"
import Card from "../../../Card/Card"

function VoteAnimationComponent(props) {
    return (
      <div class="container_vote">
        <div class="base_vote">
          <div class="top-front_vote"></div>
          <div class="shadow_vote"></div>
          <div class="text_vote">vote</div>
        </div>
        <div class="top-top_vote">
        </div>
        <div class="top-top2_vote">
          <div class="slot3_vote"></div>
        </div>
        <div class="top-top3_vote">
          <div class="slot2_vote"></div>
        </div>
        <div class="ballot_vote">
        </div>
      </div>
    )
}

export default VoteAnimationComponent;