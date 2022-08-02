import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import MainPage from "./components/views/MainPage/MainPage";
import Tmp from "./components/views/tmp/tmp";
import WaitingRoom from "./components/views/WaitingRoom/WaitingRoom";
import { login } from "./features/user/userSlice";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserToken = localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : null;
  const getUserName = localStorage.getItem("userName");

  // 로그인 상태 유지
  useEffect(() => {
    if (getUserToken) {
      dispatch(login({ getUserToken, getUserName }));
    }
  }, [dispatch]);

  // 로그인 안 되어 있을 때 주소에 /main 쳐서 들어가는 것 방지
  useEffect(() => {
    if (!getUserToken) {
      navigate("/");
    }
  }, [navigate]);

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
