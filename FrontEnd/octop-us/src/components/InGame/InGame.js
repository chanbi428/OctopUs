import { React, useState, useRef, useEffect } from "react";
import "./InGame.css";
import axios from "axios";
import WaitingRoomPage from "./components/WaitingRoomPage/WaitingRoomPage";
import OpenViduComponent from "./openVidu/OpenViduComponent";
import ShowRoom from "./components/WaitingRoomPage/ShowRoom";
import RoundComponent from "./components/JobComponents/RoundComponent";
import { useLocation } from 'react-router-dom';

const InGame = () => {
  const [page, setPage] = useState(0);
  const [sessionName, setSessionName] = useState("SessionA");
  const [roomName, setRoomName] = useState("RoomA");
  const [hostName, setHostName] = useState("HostA");
  const [gameNum, setGameNum] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const tmpSessions = location.pathname !== undefined ? location.pathname : "SessionA";
    getRoomName();
    console.log("tmpRoomName : " + roomName);
    console.log("tmpSessions : " + tmpSessions);
    setSessionName(tmpSessions);
  },[location]);

  async function getRoomName() {
    const {data} = await axios.get(`/rooms/detail/roomid${location.pathname}`);
    console.log("parse Room data : "+JSON.stringify(data ));
    setRoomName(data.roomName);
    setHostName(data.roomChief);
  }
  const clickBtn = () => {
    console.log("clickBtn : " + sessionName);
    setSessionName(sessionName);
    setPage(1);
  };
  const clickBtnGame=(e)=>{
    console.log("before setInterval : " + e);
    setGameNum(0);
    const startTimer = setTimeout(() => {
      if(e === 1){
        clickBtnFish();
      }
      else if (e === 2){
        clickBtnShark();
      }
    }, 4000); // 여기 수정 v
    return () => clearTimeout(startTimer);
  }
  const clickBtnFish = (e) =>{
    setGameNum(1);
  };
  const clickBtnShark = (e) =>{
    setGameNum(2);
  };
  const chatRef = useRef()

  console.log("InGame : " + gameNum);
  return (
    <div className="screen">
      <div id="parent-div">
        {page === 0 && <WaitingRoomPage />}

        <div style={{ display: "flex" }}>
          {page === 0 && (
            <div>
              {/* 여기에 showRoom 옮기면 카드 이중으로 나타나는 거 사라집니다. */}
              <div className="waiting-page__lower container">
                <div className="waiting-page__room-setting">
                  <ShowRoom />
                </div>
              </div>
            </div>
          )}
          <div>
            <RoundComponent gameNum={gameNum}/>
            <OpenViduComponent onClickBtn={clickBtn} selectGame={clickBtnGame} sessionName={sessionName} roomName={roomName} ref={chatRef} host={hostName}/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InGame;
