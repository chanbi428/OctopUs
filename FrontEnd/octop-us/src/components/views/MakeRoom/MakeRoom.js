import Card from "../../Card/Card";
import { useState } from "react";
import axios from "axios";
import "./MakeRoom.css";

function MakeRoom() {
  const [roomName, setRoomName] = useState("");
  const [personLimit, setPersonLimit] = useState("6");
  const [gameTime, setGameTime] = useState("60");
  const [isPrivate, setIsPrivate] = useState("false");
  const [roomPw, setRoomPw] = useState("");
  let userList = [];

  const handleRoomName = (e) => {
    setRoomName(e.target.value);
  };
  const handlePersonLimit = (e) => {
    setPersonLimit(e.target.value);
  };
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
    if (personLimit === "6") {
      userList = ["currentUser", "", "", "", "", ""];
    } else {
      userList = ["currentUser", "", "", "", "", "", "", ""];
    }

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
      roomChief: "host1",
      isPrivate: isPrivate,
      roomName: roomName,
      personLimit: personLimit,
      roomPw: roomPw,
      gameTime: gameTime,
      userList: userList.join(),
    };

    if (roomName === "") {
      alert("방 이름을 입력해주세요!");
    } else if (personLimit === "") {
      alert("방 인원을 입력해주세요!");
    } else if (isPrivate === "true" && roomPw === "") {
      alert("방 비밀번호를 설정해주세요!");
    } else {
      if (data.roomChief === "") {
        console.log(data);
        axios
          .post("http://localhost:8080/rooms", JSON.stringify(data), {
            headers: {
              "Content-Type": `application/json`,
            },
          })
          .then((res) => {
            axios
              .get(`http://localhost:8080/rooms/detail/roomname/${roomName}`)
              .then((res) => {
                console.log(res.data[0].roomId);
                document.location.href = `http://localhost:3000/${res.data[0].roomId}`;
              });
          })
          .catch((err) => console.log(err));
      } else {
        console.log(data);
        axios
          .put("http://localhost:8080/rooms", JSON.stringify(data), {
            headers: {
              "Content-Type": `application/json`,
            },
          }) // 이후 이 부분이 필요한가 생각 중...
          .then((res) => {
            axios
              .get(`http://localhost:8080/rooms/detail/roomname/${roomName}`)
              .then((res) => {
                console.log(res.data[0].roomId);
              });
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div>
      <Card className="MakeRoom">
        <header className="CardHeader">
          <h2>방 설정</h2>
        </header>
        <main>
          <div className="CardBody">
            <label htmlFor="room_name">방 이름</label>
            <br />
            <input
              type="text"
              name="room_name"
              value={roomName}
              onChange={handleRoomName}
              className="Input"
            />
          </div>
          <div className="CardBody">
            <label htmlFor="person_limit">인원</label>
            <br />
            <input
              type="number"
              name="person_limit"
              value={personLimit}
              onChange={handlePersonLimit}
              className="Input"
            />
          </div>
          <div className="CardBody">
            회의 시간 <br />
            <label htmlFor="game_time_60">60</label>
            <input
              type="radio"
              id="game_time_60"
              value={60}
              onChange={handleGameTime}
              checked={gameTime === "60"}
              className="Radio"
            />
            <label htmlFor="game_time_90">90</label>
            <input
              type="radio"
              id="game_time_90"
              value={90}
              onChange={handleGameTime}
              checked={gameTime === "90"}
              className="Radio"
            />
            <label htmlFor="game_time_120">120</label>
            <input
              type="radio"
              id="game_time_120"
              value={120}
              onChange={handleGameTime}
              checked={gameTime === "120"}
              className="Radio"
            />
          </div>
          <div className="CardBody">
            공개 방 여부 <br />
            <label htmlFor="is_private_false">공개</label>
            <input
              type="radio"
              id="is_private_false"
              value={false}
              onChange={handleIsPrivate}
              checked={isPrivate === "false"}
              className="Radio"
            />
            <label htmlFor="is_private_true">비공개</label>
            <input
              type="radio"
              id="is_private_true"
              value={true}
              onChange={handleIsPrivate}
              checked={isPrivate === "true"}
              className="Radio"
            />
          </div>
          {isPrivate === "true" && (
            <div className="CardBody">
              <label htmlFor="room_pw">방 비밀번호 </label> <br />
              <input
                type="password"
                name="room_pw"
                value={roomPw}
                onChange={handleRoomPw}
                className="Input"
              />
            </div>
          )}
        </main>
        <button className="make-room__btn" onClick={createRoom}>
          방 생성하기
        </button>
      </Card>
    </div>
  );
}

export default MakeRoom;
