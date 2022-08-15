import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FishingGameStart from "./FishingGameStart";

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
      {!eventChange && <FishingGameStart />}
      {eventChange && (
        <img src="images/minigame/fishingtutorial.png" alt="낚시꾼튜토리얼" />
      )}
    </div>
  );
};

export default FishingGameTutorial;
