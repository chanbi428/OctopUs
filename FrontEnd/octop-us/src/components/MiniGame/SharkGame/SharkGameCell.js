import React from "react";
import styled from "styled-components";
import "./SharkGameCell.css";

const Container = styled.div`
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  border-radius: 10px;
  animation-name: cellColor;
  color: black;
  background-color: #f4d35e;
  font-family: BMJUA;

  &:hover {
    cursor: pointer;
    transform: scale3d(1.05, 1.05, 1.05);
  }
`;

function SharkGameCell({ num, handleClick }) {
  return (
    <Container
      onClick={handleClick}
      className={num !== 0 ? null : "Shark-game__end-cell"}
    >
      {num !== 0 ? num : null}
    </Container>
  );
}

export default SharkGameCell;
