import React, { useState, useEffect } from "react";
import axios from "axios";
import SeatsRoom from "./SeatsRoom";
import MakeRoom from "../MakeRoom/MakeRoom";
import Tmp2 from "../tmp2/components/VideoRoomComponent";
import Card from "../../Card/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "./WaitingRoom.css";
import ShowRoom from "./ShowRoom";
import { useSelector } from "react-redux";
import ChatComponent from "../tmp2/components/chat/ChatComponent";
import { exitRoom } from "../../../features/waiting/exitRoom"

export default function WaitingRoom() {
  const [gameStatus, setGameStatus] = useState(false);
  const [gameTime, setGameTime] = useState("");
  const [idx, setIdx] = useState("");
  const [personLimit, setPersonLimit] = useState("");
  const [personNum, setPersonNum] = useState("");
  const [isPrivate, setIsPrivate] = useState("");
  const [roomChief, setRoomChief] = useState("");
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomPw, setRoomPw] = useState("");
  const [userList, setUserList] = useState([]);
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
        // console.log(userInfo.userName)
        const tmp = res.data.userList.split(",");
        // console.log(tmp);
        updateRoomInfo(
          res.data.gameStatus,
          res.data.gameTime,
          res.data.idx,
          res.data.personLimit,
          res.data.personNum,
          res.data.private,
          res.data.roomChief,
          res.data.roomId,
          res.data.roomName,
          res.data.roomPw,
          tmp
        );
        sitRoom();
        getCrown();
        console.log(seats, throne);
        setTimeout(console.log(seats, userList), 1000);
      })
      .catch((error) => console.log(error));
  }, []);

  // 유저 목록이 변경되면 문어 자리 다시 앉히고 다시 왕관 배정
  useEffect(() => {
    sitRoom();
    getCrown();
    console.log(seats, throne)
  }, [userList]);

  const sitRoom = (seats) => {
    let sit = seats;
    console.log("목록",userList)
    console.log("seats", seats)
    for (let i = 0; i < personLimit; i++) {
      if (userList[i] === " " || userList[i] === "") {
        sit[i] = {
          nickname: " ",
          opa: 0
        };
      } else {
        if (userList[i] !== sit[i].nickname) {
          sit[i] = {
            nickname: userList[i],
            opa: 1
          };
        }
      }
    }
    return sit
    // setSeats(sit);
  };

  const getCrown = () => {
    console.log("throne",throne)
    let crown = [...throne];
    for (let j = 0; j < personLimit; j++) {
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

  const exitBtnHandler = () => {
    exitRoom(roomId, userInfo.userName)
  }

  const updateRoomInfo = (
    gameStatus,
    gameTime,
    idx,
    personLimit,
    personNum,
    isPrivate,
    roomChief,
    roomId,
    roomName,
    roomPw,
    userList
  ) => {
    setGameStatus(gameStatus);
    setGameTime(gameTime);
    setIdx(idx);
    setPersonLimit(personLimit);
    setPersonNum(personNum);
    setIsPrivate(isPrivate);
    setRoomChief(roomChief);
    setRoomId(roomId);
    setRoomName(roomName);
    setRoomPw(roomPw);
    setUserList(userList);
    console.log(
      gameStatus,
      gameTime,
      idx,
      personLimit,
      personNum,
      isPrivate,
      roomChief,
      roomId,
      roomName,
      roomPw,
      userList
    );
  };

  const onClickStart = async () => {
    //6인 이상 시작 조건문 넣기
    const getRoomInfo = await axios.get(
      `http://localhost:8080/rooms/detail/roomid/${roomId}`
    );
    // .then((res)=> {
    //   console.log(res.data)
    //   const users = res.data.userList.split(",");
    // })
    console.log(getRoomInfo);
    const users = getRoomInfo.userList.split(",");
    for (let user of users) {
      let cnt = 0;
      if (user === "") {
        cnt = cnt + 1;
        users.splice(users.indexOf(user), 1);
      }
    }
    const data = {
      users: users,
      roomId: getRoomInfo.roomId,
    };
    await axios.post("http://localhost:8080/games", data, {
      headers: {
        "Content-Type": `application/json`,
      },
    });
    // 소켓 게임 시작 알림
    await sendMessage();
    // 직업을 가져온다
    await axios
      .get(`http://localhost:8080/gamer/${"userInfo.userName"}`)
      .then((res) => {
        const inGameJob = res.data.gameJob;
        console.log(inGameJob);
        // setGameJob = inGameJob
        // 리덕스? 스테이트?
        axios.put(`http://localhost:8080/rooms/update/status/start/${roomId}`, {
          headers: {
            "Content-Type": `application/json`,
          },
        });
        // 밤으로 넘어간다 => 소켓? 링크인가
      });
  };

  const sendMessage = () => {
    const data = {
      type: "system",
      sender: "FE",
      senderName: "server",
      gameRange: "ingame",
      dataType: "order",
      data: {
        datatype: "slot",
        data: "night",
      },
    };
    this.props.user.getStreamManager().stream.session.signal({
      data: JSON.stringify(data),
      type: "chat",
    });
    console.log("sendMessage : " + JSON.stringify(data));
    // this.sendMessage(JSON.stringify(data));
    // console.log(this.state.message);
    // if (this.props.user && this.state.message) {
    //     let message = this.state.message.replace(/ +(?= )/g, '');
    //     if (message !== '' && message !== ' ') {
    //         const data = {
    //             type : 'system',
    //             sender : 'FE',
    //             senderName : 'server',
    //             gameRange : 'ingame',
    //             dataType : 'order',
    //             data : {
    //                 datatype : "slot",
    //                 data : "night"
    //             }
    //         }
    //         this.props.user.getStreamManager().stream.session.signal({
    //             data: JSON.stringify(data),
    //             type: 'chat',
    //         });
    //         console.log("sendMessage : " + JSON.stringify(data));
    //         // this.sendMessage(JSON.stringify(data));
    //     }
    // }
    this.setState({ message: "" });
  };

  return (
    <div>
      <nav>
        <p>대기실 페이지</p>
        <button onClick={exitBtnHandler} className="waiting-page__exit-btn">
          방 나가기
        </button>
      </nav>
      <section>
        {/* <img
          src="images/waitingpage.png"
          alt="이미지가 없다"
          className="waiting-page__img"
        /> */}
        <SeatsRoom seatInfo={seats} throneInfo={throne}/>
      </section>
      <div className="waiting-page__lower container">
        <div className="waiting-page__room-setting">
          <ShowRoom />
        </div>
        <Tmp2 />
      </div>
    </div>
  );
}
