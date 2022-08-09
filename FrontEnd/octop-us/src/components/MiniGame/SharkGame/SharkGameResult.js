import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import Card from "../../Card/Card";
import SharkGame from "./SharkGame";

const SharkGameResult = () => {
  const [resultChange, setresultChange] = useState(false);
  // const { userInfo } = useSelector((state) => state.user);
  // const { gamerInfo } = useSelector((state) => state.gamer);

  useEffect(() => {
    if (!resultChange) {
      const startTimer = setTimeout(() => {
        setresultChange(true);
      }, 45000); // 여기 수정 v
      return () => clearTimeout(startTimer);
    }
  }, [resultChange]);
  return (
    <div>
      {!resultChange && <SharkGame />}
      {resultChange && <Card className="container">마피아 승리!</Card>}
    </div>
  );
};

export default SharkGameResult;
