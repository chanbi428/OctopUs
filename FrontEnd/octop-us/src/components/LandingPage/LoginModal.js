import React, { useState } from "react";
// import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { userLogin } from "../../features/user/userActions";
import "./LoginModal.css";

const LoginModal = (props) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { open, close } = props;

  // 유저 정보 가져오기
  // const { userInfo } = useSelector((state) => state.user);

  // const [userName, setUserName] = useState("");
  // const [userPW, setUserPW] = useState("");

  const [login, setLogin] = useState({
    userName: "",
    userPW: "",
  });

  // 유저 정보가 있으면 메인페이지로 이동
  // useEffect(() => {
  //   if (userInfo) {
  //     navigate("/main");
  //   }
  // }, [navigate, userInfo]);

  const onLoginChangeHandler = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  // const onChangeIdHandler = (e) => {
  //   setUserName(e.currentTarget.value);
  // };

  // const onChangePasswordtHandler = (e) => {
  //   setUserPW(e.currentTarget.value);
  // };

  const onLoginSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(login));
    close();
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <form onSubmit={onLoginSubmitHandler}>
            <p>로그인</p>
            <div>
              <input
                className="login-modal__input"
                type="text"
                name="userName"
                onChange={onLoginChangeHandler}
                placeholder="닉네임"
                required
                autoFocus
              />
              <input
                className="login-modal__input"
                name="userPW"
                type="password"
                onChange={onLoginChangeHandler}
                placeholder="비밀번호"
                required
              />
            </div>
            <div>
              <button
                className="login-modal__btn"
                type="submit"
                onClick={onLoginSubmitHandler}
              >
                로그인
              </button>
              <button className="login-modal__btn" onClick={close}>
                뒤로가기
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </div>
  );
};

export default LoginModal;
