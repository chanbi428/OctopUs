import { React, useState } from "react";
import axios from "axios";
import "./RegisterModal.css";

const RegisterModal = (props) => {
  const { open, close } = props;

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

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
      username: "user_name",
      password: "password",
    };

    console.log(e);

    if (username === "") {
      alert("닉네임을 입력해주세요");
    } else if (password === "") {
      alert("비밀번호를 입력해주세요");
    } else if (confirmpassword === "") {
      alert("비밀번호 확인란을 입력해주세요.");
    } else if (password !== confirmpassword) {
      alert("비밀번호가 일치하지 않습니다");
    } else {
      axios
        .post("http://localhost:8080/test", JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <form onSubmit={onRegisterSubmitHandler}>
            <p>회원가입</p>
            <div>
              <input
                className="register-form__input"
                type="text"
                value={username}
                onChange={onChangeNameHandler}
                placeholder="닉네임"
              />
              <input
                className="register-form__input"
                type="password"
                value={password}
                onChange={onChangePasswordtHandler}
                placeholder="비밀번호"
              />
              <input
                className="register-form__input"
                type="password"
                value={confirmpassword}
                onChange={onChangeConfirmPasswordtHandler}
                placeholder="비밀번호 확인"
              />
            </div>
            <div>
              <button
                type="submit"
                className="register-form__btn"
                onClick={onRegisterSubmitHandler}
              >
                회원가입
              </button>
              <button className="register-form__btn" onClick={close}>
                뒤로가기
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </div>
  );
};

export default RegisterModal;
