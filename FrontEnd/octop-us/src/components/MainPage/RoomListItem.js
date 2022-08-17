import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL, CLIENT_URL } from "../../api/BASE_URL";
import axios from "axios";
import "./RoomListItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import MP_btn1 from "../../effect/MP_btn1.mp3";
import Swal from "sweetalert2";

function RoomListItem({ item, pauseBgmAudio }) {
  const { userInfo } = useSelector((state) => state.user);
  const [roomPwIn, setRoomPwIn] = useState("");
  const handleRoomPwIn = (e) => {
    setRoomPwIn(e.target.value);
  };
  const onClickEnterRoom = (e) => {
    var audio = new Audio(MP_btn1);
    audio.play();
    e.preventDefault();

    if (item.gameStatus === "true") {
      Swal.fire({
        icon: "warning",
        title: "입장 실패",
        text: "이미 게임중입니다.",
        background: "#fdfcdc",
        confirmButtonColor: "#f4d35e",
        color: "black",
        customClass: {
          confirmButton: "swalBtnColor",
          popup: "popUp",
        },
      });
      //alert("이미 게임중입니다!");
    } else if (item.personNum >= item.personLimit) {
      Swal.fire({
        icon: "warning",
        title: "입장 실패",
        text: "방 인원이 꽉 찼습니다.",
        background: "#fdfcdc",
        confirmButtonColor: "#f4d35e",
        color: "black",
        customClass: {
          confirmButton: "swalBtnColor",
          popup: "popUp",
        },
      });
      //alert("방 인원이 꽉 찼습니다.");
    } else if (item.private && item.roomPw !== roomPwIn) {
      Swal.fire({
        icon: "warning",
        title: "입장 실패",
        text: "비밀번호를 정확히 입력해주세요.",
        background: "#fdfcdc",
        confirmButtonColor: "#f4d35e",
        color: "black",
        customClass: {
          confirmButton: "swalBtnColor",
          popup: "popUp",
        },
      });
      //alert("비밀번호를 정확히 입력해주세요.");
    } else {
      joinRoom();
      // let userList = item.userList.split(",");
      // console.log(userList);
      // userList[userList.indexOf("")] = userInfo.userName;
      // console.log(userList);
      // const personNum = item.personNum + 1;
      // const data = {
      //   roomChief: item.roomChief,
      //   private: item.private,
      //   roomName: item.roomName,
      //   personLimit: item.personLimit,
      //   personNum: personNum,
      //   roomPw: item.roomPw,
      //   gameTime: item.gameTime,
      //   userList: userList.join(),
      //   roomId: item.roomId,
      // };
      // axios
      //   .put(`${BASE_URL}/rooms`, JSON.stringify(data), {
      //     headers: {
      //       "Content-Type": `application/json`,
      //     },
      //   })
      //   .then((res) => {
      //     pauseBgmAudio();
      //     console.log(res);
      //     document.location.href = `${CLIENT_URL}/${item.roomId}`;
      //     console.log(document.location.pathname);
      //   })
      //   .catch((err) => console.log(err));
    }
  };
  async function joinRoom(){
    let {data} = await axios.get(`/rooms/detail/roomid/${item.roomId}`);
    const roomInfo = data;
    console.log("RoomListItem roomInfo : "+roomInfo);
    let userList = roomInfo.userList.split(",");
    console.log(userList);
    userList[userList.indexOf("")] = userInfo.userName;
    console.log(userList);
    const personNum = roomInfo.personNum + 1;
    data = {
      roomChief: roomInfo.roomChief,
      private: roomInfo.private,
      roomName: roomInfo.roomName,
      personLimit: roomInfo.personLimit,
      personNum: personNum,
      roomPw: roomInfo.roomPw,
      gameTime: roomInfo.gameTime,
      userList: userList.join(),
      roomId: roomInfo.roomId,
    };
    axios
      .put(`${BASE_URL}/rooms`, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        pauseBgmAudio();
        console.log(res);
        navigate(`/${item.roomId}`);
        // console.log(document.location.pathname);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="col room-list__btn">
      <div
        className={item.gameStatus ? "room-list__container" : "room-list__container"}
        style={{ backgroundColor: item.gameStatus ? "#13293d" : "#00afb9" }}
      >
        <div className="room-list__left">
          <div className={item.gameStatus ? "room-list__idx-1" : "room-list__idx-2"}>
            {item.idx}
          </div>
          <FontAwesomeIcon
            icon={faLock}
            className={item.private ? "room-list__locked" : "room-list__unlocked"}
          />
        </div>
        <div className="room-list__middle">
          <h5 className="room-list__title">{item.roomName}</h5>
          <div>
            <input
              type="passwordIn"
              name="room_pw_in"
              value={roomPwIn}
              onChange={handleRoomPwIn}
              className={item.private ? "room-list__password" : "room-list__password-opacity"}
            />
          </div>
        </div>
        <div className="room-list__right">
          <div className="room-list__info">
            <span>
              {item.personNum} / {item.personLimit}
            </span>
            <span>{item.gameTime}초</span>
          </div>
          {item.gameStatus ? (
            <button className="main-page__room-list-btn" disabled>
              게임중
            </button>
          ) : (
            <button className="main-page__room-list-btn" onClick={onClickEnterRoom}>
              게임입장
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomListItem;
