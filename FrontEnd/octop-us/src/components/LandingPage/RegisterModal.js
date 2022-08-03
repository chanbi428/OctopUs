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

  // const [userName, setUserName] = useState("");
  // const [userPW, setUserPW] = useState("");
  // const [confirmuserPW, setConfirmUserPW] = useState("");

  const [register, setRegister] = useState({
    userName: "",
    userPW: "",
    confirmUserPW: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  // const onChangeNameHandler = (e) => {
  //   setUserName(e.currentTarget.value);
  // };
  // const onChangeUserPWtHandler = (e) => {
  //   setUserPW(e.currentTarget.value);
  // };
  // const onChangeConfirmUserPWtHandler = (e) => {
  //   setConfirmUserPW(e.currentTarget.value);
  // };

  // const onRegisterSubmitHandler = (e) => {
  //   e.preventDefault();

  //   if (userPW !== confirmuserPW) {
  //     alert("비밀번호가 일치하지 않습니다");
  //   } else {
  //     axios
  //       .post("http://localhost:8080/user/SignIn", JSON.stringify(data), {
  //         headers: {
  //           "Content-Type": `application/json`,
  //         },
  //       })
  //       .then(() => {
  //         setUserName("");
  //         setUserPW("");
  //         setConfirmUserPW("");
  //         close();
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  const onRegisterChangeHandler = (e) => {
    const { name, value } = e.target;
    setRegister({
      ...register,
      [name]: value,
    });
  };

  const onRegisterSubmitHandler = (e) => {
    e.preventDefault();

    if (register.userPW !== register.confirmUserPW) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      dispatch(userRegister(register));
      close();
    }
  };

  const onUserNameCheckHandler = (e) => {
    e.preventDefault();
    console.log("중복확인");
    axios
      .get(
        `${BASE_URL}/user/existName/${register.userName}`,
        JSON.stringify(register.userName),
        {
          headers: {
            "Content-Type": `application/json`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        // if (res === "false") {
        //   setIsChecked(true);
        // } else {
        //   alert("이미 존재하는 아이디입니다.");
        // }
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
