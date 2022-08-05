import React from 'react';
import "../../../Card/Card";
import logo from '../../../../logo.svg';
import '../../../../App.css';
import FishingComponent from '../../../MiniGame/FishGame/FishingComponents';

function RoundComponent() {
    return (
        <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header> */}
        <FishingComponent/>
      </div>
    )
}

export default RoundComponent;