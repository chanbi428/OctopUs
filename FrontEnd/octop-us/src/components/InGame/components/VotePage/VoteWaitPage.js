import { useState, useEffect } from "react";

function VoteWaitPage(props) {

  const [time, setTime] = useState(3)
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("timer : " + time);
      if (time > 0) setTime((time) => time - 1);
      if (time === 0) {
        console.log("timer end");
        clearInterval(timer);
        endGame();
        
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  function endGame() {
    console.log("endGame");
    props.moveAgree()
  }

  return(
    <div>
      <p>투표 집계중,,,{time}</p>
    </div>
  )
}

export default VoteWaitPage