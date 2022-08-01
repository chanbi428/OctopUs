import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import './SeatsRoom.css'

export default function SeatsRoom({seats, throne}) {
  console.log("room",seats, throne)
  return (
    <div className="row">
      <div id="leftside" className="offset-2 col-4">
        <div className="container col" style={{ opacity: seats[0].opa }}>
          <p>{seats[0].nickname}</p>
          {/* <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seats[0].nickname}</p>  */}
          {/* {throne[0].crown === 1 ? 
          <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seats[0].nickname}</p> 
          : <p>{seats[0].nickname}</p>} */}
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
        <div className="container col" style={{ opacity: seats[2].opa }}>
        <p>{seats[2].nickname}</p>
        {/* <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seats[2].nickname}</p>  */}
          {/* {throne[2].crown === 1 ? 
          <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seats[2].nickname}</p> 
          : <p>{seats[2].nickname}</p>} */}
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
        <div className="container col" style={{ opacity: seats[4].opa }}>
        <p>{seats[4].nickname}</p>
        {/* <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seats[4].nickname}</p>  */}
          {/* {throne[4].crown === 1 ? 
          <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seats[4].nickname}</p> 
          : <p>{seats[4].nickname}</p>} */}
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
        <div className="container col" style={{ opacity: seats[6].opa }}>
        <p>{seats[6].nickname}</p>
        {/* <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seats[6].nickname}</p>  */}
          {/* {throne[6].crown === 1 ? 
          <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seats[6].nickname}</p> 
          : <p>{seats[6].nickname}</p>} */}
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
      </div>
      <div id="rigntside" className="col-4 offset-2">
        <div className="container col" style={{ opacity: seats[1].opa }}>
        <p>{seats[1].nickname}</p>
        {/* <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seats[1].nickname}</p>  */}
          {/* {throne[1].crown === 1 ? 
          <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seats[1].nickname}</p> 
          : <p>{seats[1].nickname}</p>} */}
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
        <div className="container col" style={{ opacity: seats[3].opa }}>
        <p>{seats[3].nickname}</p>
        {/* <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seats[3].nickname}</p>  */}
          {/* {throne[3].crown === 1 ? 
          <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seats[3].nickname}</p> 
          : <p>{seats[3].nickname}</p>} */}
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
        <div className="container col" style={{ opacity: seats[5].opa }}>
        <p>{seats[5].nickname}</p>
        {/* <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seats[5].nickname}</p>  */}
          {/* {throne[5].crown === 1 ? 
          <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seats[5].nickname}</p> 
          : <p>{seats[5].nickname}</p>} */}
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
        <div className="container col" style={{ opacity: seats[7].opa }}>
        <p>{seats[7].nickname}</p>
        {/* <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seats[7].nickname}</p>  */}
          {/* {throne[7].crown === 1 ? 
          <p><FontAwesomeIcon icon={faCrown} className="crown"/> {seats[7].nickname}</p> 
          : <p>{seats[7].nickname}</p>} */}
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
