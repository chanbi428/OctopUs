import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  border-radius: 10px;
  animation-name: cellColor;
  color: white;

  /* @keyframes cellColor {
    0% {
      background: rgb(random(0, 255), random(0, 255), random(0, 255));
    }
  } */
`;

function SharkGameCell({ num, handleClick }) {
  // const cellColor = ["#fdfcdc", "#f4d35e", "#00afb9", "#0081a7", "#13293d"];
  // const randomColor = cellColor[Math.floor(Math.random() * cellColor.length)];
  // console.log(randomColor);
  return (
    <Container onClick={() => handleClick(num)}>
      {num !== 0 ? num : null}
    </Container>
  );
}

export default SharkGameCell;
