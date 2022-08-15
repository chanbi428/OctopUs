import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL, CLIENT_URL } from "../../api/BASE_URL";
import { logout } from "../../features/user/userSlice";
import MakeRoom from "./MakeRoom";
import RoomList from "./RoomList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MainPage.css";
import LoadingSpanner from "../LoadingPage/LoadingSpan/LoadingSpanner";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { faOctopusDeploy } from "@fortawesome/free-brands-svg-icons";

import MP_btn1 from "../../effect/MP_btn1.mp3";
import MP_bgm1 from "../../effect/MP_bgm1.mp3";

function MainPage() {
  const [roomInfo, setRoomInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("MainPage");
  const { userInfo } = useSelector((state) => state.user);
  const bgmAudio = new Audio(MP_bgm1);

  const onClickLogout = () => {
    bgmAudio.pause(); // 이거 왜 안되는지 모르겠음
    var audio = new Audio(MP_btn1);
    audio.play();
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    bgmAudio.play();

    axios
      .get(`${BASE_URL}/rooms`)
      .then((res) => {
        setRoomInfo(res.data);
        setLoading(true);
      })

      // .then((res) => setRoomInfo(res.data))
      .catch((err) => console.log(err));
    console.log("MainPage useEffect");
  }, []);

  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onClickSearch = (e) => {
    var audio = new Audio(MP_btn1);
    audio.play();
    e.preventDefault();
    if (search == "") {
      onClickSearchReset(e);
    } else {
      setLoading(false);
      axios
        .get(`${BASE_URL}/rooms/detail/roomnamelike/${search}`)
        .then((res) => {
          bgmAudio.pause();
          setRoomInfo(res.data);
          setLoading(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const onClickSearchReset = (e) => {
    var audio = new Audio(MP_btn1);
    audio.play();
    e.preventDefault();
    setLoading(false);
    axios

      .get(`${BASE_URL}/rooms`)
      .then((res) => {
        setRoomInfo(res.data);
        setLoading(true);
      })

      .catch((err) => console.log(err));
    setSearch("");
  };

  const onClickFastStart = (e) => {
    var audio = new Audio(MP_btn1);
    audio.play();
    e.preventDefault();
    axios
      .get(`${BASE_URL}/rooms/find/faststart`)
      .then((res) => {
        axios
          .get(`${BASE_URL}/rooms/detail/roomid/${res.data.roomId}`)
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
              .put(`${BASE_URL}/rooms`, JSON.stringify(data), {
                headers: {
                  "Content-Type": `application/json`,
                },
              })
              .then((res) => {
                bgmAudio.pause();
                console.log(res);
                navigate(`/${item.data.roomId}`);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      var audio = new Audio(MP_btn1);
      audio.play();
      onClickSearch(e);
    }
  };

  const onClickRefresh = () => {
    var audio = new Audio(MP_btn1);
    audio.play();
    window.location.reload();
  };

  return (
    <div id="main-page">
      <div className="container main-page__container">
        <div className="main-page__top">
          <div>
            <img src="images/logo.png" alt="" className="main-page__logo" />
          </div>
          <div className="main-page__top-left">
            {userInfo ? (
              <div>
                <div className="main-page__logout-set" onClick={onClickLogout}>
                  LOGOUT
                  <ExitToAppIcon style={{ fontSize: "2rem" }} />
                </div>
                <div className="main-page__userinfo">
                  <FontAwesomeIcon
                    icon={faOctopusDeploy}
                    className="main-page__user-image"
                  />
                  <div className="main-page__username">{userInfo.userName}</div>
                </div>
              </div>
            ) : (
              <p className="main-page__user">대충 유저 정보</p>
            )}
          </div>
        </div>
        <div className="main-page__searchbar-container">
          <div className="main-page__searchbar-set">
            <input
              type="text"
              value={search}
              onChange={onChangeSearch}
              className="main-page__searchbar-input"
              onKeyPress={onKeyPress}
              placeholder="검색할 방 제목을 입력하세요."
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              onClick={onClickSearch}
              className="main-page__search_btn"
            />
            <FontAwesomeIcon
              icon={faArrowRotateRight}
              onClick={onClickSearchReset}
              className="main-page__search_btn"
            />
          </div>
          <div className="main-page__btn-set">
            <button
              className="main-page__quickstart"
              onClick={onClickFastStart}
            >
              <FontAwesomeIcon icon={faPlay} />
              &nbsp;빠른시작
            </button>
            <button className="main-page__reset" onClick={onClickRefresh}>
              <FontAwesomeIcon icon={faArrowsRotate} />
              <span className="main-page__quickstart-text">&nbsp;새로고침</span>
            </button>
          </div>
        </div>
        <div className="main-page__main">
          <MakeRoom />
          {loading ? (
            <RoomList roomInfo={roomInfo} loading={loading} />
          ) : (
            <LoadingSpanner />
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
