import axios from "axios";
import "./RoomListItem.css";
import { useState } from "react";
import { useSelector } from "react-redux";

function RoomListItem({ item }) {
  const { userInfo } = useSelector((state) => state.user);
  const [roomPwIn, setRoomPwIn] = useState("");
  const handleRoomPwIn = (e) => {
    setRoomPwIn(e.target.value);
  };
  const onClickEnterRoom = (e) => {
    e.preventDefault();

    if (item.gameStatus === "true") {
      alert("이미 게임중입니다!");
    } else if (item.personNum >= item.personLimit) {
      alert("방 인원이 꽉 찼습니다.");
    } else if (item.private && item.roomPw !== roomPwIn) {
      alert("비밀번호를 정확히 입력해주세요.");
    } else {
      let userList = item.userList.split(",");
      console.log(userList); 
      userList[userList.indexOf("")] = userInfo.userName;
      console.log(userList);
      const personNum = item.personNum + 1;
      const data = {
        roomChief: item.roomChief,
        private: item.private,
        roomName: item.roomName,
        personLimit: item.personLimit,
        personNum: personNum,
        roomPw: item.roomPw,
        gameTime: item.gameTime,
        userList: userList.join(),
        roomId: item.roomId,
      };
      axios
        .put("http://localhost:8080/rooms", JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res) => {
          console.log(res);
          document.location.href = `https://localhost:3000/${item.roomId}`;
          console.log(document.location.pathname)
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="col">
      <div
        className="main-page__room-list"
        style={{ backgroundColor: item.gameStatus ? "#e0e0d8" : "#fdfcdc" }}
      >
        <div className="card-body">
          <div className="RoomHeader">
            <p>{item.idx}</p>
            <p>
              {item.personNum} / {item.personLimit}
            </p>
          </div>
          <h5 className="card-title">
            {item.roomName} {item.isPrivate}
          </h5>
          <div className="RoomFooter">
            <div>{item.private && <p className="RoomPrivate">🔐</p>}</div>
            <div>
              {item.private && (
                <input
                  type="passwordIn"
                  name="room_pw_in"
                  value={roomPwIn}
                  onChange={handleRoomPwIn}
                  className="Input"
                />
              )}
            </div>
            {item.gameStatus ? (
              <button className="main-page__room-list-btn" disabled>
                게임중
              </button>
            ) : (
              <button
                className="main-page__room-list-btn"
                onClick={onClickEnterRoom}
              >
                게임시작
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomListItem;
