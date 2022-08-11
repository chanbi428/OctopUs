import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../features/user/userSlice";
import MakeRoom from "./MakeRoom";
import RoomList from "./RoomList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MainPage.css";

function MainPage() {
  const [roomInfo, setRoomInfo] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("MainPage");
  const { userInfo } = useSelector((state) => state.user);

  const onClickLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/rooms")
      .then((res) => setRoomInfo(res.data))
      .catch((err) => console.log(err));
      console.log("MainPage useEffect");
  }, []);

  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onClickSearch = (e) => {
    e.preventDefault();
    if(search == ''){
      onClickSearchReset(e);
    }
    else{
      axios
      .get(`http://localhost:8080/rooms/detail/roomnamelike/${search}`)
      .then((res) => setRoomInfo(res.data))
      .catch((err) => console.log(err));
    }

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
          .get(`http://localhost:8080/rooms/detail/roomid/${res.data.roomId}`)
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
                document.location.href = `https://localhost:3000/${item.data.roomId}`;
                // console.log(document.location.pathname)
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const onKeyPress = (e) => {
    if(e.key == 'Enter') {
      onClickSearch(e);
    }
  };
  return (
    <div className="MainPage container">
      <div className="main-page__user-info">
        {userInfo ? (
          <p>{userInfo.userName} 님 안녕하세요!</p>
        ) : (
          <p>대충 유저 정보</p>
        )}
        <button onClick={onClickLogout}>로그아웃</button>
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
              onKeyPress={onKeyPress}
            />
            <button onClick={onClickSearch} className="search__btn">
              검색
            </button>
            <button onClick={onClickSearchReset} className="search__btn" >
              초기화
            </button>
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
