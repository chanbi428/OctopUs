import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import MakeRoom from "../MakeRoom/MakeRoom";
import RoomList from "./RoomList/RoomList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MainPage.css";

function MainPage() {
  const [roomInfo, setRoomInfo] = useState([]);

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get("http://localhost:8080/rooms")
      .then((res) => setRoomInfo(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onClickSearch = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8080/rooms/detail/roomnamelike/${search}`)
      .then((res) => setRoomInfo(res.data))
      .catch((err) => console.log(err));
  };

  const onClickSearchReset = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8080/rooms`)
      .then((res) => setRoomInfo(res.data))
      .catch((err) => console.log(err));
  };

  const onClickFastStart = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8080/rooms/find/faststart`)
      .then((res) => {
        axios
          .get(`http://localhost:8080/rooms/detail/roomid/${res.data}`)
          .then((item) => {
            console.log(item.data);
            let userList = item.data.userList.split(",");
            console.log(userList);
            userList[userList.indexOf("")] = "currentUser";
            console.log(userList);
            const personNum = item.data.personNum + 1;
            const data = {
              roomChief: "host1",
              isPrivate: item.data.isPrivate,
              roomName: item.data.roomName,
              personLimit: item.data.personLimit,
              personNum: personNum,
              roomPw: item.data.roomPw,
              gameTime: item.data.gameTime,
              userList: userList.join(),
              roomId: item.data.roomId,
            };
            axios
              .put("http://localhost:8080/rooms", JSON.stringify(data), {
                headers: {
                  "Content-Type": `application/json`,
                },
              })
              .then((res) => {
                console.log(res);
                document.location.href = `http://localhost:3000/${item.data.roomId}`;
                // console.log(document.location.pathname)
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="MainPage container">
      <div className="MyInfo">
        {userInfo ? <p>{userInfo.userName}</p> : <p>대충 유저 정보</p>}
      </div>
      <div className="MainBody">
        <div className="Left">
          <h1 style={{ height: "100px" }}>로고</h1>
          <MakeRoom />
        </div>
        <div className="Right">
          <div className="SearchBar">
            <input
              type="text"
              value={search}
              onChange={onChangeSearch}
              className="Input"
            />
            <button onClick={onClickSearch}>검색</button>
            <button onClick={onClickSearchReset}>초기화</button>
          </div>
          <RoomList roomInfo={roomInfo} />
        </div>
      </div>
      <div className="MainWebcam">
        <p>대충 웹캠 조절</p>
      </div>
      <div className="MainFooter">
        <div>
          <button className="QuickStart" onClick={onClickFastStart}>
            빠른시작
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
