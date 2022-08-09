import { React, useState, useEffect } from "react";
import "./FishingCss.css";
import FishGameTutorial from "./FishingTutorial";
import FishGame from "./FishingComponents";


function FishingStater(props){
    const [startChange, setStartChange] = useState(false);

    useEffect(() => {
        
        if (!startChange) {
          const startTimer = setTimeout(() => {
            setStartChange(true);
          }, 10000);
          return () => clearTimeout(startTimer);
        }
      }, [startChange]);

    return (
        <div>
            {!startChange && (
                <FishGameTutorial />
            )}
            {startChange && (
                <FishGame />
            )}
        </div>
    )
}
export default FishingStater;