import { React, useState } from "react";
import "./LoginModal.css";

const LoginModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <p>로그인</p>
          <div>
            <input
              className="login-form__input"
              type="text"
              value={username}
              onChange={({ target: { value } }) => setUserName(value)}
              placeholder="닉네임"
            />

            <input
              className="login-form__input"
              type="text"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
              type="password"
              placeholder="비밀번호"
            />
          </div>
          <div>
            <button className="login-form__btn" onClick={close}>
              로그인
            </button>
            <button className="login-form__btn" onClick={close}>
              뒤로가기
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default LoginModal;
