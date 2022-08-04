import { React, useState } from "react";
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

  return (
    <div className="screen">
      <div>
        {page === 0 && <WaitingRoomPage />}

        <div style={{ display: "flex" }}>
          {page === 0 && (
            <div>
              <div className="waiting-page__lower container">
                <div className="waiting-page__room-setting">
                  <ShowRoom />
                </div>
              </div>
            </div>
          )}
          <div>
            <OpenViduComponent onClickBtn={clickBtn} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default InGame;
