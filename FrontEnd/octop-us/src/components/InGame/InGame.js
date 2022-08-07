import { React, useState, useRef } from "react";
import "./InGame.css";
import WaitingRoomPage from "./components/WaitingRoomPage/WaitingRoomPage";
import OpenViduComponent from "./openVidu/OpenViduComponent";
import ShowRoom from "./components/WaitingRoomPage/ShowRoom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import exitRoom from "../../features/waiting/exitRoom";
import ClickStart from "../../features/waiting/ClickStart";

const InGame = () => {
  const [page, setPage] = useState(0);
  const userName = localStorage.getItem("userName")
  const navigate = useNavigate()
  const { roomId } = useSelector((state) => state.wait)
  const { userList } = useSelector((state) => state.wait)
  console.log("인게임 렌더링", roomId, userList )

  const clickBtn = () => {
    console.log("clickBtn");
    ClickStart(roomId, userList, userName)
    chatRef.current.ovref.current.gameNotice()
    setPage(1)
  };

  const chatRef = useRef()

  const clickExitBtn = () => {
    console.log(roomId)
    console.log("방 나가기 버튼 누르고 절차 시작") // 
    chatRef.current.ovref.current.exitNotice()
    exitRoom(roomId, userName)
    chatRef.current.leaveSession() 
    console.log("leave session 성공")
    navigate("/main")
    console.log("navigate로 방 나가기 완전 종료")
  };

  return (
    <div className="screen">
      <div>
        {page === 0 && <WaitingRoomPage 
        clickExitBtn={clickExitBtn}
        />}

        <div style={{ display: "flex" }}>
          {page === 0 && (
            <div>
              {/* 여기에 showRoom 옮기면 카드 이중으로 나타나는 거 사라집니다. */}
              <ShowRoom />
              {/* <div className="waiting-page__lower container">
                <div className="waiting-page__room-setting">
                  
                </div>
              </div> */}
            </div>
          )}
          <div>
            <OpenViduComponent 
            onClickBtn={clickBtn} 
            ref={chatRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default InGame;
