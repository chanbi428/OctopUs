import { React, useState } from "react";
import "./RegisterModal.css";

const LoginModal = (props) => {
  // const dispatch = useDispatch();
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const onChangeName = (e) => {
    setUserName(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      return alert("입력한 비밀번호가 다릅니다.");
    }
    let body = {
      username,
      password,
    };
    // dispatch(registerUser(body)
    // .then(res => {
    //   if(res.payload.success) {
    //     // 로그인 모달 띄우기
    //     return
    //   } else {
    //     alert('회원가입에 실패했습니다.');
    //   }
    // }))
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <form onSubmit={submitHandler}>
            <p>회원가입</p>
            <div>
              <input
                className="register-form__input"
                type="text"
                value={username}
                onChange={onChangeName}
                placeholder="닉네임"
              />
              <input
                className="register-form__input"
                type="password"
                value={password}
                onChange={onChangePassword}
                placeholder="비밀번호"
              />
              <input
                className="register-form__input"
                type="password"
                value={confirmpassword}
                onChange={onChangeConfirmPassword}
                placeholder="비밀번호 재입력"
              />
            </div>
            <div>
              <button className="register-form__btn" onClick={close}>
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

export default LoginModal;
