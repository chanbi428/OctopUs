import { useState, useEffect } from "react";
import axios from "axios";
import MakeRoom from "../MakeRoom/MakeRoom";
import RoomList from "./RoomList/RoomList";
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.css'

function MainPage () {

  const [roomInfo, setRoomInfo] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/rooms')
    .then(res => setRoomInfo(res.data))
    .catch(err => console.log(err))
  }, []);

  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const onClickSearch = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/rooms/detail/roomnamelike/${search}`)
    .then(res => setRoomInfo(res.data))
    .catch(err => console.log(err))
  }

  const onClickSearchReset = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/rooms`)
    .then(res => setRoomInfo(res.data))
    .catch(err => console.log(err))
  }
  
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
        <div className="SearchBar">
          <input type="text" value={search} onChange={onChangeSearch} className="Input" />
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
          <button className="QuickStart">빠른시작</button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;