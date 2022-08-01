import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SeatsRoom(props) {
  const [seats, setSeats] = useState([]);
  const [throne, setThrone] = useState([]);
  console.log(seats);

  return (
    <div className="row">
      <div id="leftside" className="offset-2 col-4">
        <div className="container col" style={{ opacity: seats[0].opacity }}>
          <p>{seats[0].nickname}</p>
          <p>
            <FontAwesomeIcon
              icon="fa-solid fa-crown"
              style={{ opacity: throne[0].crown }}
            />
          </p>
          {/* 폰트어썸으로 왕관 넣을 예정 */}
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
        <div className="container col" style={{ opacity: seats[2].opacity }}>
          <p>{seats[2].nickname}</p>
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
        <div className="container col" style={{ opacity: seats[4].opacity }}>
          <p>{seats[4].nickname}</p>
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
        <div className="container col" style={{ opacity: seats[6].opacity }}>
          <p>{seats[6].nickname}</p>
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
      </div>
      <div id="rigntside" className="col-4 offset-2">
        <div className="container col" style={{ opacity: seats[1].opacity }}>
          <p>{seats[1].nickname}</p>
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
        <div className="container col" style={{ opacity: seats[3].opacity }}>
          <p>{seats[3].nickname}</p>
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
        <div className="container col" style={{ opacity: seats[5].opacity }}>
          <p>{seats[5].nickname}</p>
          <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-octopus-animal-justicon-lineal-color-justicon.png" />
        </div>
        <div className="container col" style={{ opacity: seats[7].opacity }}>
          <p>{seats[7].nickname}</p>
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
