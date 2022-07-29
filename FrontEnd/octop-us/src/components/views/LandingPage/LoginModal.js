import { React, useState } from "react";
// import axios from "axios";
import "./LoginModal.css";

import { useDispatch } from "react-redux";
import { userLogin } from "../../../features/user/userActions";

const LoginModal = (props) => {
  const { open, close } = props;
  const [userName, setUserName] = useState("");
  const [userPW, setUserPW] = useState("");
  // const { loading, userInfo, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const submitForm = (data) => {
  //   dispatch(userLogin(data))
  // }

  const onChangeNameHandler = (e) => {
    setUserName(e.currentTarget.value);
  };
  const onChangePasswordtHandler = (e) => {
    setUserPW(e.currentTarget.value);
  };

  // const onLoginSubmitHandler = (e) => {
  //   document.location.href = "/main";
  //   e.preventDefault();

  const onLoginSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      userLogin({
        userName,
        userPW,
      })
    );

    // const data = {
    //   userName: "user_name",
    //   userPW: "user_pw",
    //   userId: "null",
    // };

    console.log(e);

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
                value={userName}
                onChange={onChangeNameHandler}
                placeholder="닉네임"
                required
              />
              <input
                className="login-form__input"
                type="password"
                value={userPW}
                onChange={onChangePasswordtHandler}
                placeholder="비밀번호"
                required
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
