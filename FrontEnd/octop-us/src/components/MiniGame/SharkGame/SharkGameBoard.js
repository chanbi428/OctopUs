import React from "react";
import styled from "styled-components";
import SharkGameCell from "./SharkGameCell";

const Container = styled.div`
  width: 400px;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1px;
  grid-row-gap: 1px;
  grid-template-rows: repeat(4, 1fr);
`;

function SharkGameBoard({ numbers, handleClick }) {
  return (
    <Container>
      {numbers.map((num, index) => (
        <SharkGameCell
          num={num}
          key={index}
          handleClick={handleClick}
        ></SharkGameCell>
      ))}
    </Container>
  );
}

export default SharkGameBoard;
