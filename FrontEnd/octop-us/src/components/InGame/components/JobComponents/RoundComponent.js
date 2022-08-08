import {React, useState} from 'react';
import "../../../Card/Card";
import '../../../../App.css';
import FishingStater from '../../../MiniGame/FishGame/FishingStarter';
import SharkGame from '../../../MiniGame/SharkGame/SharkGame';

function RoundComponent(props) {
    return (
        <div className="App">
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