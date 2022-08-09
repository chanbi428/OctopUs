import {React, useState} from 'react';
import FishingStater from '../../../MiniGame/FishGame/FishingStarter';
import SharkGame from '../../../MiniGame/SharkGame/SharkGame';
import './RoundComponent.css';

function RoundComponent(props) {
  console.log("RoundComponent : " + props.gameNum)
    return (
        <div id="round-div">
        {props.gameNum === 1 && (
          <FishingStater/>
        )}
        {props.gameNum === 2 && (
          <SharkGame/>
        )}
      </div>
    )
}

export default RoundComponent;