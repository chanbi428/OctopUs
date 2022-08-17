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

  // 시작 애니메이션 -> 튜토리얼 연결 부분
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
        <img src="images/minigame/sharktutorial.png" alt="상어튜토리얼" />
      )}
    </div>
  );
};

export default SharkGameTutorial;
