import React, { useState, useEffect, useRef } from "react";
import SharkGameTutorial from "./SharkGameTutorial";
import MP_count from "../../../effect/MP_count.mp3";
const SharkGameStartCount = () => {
  // 3, 2, 1, 0 초에 각각 다른 이미지 보여줄 것
  const [count, setCount] = useState(14);
  const [eventChange, setEventChange] = useState(false);
  const spaceCount = useRef();
  spaceCount.current = count;

  useEffect(() => {
    const startcount = setInterval(() => {
      console.log("startcount" + count);
      if (count > 0) setCount((count) => count - 1);
      if (count === 0) {
        clearInterval(startcount);
      }
      if (count <= 5) {
        var audio = new Audio(MP_count);
        audio.play();
      }
    }, 1000);
    return () => {
      clearInterval(startcount);
    };
  }, [count]);

  useEffect(() => {
    if (!eventChange) {
      const eventTimer = setTimeout(() => {
        setEventChange(true);
      }, 9500);
      return () => clearTimeout(eventTimer);
    }
  }, [eventChange]);
  return (
    <div>
      {!eventChange && <SharkGameTutorial />}
      {eventChange && (
        <div className="shark-game-count__container">
          {(count === 4 || count === 5) && (
            <img src="images/minigame/3.png" alt="3" className="shark-game-count__img" />
          )}
          {count === 3 && (
            <img src="images/minigame/2.png" alt="2" className="shark-game-count__img" />
          )}
          {count === 2 && (
            <img src="images/minigame/1.png" alt="1" className="shark-game-count__img" />
          )}
          {count < 2 && (
            <img src="images/minigame/go.png" alt="go" className="shark-game-count__img" />
          )}
        </div>
      )}
    </div>
  );
};

export default SharkGameStartCount;
