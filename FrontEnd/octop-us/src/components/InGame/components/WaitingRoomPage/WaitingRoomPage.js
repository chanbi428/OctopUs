import React, { useState, useEffect } from "react";
import axios from "axios";
import SeatsRoom from "./SeatsRoom";
import "./WaitingRoom.css";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  updateUserList,
  updateRoomId,
  updateRoomChief,
  updatePersonNum,
  updateIsPrivate,
  updateRoomPw,
  updateGameTime,
} from "../../../../features/waiting/waitSlice";
import { BASE_URL } from "../../../../api/BASE_URL";
import { resetGamer } from "../../../../features/gamer/gamerSlice";
import Swal from "sweetalert2";

export default function WaitingRoomPage(props) {
  const [roomInfo, setRoomInfo] = useState({
    gameStatus: false,
    gameTime: "",
    idx: "",
    personLimit: "",
    personNum: "",
    private: false,
    roomChief: "",
    roomId: "",
    roomName: "",
    roomPw: "",
    userList: ["", "", "", "", "", "", "", ""],
  });
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
  const { userList } = useSelector((state) => state.wait);
  const { roomChief } = useSelector((state) => state.wait);
  const dispatch = useDispatch();

  // 방 입장 시 데이터 받아옴
  useEffect(() => {
    dispatch(resetGamer());
    let pathName = document.location.pathname.replace("/", "");
    axios
      .get(`${BASE_URL}/rooms/detail/roomid/${pathName}`)
      .then((res) => {
        let room = res.data;
        const tmp = room.userList.split(",");
        room.userList = tmp;
        setRoomInfo(room);
        updateRoomInfo(room);
        dispatch(updateRoomId({ roomId: room.roomId }));
        dispatch(updateUserList(room.userList));
        dispatch(updateRoomChief({ roomChief: room.roomChief }));
        dispatch(updatePersonNum({ personNum: room.personNum }));
        dispatch(updateIsPrivate({ isPrivate: room.private }));
        dispatch(updateRoomPw({ roomPw: room.roomPw }));
        dispatch(updateGameTime({ gameTime: room.gameTime }));
      })
      .catch((error) => console.log(error));
  }, []);

  const updateRoomInfo = (data) => {
    setRoomInfo({
      gameStatus: data.gameStatus,
      gameTime: data.gameTime,
      idx: data.idx,
      personLimit: data.personLimit,
      personNum: data.personNum,
      private: data.private,
      roomChief: data.roomChief,
      roomId: data.roomId,
      roomName: data.roomName,
      roomPw: data.roomPw,
      userList: data.userList,
    });
  };

  // 유저 목록이 변경되면 문어 자리 다시 앉히고 다시 왕관 배정
  useEffect(() => {
    if (roomInfo.userList !== ["", "", "", "", "", "", "", ""]) {
      sitRoom(seats);
      getCrown(throne);
    }
  }, [userList, roomChief]);

  const sitRoom = (seats) => {
    let sit = seats;
    for (let i = 0; i < 8; i++) {
      if (userList[i] === "") {
        sit[i] = {
          nickname: "",
          opa: 0,
        };
      } else {
        if (userList[i] !== sit[i].nickname) {
          sit[i] = {
            nickname: userList[i],
            opa: 1,
          };
        }
      }
    }
    setSeats(sit);
  };

  const getCrown = () => {
    let crown = throne;
    for (let j = 0; j < 8; j++) {
      if (userList[j] === roomChief) {
        crown[j] = {
          crown: 1,
        };
      } else {
        crown[j] = {
          crown: 0,
        };
      }
    }
    setThrone(crown);
  };

  const exitRoom = () => {
    Swal.fire({
      icon: "question",
      text: "방에서 나가시겠습니까?",
      background: "#fdfcdc",
      showCancelButton: true,
      confirmButtonColor: "#f4d35e",
      cancelButtonColor: "#f4d35e",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      color: "black",
      customClass: {
        confirmButton: "swalBtnColor",
        cancelButton: "swalBtnColor",
        popup: "popUp",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        props.setPlayFalse();
        props.clickExitBtn();
      }
    });
  };

  return (
    <div>
      <nav>
        <div className="waitingroom_title">{roomInfo.roomName}</div>
        <button onClick={exitRoom} className="waiting-page__exit-btn">
          방 나가기
        </button>
      </nav>
      <section>
        <SeatsRoom seatInfo={seats} throneInfo={throne} />
      </section>
    </div>
  );
}
