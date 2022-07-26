import { React, useState } from "react";
import "./LandingForm.css";
import LoginModal from "./LoginModal";

function LandingForm(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const RegisterHandler = () => {};

  return (
    <div>
      <div className="landing-page__btndiv">
        <button className="landing-page__btn" onClick={openModal}>
          로그인
        </button>
        <LoginModal open={modalOpen} close={closeModal}></LoginModal>
        <button className="landing-page__btn" onClick={RegisterHandler}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default LandingForm;
