import React, { useState, useEffect } from "react";
import axios from "axios";
import SeatsRoom from "./SeatsRoom";
import Card from "../Card/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "./WaitingRoom.css";
import ShowRoom from "./ShowRoom";
import { useSelector } from "react-redux";
import { exitRoom } from "../../features/waiting/exitRoom"

export default function WaitingRoomPage() {
  const [roomInfo, setRoomInfo] = useState([{
    gameStatus : false,
    gameTime : "",
    idx : "",
    personLimit : "",
    personNum : "",
    private : false,
    roomChief : "",
    roomId : "",
    roomName : "",
    roomPw : "",
    userList : [" ", " ", " ", " ", " ", " ", " ", " "]
  }])
  let [seats, setSeats] = useState([
    { nickname: "", opa: 0 },
    { nickname: "", opa: 0 },
    { nickname: "", opa: 0 },
    { nickname: "", opa: 0 },
    { nickname: "", opa: 0 },
    { nickname: "", opa: 0 },
    { nickname: "", opa: 0 },
    { nickname: "", opa: 0 },
  ]);
  let [throne, setThrone] = useState([
    { crown: 0 },
    { crown: 0 },
    { crown: 0 },
    { crown: 0 },
    { crown: 0 },
    { crown: 0 },
    { crown: 0 },
    { crown: 0 },
  ]);
  const { userInfo } = useSelector((state) => state.user);

  // 방 입장 시 데이터 받아옴
  useEffect(() => {
    let pathName = document.location.pathname.replace("/", "");
    console.log(pathName);
    axios
      .get(`http://localhost:8080/rooms/detail/roomid/${pathName}`)
      .then((res) => {
        console.log(res.data);
        let room = res.data
        console.log("room data",room)
        const tmp = room.userList.split(",");
        setRoomInfo((roomInfo) => {
          room.userList = tmp
          return room
        })
        console.log(roomInfo)
      })
      .catch((error) => console.log(error));
  }, []);

  // 유저 목록이 변경되면 문어 자리 다시 앉히고 다시 왕관 배정
  useEffect(() => {
    if (roomInfo.userList !== ["", "", "", "", "", "", "", ""] || roomInfo.userList !== [" ", " ", " ", " ", " ", " ", " ", " "]) {
      sitRoom(seats);
      getCrown(throne);
    }
    console.log(seats, throne)
  }, [roomInfo.userList]);

  const sitRoom = (seats) => {
    let sit = seats;
    console.log("목록",roomInfo.userList)
    console.log("seats", seats)
    for (let i = 0; i < roomInfo.personLimit; i++) {
      if (roomInfo.userList[i] === " ") {
        sit[i] = {
          nickname: " ",
          opa: 0
        };
      } else {
        if (roomInfo.userList[i] !== sit[i].nickname) {
          sit[i] = {
            nickname: roomInfo.userList[i],
            opa: 1
          };
        };
      };
    };
    setSeats(sit);
  };

  const getCrown = () => {
    console.log("throne",throne)
    let crown = throne;
    for (let j = 0; j < roomInfo.personLimit; j++) {
      if (roomInfo.userList[j] === roomInfo.roomChief) {
        crown[j] = {
          crown: 1,
        };
      } else {
        crown[j] = {
          crown: 0,
        };
      };
    };
    setThrone(crown);
  };

  const exitBtnHandler = () => {
    exitRoom(roomInfo.roomId, userInfo.userName);
  };
  // onClickStart 함수 분리 => 인자(roomId, userName)
  return (
    <div>
      <nav>
        <p>대기실 페이지</p>
        <button onClick={exitBtnHandler} className="waiting-page__exit-btn">
          방 나가기
        </button>
      </nav>
      <section>
        <SeatsRoom seatInfo={seats} throneInfo={throne}/>
      </section>
      <div className="waiting-page__lower container">
        <div className="waiting-page__room-setting">
          <ShowRoom />
        </div>
      </div>
    </div>
  );
};