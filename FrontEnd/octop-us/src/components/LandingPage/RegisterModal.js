import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../api/BASE_URL";
import axios from "axios";
import "./RegisterModal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { userRegister } from "../../features/user/userActions";

import MP_btn1 from "../../effect/MP_btn1.mp3";
import Swal from "sweetalert2";

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
    var audio = new Audio(MP_btn1);
    audio.play();
    e.preventDefault();

    if (register.userPW !== register.confirmUserPW) {
      // 비밀번호 일치하지 않을 때
      Swal.fire({
        icon: "error",
        title: "회원 가입 실패",
        text: "비밀번호가 일치하지 않습니다.",
        background: "#fdfcdc",
        confirmButtonColor: "#f4d35e",
        color: "black",
        customClass: {
          confirmButton: "swalBtnColor",
          popup: "popUp",
        },
      });
      // 회원 가입 성공
    } else {
      Swal.fire({
        icon: "success",
        title: "회원 가입 성공",
        text: "로그인 해주시길 바랍니다.",
        background: "#fdfcdc",
        confirmButtonColor: "#f4d35e",
        color: "black",
        customClass: {
          confirmButton: "swalBtnColor",
          popup: "popUp",
        },
      });
      dispatch(userRegister(register));
      close();
    }
  };

  // 닉네임 중복 확인
  const onUserNameCheckHandler = (e) => {
    var audio = new Audio(MP_btn1);
    audio.play();
    axios.get(`${BASE_URL}/user/existName/${register.userName}`).then((res) => {
      if (res.data !== true) {
        // 중복 확인 성공
        Swal.fire({
          icon: "success",
          title: "중복 확인 성공",
          text: "중복 확인이 완료되었습니다.",
          background: "#fdfcdc",
          confirmButtonColor: "#f4d35e",
          color: "black",
          customClass: {
            confirmButton: "swalBtnColor",
            popup: "popUp",
          },
        });
        setIsChecked(true);
      } else {
        // 중복 확인 실패
        Swal.fire({
          icon: "warning",
          title: "중복 확인 실패",
          text: "이미 존재하는 아이디입니다.",
          background: "#fdfcdc",
          confirmButtonColor: "#f4d35e",
          color: "black",
          customClass: {
            confirmButton: "swalBtnColor",
            popup: "popUp",
          },
        });
      }
    });
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <div className="register-modal__section">
          <form onSubmit={onRegisterSubmitHandler}>
            <h1>&nbsp;SIGN UP</h1>
            <div className="register-modal__inputcontainer">
              <div className="register-modal__inputbox">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;닉네임
                :&nbsp;
                <input
                  className="register-modal__input"
                  name="userName"
                  onChange={onRegisterChangeHandler}
                  type="text"
                  placeholder="닉네임"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  className="register-modal__double-check-btn"
                  onClick={onUserNameCheckHandler}
                >
                  중복 확인
                </button>
              </div>
              <div className="register-modal__inputbox">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;비밀번호 :&nbsp;
                <input
                  className="register-modal__password"
                  name="userPW"
                  onChange={onRegisterChangeHandler}
                  type="password"
                  placeholder="비밀번호"
                  required
                />
              </div>
              <div className="register-modal__inputbox">
                비밀번호 확인 :&nbsp;
                <input
                  className="register-modal__password"
                  name="confirmUserPW"
                  onChange={onRegisterChangeHandler}
                  type="password"
                  placeholder="비밀번호 확인"
                  required
                />
              </div>
            </div>
            <div>
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
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default RegisterModal;
