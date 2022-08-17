import { useEffect } from "react";
import { useSelector } from "react-redux";
// import MP_bgm1 from "../../../../effect/MP_bgm1.mp3";

function WaitingComponent(props) {
  const room = useSelector((state) => state.wait);

  useEffect(() => {
    // var audio = new Audio(MP_bgm1);
    // audio.loop = true;
    // audio.volume = 0.5;
    // audio.play();
    // setTimeout(() => audio.pause(), room.gameTime); // 나중에는 이거 사용
    // setTimeout(() => audio.pause(), 3000); // 테스트용

    props.setPlayTrue();
  }, []);

  return <div></div>;
}

export default WaitingComponent;
