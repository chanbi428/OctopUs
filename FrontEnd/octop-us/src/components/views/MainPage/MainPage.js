import MakeRoom from "../MakeRoom/MakeRoom";
import RoomList from "./RoomList/RoomList";
import SearchRoom from "./SearchRoom/SearchRoom";
import './MainPage.css'

function MainPage () {
  return (
    <div className="MainPage container">
      <div className="MyInfo">
        <p>대충 유저 정보</p>
      </div>
      <div className="MainBody">
        <div className="Left">
          <h1 style={{height : "100px"}}>로고</h1>
          <MakeRoom />
        </div>
        <div className="Right">
          <SearchRoom />
          <RoomList />
        </div>
      </div>
      <div className="MainWebcam">
          <p>대충 웹캠 조절</p>
      </div>     
      <div className="MainFooter">
        <div>
          <button className="QuickStart">빠른시작</button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;