import React, { useState } from "react";
import axios from "axios";
import "./RegisterModal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { userRegister } from "../../features/user/userActions";
import { useDispatch } from "react-redux";

const BASE_URL = "http://localhost:8080";
const RegisterModal = (props) => {
  const dispatch = useDispatch();
  const { open, close } = props;

  // 회원가입 State
  const [register, setRegister] = useState({
    userName: "",
    userPW: "",
    confirmUserPW: "",
  });

  // 중복 확인 후 아이디 가능 시에만 회원가입 버튼 활성화
  const [isChecked, setIsChecked] = useState(false);

  // 인풋창에 입력할 때 바뀌는 값들
  const onRegisterChangeHandler = (e) => {
    const { name, value } = e.target;
    setRegister({
      ...register,
      [name]: value,
    });
  };

  // 제출 클릭 시 axios로 유저 정보 전송
  const onRegisterSubmitHandler = (e) => {
    e.preventDefault();

    if (register.userPW !== register.confirmUserPW) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      alert("회원가입 성공입니다. 로그인 해주시길 바랍니다.");
      dispatch(userRegister(register));
      close();
    }
  };

  // 닉네임 중복 확인
  const onUserNameCheckHandler = (e) => {
    axios.get(`${BASE_URL}/user/existName/${register.userName}`).then((res) => {
      if (res.data !== true) {
        alert("중복 확인이 완료되었습니다.");
        setIsChecked(true);
      } else {
        alert("이미 존재하는 아이디입니다.");
      }
    });
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section className="container">
          <form onSubmit={onRegisterSubmitHandler}>
            <p>회원가입</p>
            <div className="register-modal__input-box">
              <div className="register-modal__nickname">
                <input
                  className="register-modal__input"
                  name="userName"
                  onChange={onRegisterChangeHandler}
                  type="text"
                  placeholder="닉네임"
                  required
                />
                <button
                  type="button"
                  className="register-modal__double-check-btn"
                  onClick={onUserNameCheckHandler}
                >
                  중복 확인
                </button>
              </div>
              <input
                className="register-modal__input"
                name="userPW"
                onChange={onRegisterChangeHandler}
                type="password"
                placeholder="비밀번호"
                required
              />
              <input
                className="register-modal__input"
                name="confirmUserPW"
                onChange={onRegisterChangeHandler}
                type="password"
                placeholder="비밀번호 확인"
                required
              />
            </div>
            <footer>
              <button
                type="submit"
                className="register-modal__btn"
                disabled={!isChecked}
              >
                회원가입
              </button>
              <button className="register-modal__btn" onClick={close}>
                취소
              </button>
            </footer>
          </form>
        </section>
      ) : null}
    </div>
  );
};

export default RegisterModal;
