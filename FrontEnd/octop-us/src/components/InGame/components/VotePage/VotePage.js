import { useState, useEffect } from "react";

function VotePage (props) {

  const [time, setTime] = useState(10)
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
    props.moveVoteWait()
  }
  return (
    <div>
      <p>{time}</p>
    </div>
  )
}

export default VotePage