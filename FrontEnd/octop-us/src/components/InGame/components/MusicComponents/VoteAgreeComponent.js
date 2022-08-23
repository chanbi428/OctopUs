import { useEffect } from "react";
import { useSelector } from "react-redux";
import MP_clock from "../../../../effect/MP_clock.mp3";

function VoteAgreeComponent(props) {
  const room = useSelector((state) => state.wait);

  useEffect(() => {
    var audio = new Audio(MP_clock);
    audio.loop = true;
    audio.volume = 0.2;
    audio.play();
    // setTimeout(() => audio.pause(), room.gameTime); // 나중에는 이거 사용
    setTimeout(() => audio.pause(), 3000); // 테스트용
  }, []);

  return <div></div>;
}

export default VoteAgreeComponent;
