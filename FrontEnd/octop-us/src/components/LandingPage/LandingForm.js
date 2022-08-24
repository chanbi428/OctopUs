import { React, useState } from "react";
import "./LandingForm.css";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

import MP_btn1 from "../../effect/MP_btn1.mp3";
import Swal from "sweetalert2";

function LandingForm(props) {
  const [loginmodalopen, setLoginModalOpen] = useState(false);
  const [registermodalopen, setRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    var audio = new Audio(MP_btn1);
    audio.play();
    setLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    var audio = new Audio(MP_btn1);
    audio.play();
    setLoginModalOpen(false);
  };
  const openRegisterModal = () => {
    var audio = new Audio(MP_btn1);
    audio.play();
    // setRegisterModalOpen(true); register modal 오픈 x
    Swal.fire({
      icon: "warning",
      title: "시연 중 회원가입 불가",
      text: "시연 중이므로 회원가입이 불가능합니다.",
      background: "#fdfcdc",
      confirmButtonColor: "#f4d35e",
      color: "black",
      customClass: {
        confirmButton: "swalBtnColor",
        popup: "popUp",
      },
    });
  };
  const closeRegisterModal = () => {
    var audio = new Audio(MP_btn1);
    audio.play();
    setRegisterModalOpen(false);
  };

  return (
    <div>
      <div className="landing-page__btndiv">
        <button className="landing-page__btn" onClick={openLoginModal}>
          &nbsp;LOGIN
        </button>
        <LoginModal open={loginmodalopen} close={closeLoginModal}></LoginModal>
        <button className="landing-page__btn" onClick={openRegisterModal}>
          &nbsp;SIGN UP
        </button>
        <RegisterModal
          open={registermodalopen}
          close={closeRegisterModal}
        ></RegisterModal>
      </div>
    </div>
  );
}

export default LandingForm;
