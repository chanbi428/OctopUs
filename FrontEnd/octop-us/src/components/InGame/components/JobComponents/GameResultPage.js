import axios from 'axios';
import {React, useState} from 'react';
import { useEffect } from 'react';

import { BASE_URL } from "../../../../api/BASE_URL";
import './RoundComponent.css';

function GameResultComponent(props) {
  let pathName = document.location.pathname.replace("/", "");

  useEffect(() => {
    axios
      .delete(`${BASE_URL}/games/end/${pathName}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
  })
  
  return (
      <div>
        Game Result
    </div>
  )
}

export default GameResultComponent;