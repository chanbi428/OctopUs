import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../features/user/userActions";
import "./LoginModal.css";

const LoginModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { open, close } = props;

  // 유저 정보 가져오기
  const { userInfo } = useSelector((state) => state.user);

  const [login, setLogin] = useState({
    userName: "",
    userPW: "",
  });

  // 유저 정보가 있으면 메인페이지로 이동
  useEffect(() => {
    if (userInfo) {
      navigate("/main");
    }
  }, [navigate, userInfo]);

  const onLoginChangeHandler = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const onLoginSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(login));
    close();
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <div className="login-modal__section">
          <form onSubmit={onLoginSubmitHandler}>
            <h1>&nbsp;LOGIN</h1>
            <div className="login-modal__inputcontainer">
              <div className="login-modal__inputbox">
                &nbsp;&nbsp;&nbsp;닉네임 :&nbsp;
                <input
                  className="login-modal__input"
                  type="text"
                  name="userName"
                  onChange={onLoginChangeHandler}
                  placeholder="닉네임"
                  required
                  autoFocus
                />
              </div>
              <div className="login-modal__inputbox">
                비밀번호 :&nbsp;
                <input
                  className="login-modal__password"
                  name="userPW"
                  type="password"
                  onChange={onLoginChangeHandler}
                  placeholder="비밀번호"
                  required
                />
              </div>
            </div>
            <div>
              <button className="login-modal__btn" type="submit" onClick={onLoginSubmitHandler}>
                로그인
              </button>
              <button className="login-modal__btn" onClick={close}>
                뒤로가기
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default LoginModal;
