// import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom"
import LandingPage from "./components/views/LandingPage/LandingPage";
import MainPage from "./components/views/MainPage/MainPage"
import Tmp from './components/views/tmp/tmp'
// import LoginForm from "./components/views/LandingPage/LoginForm";
import WaitingRoom from "./components/views/WaitingRoom/WaitingRoom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/tmp" element={<Tmp />} />
        <Route path="/wait" element={<WaitingRoom />}></Route>
      </Routes>
    </div>
  );
}

export default App;
