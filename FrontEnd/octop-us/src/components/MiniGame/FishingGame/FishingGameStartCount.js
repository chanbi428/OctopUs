import React, { useState, useEffect, useRef } from "react";
import MP_count from "../../../effect/MP_count.mp3";
const FishingGameStartCount = () => {
  // 3, 2, 1, 0 초에 각각 다른 이미지 보여줄 것
  const [count, setCount] = useState(5);
  const spaceCount = useRef();
  spaceCount.current = count;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count <= 5 && count > 1) {
        var audio = new Audio(MP_count);
        audio.play();
      }
      console.log("startcount" + count);
      if (count > 0) setCount((count) => count - 1);
      if (count === 0) {
        clearTimeout(timer);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [count]);

  return (
    <div>
      <div className="shark-game-count__container">
        {count === 4 && (
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
    </div>
  );
};

export default FishingGameStartCount;
