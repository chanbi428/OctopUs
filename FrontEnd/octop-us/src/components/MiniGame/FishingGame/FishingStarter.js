// import { React, useState, useEffect } from "react";
// import "./FishingCss.css";
// import axios from "axios";
// import FishGameTutorial from "./FishingTutorial";
// import FishGame from "./FishingComponents";

// import { BASE_URL, config } from "../../../api/BASE_URL";
// import { useDispatch, useSelector } from "react-redux";

// function FishingStater(props) {
//   const [startChange, setStartChange] = useState(false);
//   const [visible, setVisible] = useState(true);
//   const [roomId, setRoomId] = useState("1234");
//   // const { gamerInfo } = useSelector((state) => state.gamer);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     makeDB();
//     if (!startChange) {
//       const startTimer = setTimeout(() => {
//         setStartChange(true);
//       }, 10000);
//       return () => clearTimeout(startTimer);
//     }
//   }, [startChange]);

//   async function makeDB() {
//     console.log("makeDB running...");
//     await axios.get(BASE_URL + "/games/mini/fish/make", { roomId }, config);
//   }

//   const stateVisible = (e) => {
//     setVisible(false);
//     // if(e === true){
//     //   dispatch(mafiaLoseAtMinigame);
//     // }
//     // else{
//     //   dispatch(mafiaWinAtMinigame);
//     // }
//   };
//   return (
//     <div>
//       {!startChange && visible && <FishGameTutorial />}
//       {startChange && visible && <FishGame stateVisible={stateVisible} />}
//     </div>
//   );
// }
// export default FishingStater;
