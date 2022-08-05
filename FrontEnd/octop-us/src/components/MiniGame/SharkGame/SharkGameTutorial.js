import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SharkGameStart from "./SharkGameStart";
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

const SharkGameTutorial = () => {
  const [eventChange, setEventChange] = useState(false);

  useEffect(() => {
    if (!eventChange) {
      const eventTimer = setTimeout(() => {
        setEventChange(true);
      }, 4000);
      return () => clearTimeout(eventTimer);
    }
  }, [eventChange]);

  return (
    <div>
      {!eventChange && <SharkGameStart />}
      {eventChange && (
        <Container>
          <h1>게임 설명</h1>
          <p>상어가 나타났어요!</p>
          <p>비밀번호를 치고 집으로 숨어야 해요!</p>
          <p>30초 내에 화면에 나오는 모든 숫자 버튼을</p>
          <p>1부터 차례로 눌러주세요.</p>
          <p>마피아팀이 더 빨리 끝낸다면 마피아팀의 승리!</p>
          <p>시민팀이 더 빨리 끝낸다면 시민팀의 승리!</p>
        </Container>
      )}
    </div>
  );
};

export default SharkGameTutorial;
