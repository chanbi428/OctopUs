import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RegisterModal.css";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterModal = (props) => {
  const { open, close } = props;

  const [userid, setUserId] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const onChangeIdHandler = (e) => {
    setUserId(e.currentTarget.value);
  };
  const onChangeNameHandler = (e) => {
    setUserName(e.currentTarget.value);
  };
  const onChangePasswordtHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onChangeConfirmPasswordtHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const onRegisterSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      userName: "user_name",
      userPW: "password",
      userId: "user_id",
    };

    if (password !== confirmpassword) {
      alert("비밀번호가 일치하지 않습니다");
    } else {
      data.userId = userid;
      data.userName = username;
      data.userPW = password;
      axios
        .post("http://localhost:8080/user/SignIn", JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then(() => {
          setUserId("");
          setUserName("");
          setPassword("");
          setConfirmPassword("");
          close();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section className="container">
          <form onSubmit={onRegisterSubmitHandler}>
            <p>회원가입</p>
            <div>
              <input
                className="register-modal__input"
                type="text"
                value={userid}
                onChange={onChangeIdHandler}
                placeholder="아이디"
                required
                autoFocus
              />
              <input
                className="register-modal__input"
                type="text"
                value={username}
                onChange={onChangeNameHandler}
                placeholder="닉네임"
                required
              />
              <input
                className="register-modal__input"
                type="password"
                value={password}
                onChange={onChangePasswordtHandler}
                placeholder="비밀번호"
                required
              />
              <input
                className="register-modal__input"
                type="password"
                value={confirmpassword}
                onChange={onChangeConfirmPasswordtHandler}
                placeholder="비밀번호 확인"
                required
              />
            </div>
            <footer>
              <button
                type="submit"
                className="register-modal__btn"
                onClick={onRegisterSubmitHandler}
              >
                회원가입
              </button>
              <button className="register-modal__btn" onClick={close}>
                뒤로가기
              </button>
            </footer>
          </form>
        </section>
      ) : null}
    </div>
  );
};

export default RegisterModal;
