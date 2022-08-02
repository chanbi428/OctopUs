// import logo from "./logo.svg";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import MainPage from "./components/views/MainPage/MainPage";
import Tmp from "./components/views/tmp/tmp";
import WaitingRoom from "./components/views/WaitingRoom/WaitingRoom";
// import { userLogin } from "./features/user/userActions";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // const initializeUserInfo = aync () => {
  // const getUserToken = localStorage.getItem("userToken");
  // if (!getUserToken) return;

  // const getUserName = localStorage.getItem("userName");
  // const { UserActions } = this.props;

  // UserActions.setLoggedInfo(getUserName);
  // };
  // componentDidMount () {
  //   this.initialzeUserInfo();
  // };

  // const { userInfo } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // console.log("이것은" + userInfo);
  // const getUserToken = localStorage.getItem("userToken");
  // const getUserName = localStorage.getItem("userName");
  // useEffect(() => {
  //   if (getUserToken && !userInfo) {
  //     fetch("http://localhost:8080/Auth/login")
  //       .then((res) => {
  //         return res.json;
  //       })
  //       .then();
  // console.log(getUserName);
  //   }
  // }, [userInfo]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/tmp" element={<Tmp />} />
        <Route path="/:roomId" element={<WaitingRoom />}></Route>
      </Routes>
    </div>
  );
}

export default App;
