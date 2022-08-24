import Card from "../Card/Card";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL, CLIENT_URL } from "../../api/BASE_URL";
import axios from "axios";
import "./MakeRoom.css";

function MakeRoom({ pauseBgmAudio }) {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [gameTime, setGameTime] = useState("60");
  const [isPrivate, setIsPrivate] = useState("0");
  const [roomPw, setRoomPw] = useState("");
  let userList = [];
  const { userInfo } = useSelector((state) => state.user);

  const handleRoomName = (e) => {
    setRoomName(e.target.value);
  };
  // const handlePersonLimit = (e) => {
  //   setPersonLimit(e.target.value);
  // };
  const handleGameTime = (e) => {
    setGameTime(e.target.value);
  };
  const handleIsPrivate = (e) => {
    setIsPrivate(e.target.value);
  };
  const handleRoomPw = (e) => {
    setRoomPw(e.target.value);
  };
  const createRoom = () => {
    pauseBgmAudio();
    userList = [userInfo.userName, "", "", "", "", "", "", ""];
    const data = {
      // type : 'system',
      // sender : 'FE',
      // senderName : 'user1',
      // gameranage : 'outgame',
      // datatype : 'makeroom',
      // data : {
      //   'roomName': roomName,
      //   'personLimit': personLimit,
      //   'gameTime': gameTime,
      //   'isPrivate': isPrivate,
      //   'roomPw': roomPw,
      //   'roomChief': 'aa'
      // }
      roomChief: userInfo.userName,
      private: isPrivate === "1" ? true : false,
      roomName: roomName,
      personLimit: "8",
      roomPw: roomPw,
      gameTime: gameTime,
      userList: userList.join(),
    };

    if (roomName === "") {
      alert("방 이름을 입력해주세요!");
    } else if (isPrivate === "1" && roomPw === "") {
      alert("방 비밀번호를 설정해주세요!");
    } else {
      if (data.roomChief === userInfo.userName) {
        axios
          .post(`${BASE_URL}/rooms`, JSON.stringify(data), {
            headers: {
              "Content-Type": `application/json`,
            },
          })
          .then((res) => {
            navigate(`/${res.data.roomId}`);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .put(`${BASE_URL}/rooms`, JSON.stringify(data), {
            headers: {
              "Content-Type": `application/json`,
            },
          }) // 이후 이 부분이 필요한가 생각 중...
          .then((res) => {
            axios.get(`${BASE_URL}/rooms/detail/roomname/${roomName}`);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <Card className="MakeRoom">
      <div className="make-room__contents">
        <div className="make-room__header">
          <span>MAKE ROOM</span>
        </div>
        <div className="make-room__settings">
          <div className="make-room__card-body">
            <span htmlFor="room_name" className="make-room__title">
              방 제목
            </span>
            <input
              type="text"
              name="room_name"
              value={roomName}
              onChange={handleRoomName}
              maxLength={20}
              className="make-room__input"
              autoFocus
              placeholder="방 제목을 입력하세요."
            />
          </div>
          <div className="make-room__card-body">
            <span className="make-room__title">회의 시간</span>
            <div className="make-room__timesettings">
              <div className="make-room__timesetting">
                <input
                  type="radio"
                  id="game_time_60"
                  value={60}
                  onChange={handleGameTime}
                  checked={gameTime === "60"}
                />
                <label htmlFor="game_time_60">60초</label>
              </div>
              <div className="make-room__timesetting">
                <input
                  type="radio"
                  id="game_time_90"
                  value={90}
                  onChange={handleGameTime}
                  checked={gameTime === "90"}
                />
                <label htmlFor="game_time_90">90초</label>
              </div>
              <div className="make-room__timesetting">
                <input
                  type="radio"
                  id="game_time_120"
                  value={120}
                  onChange={handleGameTime}
                  checked={gameTime === "120"}
                />
                <label htmlFor="game_time_120">120초</label>
              </div>
            </div>
          </div>
          <div className="make-room__card-body">
            <span className="make-room__title">공개 방 설정</span>
            <div>
              <input
                type="radio"
                id="is_private_false"
                value={0}
                onChange={handleIsPrivate}
                checked={isPrivate === "0"}
                className="Radio"
              />
              <label htmlFor="is_private_false">공개</label>
            </div>
            <div>
              <input
                type="radio"
                id="is_private_true"
                value={1}
                onChange={handleIsPrivate}
                checked={isPrivate === "1"}
                className="Radio"
              />
              <label htmlFor="is_private_true">비공개</label>
            </div>
          </div>
          <div
            className="make-room__card-body"
            style={{ visibility: isPrivate === "1" ? "visible" : "hidden" }}
          >
            <label htmlFor="room_pw">방 비밀번호</label>
            <input
              type="password"
              name="room_pw"
              value={roomPw}
              onChange={handleRoomPw}
              className="make-room__password-input"
              autoFocus
              placeholder="방 비밀번호를 입력하세요."
            />
          </div>
        </div>
      </div>
      <button className="make-room__btn" onClick={createRoom}>
        방 생성하기
      </button>
    </Card>
  );
}

export default MakeRoom;
