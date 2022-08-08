import { React, useState, useRef, useEffect } from "react";
import "./InGame.css";
import axios from "axios";
import WaitingRoomPage from "./components/WaitingRoomPage/WaitingRoomPage";
import OpenViduComponent from "./openVidu/OpenViduComponent";
import ShowRoom from "./components/WaitingRoomPage/ShowRoom";
import { useLocation } from 'react-router-dom';

const InGame = () => {
  const [page, setPage] = useState(0);
  const [sessionName, setSessionName] = useState("SessionA");
  const [roomName, setRoomName] = useState("RoomA");

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
    // console.log("parse Room data : "+JSON.stringify(data ));
    setRoomName(data.roomName);
  }
  const clickBtn = () => {
    console.log("clickBtn : " + sessionName);
    setSessionName(sessionName);
    setPage(1);
  };

  const chatRef = useRef()

  return (
    <div className="screen">
      <div>
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
            <OpenViduComponent onClickBtn={clickBtn} sessionName={sessionName} roomName={roomName} ref={chatRef}/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InGame;
