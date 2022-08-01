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
      <div className="main-page__user-info">
        {userInfo ? <p>{userInfo.userName} 님 안녕하세요!</p> : <p>대충 유저 정보</p>}
      </div>
      <div className="MainBody">
        <header className="main-page__header">
          <h1>로고</h1>
          <div className="main-page__searchbar">
            <input
              type="text"
              value={search}
              onChange={onChangeSearch}
              className="main-page__searchbar-input"
            />
            <button onClick={onClickSearch} className="search__btn">검색</button>
            <button onClick={onClickSearchReset} className="search__btn">초기화</button>
          </div>
        </header>
        <main className="main-page__main">
          <MakeRoom />
          <RoomList roomInfo={roomInfo} />
        </main>
      </div>
      <div className="MainFooter">
        <div>
          <button className="main-page__quickstart" onClick={onClickFastStart}>
            빠른시작
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
