import { React, useState } from "react";
// import axios from "axios";
import "./LoginModal.css";

import { userDispatch, userSelector } from "react-redux";
import { userLogin } from "../../features/user/userSlice";

const LoginModal = (props) => {
  const { open, close } = props;
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { loading, userInfo, error } = userSelector((state) => state.user);

  const onChangeNameHandler = (e) => {
    setUserName(e.currentTarget.value);
  };
  const onChangePasswordtHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onLoginSubmitHandler = (e) => {
    document.location.href = "/main";
    e.preventDefault();
    // const data = {
    //   userName: "user_name",
    //   userPW: "user_pw",
    //   userId: "null",
    // };

    // console.log(e);

    // if (username === "") {
    //   alert("닉네임을 입력해주세요");
    // } else if (password === "") {
    //   alert("비밀번호를 입력해주세요");
    // } else {
    //   data.userName = username;
    //   data.userPW = password;
    //   axios
    //     .post("http://localhost:8080/Auth/login", JSON.stringify(data), {
    //       headers: {
    //         "Content-Type": `application/json`,
    //       },
    //     })
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err));
    // }
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <form onSubmit={onLoginSubmitHandler}>
            <p>로그인</p>
            <div>
              <input
                className="login-form__input"
                type="text"
                value={username}
                onChange={onChangeNameHandler}
                placeholder="닉네임"
              />
              <input
                className="login-form__input"
                type="password"
                value={password}
                onChange={onChangePasswordtHandler}
                placeholder="비밀번호"
              />
            </div>
            <div>
              <button
                type="submit"
                className="login-form__btn"
                onClick={onLoginSubmitHandler}
              >
                로그인
              </button>
              <button className="login-form__btn" onClick={close}>
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
