import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import SeatsRoom from "./SeatsRoom";
import "./WaitingRoom.css";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { updateUserList, updateRoomId } from "../../../../features/waiting/waitSlice"



export default function WaitingRoomPage(props) {
  const [roomInfo, setRoomInfo] = useState({
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
  })
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
  const { roomId } = useSelector((state) => state.wait)
  const { userList } = useSelector((state) => state.wait)
  const dispatch = useDispatch();

  // 방 입장 시 데이터 받아옴
  useEffect(() => {
    let pathName = document.location.pathname.replace("/", "");
    console.log(pathName);
    axios
      .get(`http://localhost:8080/rooms/detail/roomid/${pathName}`)
      .then((res) => {
        let room = res.data
        console.log("room data",room)
        const tmp = room.userList.split(",");
        room.userList = tmp
        setRoomInfo(room)
        console.log("set roomInfo", roomInfo)
        updateRoomInfo(room)
        console.log('update roomInfo', roomInfo)
        dispatch(updateRoomId({roomId : room.roomId}))
        console.log(room.userList)
        dispatch(updateUserList(room.userList))
        console.log("waitingroom useEffect 어디서 에러가 나나", roomId, userList)
      })
      .catch((error) => console.log(error));
  },[]);

  const updateRoomInfo = (data) => {
    setRoomInfo({
        gameStatus : data.gameStatus,
        gameTime : data.gameTime,
        idx : data.idx,
        personLimit : data.personLimit,
        personNum : data.personNum,
        private : data.private,
        roomChief : data.roomChief,
        roomId : data.roomId,
        roomName : data.roomName,
        roomPw : data.roomPw,
        userList : data.userList
      })
  }

  // 유저 목록이 변경되면 문어 자리 다시 앉히고 다시 왕관 배정
  useEffect(() => {
    if (roomInfo.userList !== ["", "", "", "", "", "", "", ""] || roomInfo.userList !== [" ", " ", " ", " ", " ", " ", " ", " "]) {
      sitRoom(seats);
      getCrown(throne);
    }
    console.log(seats, throne)
  }, [userList]);

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

  return (
    <div>
      <nav>
        <p>대기실 페이지</p>
        <button onClick={props.clickExitBtn} className="waiting-page__exit-btn">
          방 나가기
        </button>
      </nav>
      <section>
        <SeatsRoom seatInfo={seats} throneInfo={throne}/>
      </section>
    </div>
  ); 
};