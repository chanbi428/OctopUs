import { React, useState, useRef } from "react";
import "./InGame.css";
import WaitingRoomPage from "./components/WaitingRoomPage/WaitingRoomPage";
import OpenViduComponent from "./openVidu/OpenViduComponent";
import ShowRoom from "./components/WaitingRoomPage/ShowRoom";

const InGame = () => {
  const [page, setPage] = useState(0);

  const clickBtn = () => {
    console.log("clickBtn");
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
