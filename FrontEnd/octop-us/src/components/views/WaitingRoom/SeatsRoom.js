import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import './SeatsRoom.css'

export default function SeatsRoom(props) {
  let [seatInfo, setSeatInfo] = useState(props.seatInfo)
  let [throneInfo, setThroneInfo] = useState(props.throneInfo)
  console.log("room",seatInfo, throneInfo)
  return (
    <div className="row">
      <div id="leftside" className="offset-2 col-4">
        <div className="container col" style={{ opacity: seatInfo[0].opa }}>
          <p>{seatInfo[0].nickname}</p>
          {/* <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seatInfo[0].nickname}</p>  */}
          {/* {throneInfo[0].crown === 1 ? 
          <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seatInfo[0].nickname}</p> 
          : <p>{seatInfo[0].nickname}</p>} */}
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
        <div className="container col" style={{ opacity: seatInfo[2].opa }}>
        <p>{seatInfo[2].nickname}</p>
        {/* <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seatInfo[2].nickname}</p>  */}
          {/* {throneInfo[2].crown === 1 ? 
          <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seatInfo[2].nickname}</p> 
          : <p>{seatInfo[2].nickname}</p>} */}
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
        <div className="container col" style={{ opacity: seatInfo[4].opa }}>
        <p>{seatInfo[4].nickname}</p>
        {/* <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seatInfo[4].nickname}</p>  */}
          {/* {throneInfo[4].crown === 1 ? 
          <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seatInfo[4].nickname}</p> 
          : <p>{seatInfo[4].nickname}</p>} */}
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
        <div className="container col" style={{ opacity: seatInfo[6].opa }}>
        <p>{seatInfo[6].nickname}</p>
        {/* <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seatInfo[6].nickname}</p>  */}
          {/* {throneInfo[6].crown === 1 ? 
          <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seatInfo[6].nickname}</p> 
          : <p>{seatInfo[6].nickname}</p>} */}
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
      </div>
      <div id="rigntside" className="col-4 offset-2">
        <div className="container col" style={{ opacity: seatInfo[1].opa }}>
        <p>{seatInfo[1].nickname}</p>
        {/* <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seatInfo[1].nickname}</p>  */}
          {/* {throneInfo[1].crown === 1 ? 
          <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seatInfo[1].nickname}</p> 
          : <p>{seatInfo[1].nickname}</p>} */}
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
        <div className="container col" style={{ opacity: seatInfo[3].opa }}>
        <p>{seatInfo[3].nickname}</p>
        {/* <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seatInfo[3].nickname}</p>  */}
          {/* {throneInfo[3].crown === 1 ? 
          <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seatInfo[3].nickname}</p> 
          : <p>{seatInfo[3].nickname}</p>} */}
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
        <div className="container col" style={{ opacity: seatInfo[5].opa }}>
        <p>{seatInfo[5].nickname}</p>
        {/* <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seatInfo[5].nickname}</p>  */}
          {/* {throneInfo[5].crown === 1 ? 
          <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seatInfo[5].nickname}</p> 
          : <p>{seatInfo[5].nickname}</p>} */}
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
        <div className="container col" style={{ opacity: seatInfo[7].opa }}>
        <p>{seatInfo[7].nickname}</p>
        {/* <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seatInfo[7].nickname}</p>  */}
          {/* {throneInfo[7].crown === 1 ? 
          <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seatInfo[7].nickname}</p> 
          : <p>{seatInfo[7].nickname}</p>} */}
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
      </div>
      <a target="_blank" href="https://icons8.com/icon/59DW1U5zYwbI/octopus">
        Octopus icon by Icons8
      </a>
      <a target="_blank" href="https://icons8.com/icon/fcj8w2EL5ShF/octopus">
        Octopus icon by Icons8
      </a>
    </div>
  );
}
