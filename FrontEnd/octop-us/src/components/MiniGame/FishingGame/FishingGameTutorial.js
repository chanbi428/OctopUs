import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  width: 90%;
  height: 50vh;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fdfcdc;
  opacity: 0.9;
  overflow: hidden;
  border: 3px solid black;
  padding: 10px;
`;

const FishingGameTutorial = () => {
  return (
    <div>
      <Container>
        <h1>게임 설명</h1>
        <p>낚시꾼이 나타났어요!</p>
        <p>낚시줄에 끌려가지않게 도망쳐야 해요!</p>
        <p>30초 내에 클릭 버튼을</p>
        <p>최대한 많이 눌러주세요.</p>
        <p>오징어팀이 더 많이 클릭한다면 오징어팀의 승리!</p>
        <p>문어팀이 더 많이 클릭한다면 문어팀의 승리!</p>
      </Container>
    </div>
  );
};

export default FishingGameTutorial;
