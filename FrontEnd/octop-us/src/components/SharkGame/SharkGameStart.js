import React from "react";
import "./SharkGameStart.css";
import styled from "styled-components";

const SharkGameStart = () => {
  return (
    <div className="shark-game__container">
      <img src="images/Shark.png" alt="상어" className="shark-game__img" />
    </div>
  );
};

// const Container = styled.div`
//   @keyframes fadeInLeft {
//     0% {
//       opacity: 0;
//       transform: translate3d(100%, 100%, 0);
//     }
//     to {
//       opacity: 1;
//       // transform: translateZ(0);
//       transform: translated3d(0, 0, 0);
//     }
//   }
//   display: flex;
//   height: 80vh;
// `;

// const Test = styled.div`
//   position: relative;
//   animation: fadeInLeft 1s;
// `;
export default SharkGameStart;
