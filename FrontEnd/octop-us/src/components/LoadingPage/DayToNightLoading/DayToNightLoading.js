import React, { useEffect } from "react";
import { setTurnCheck } from "../../../features/gamer/gamerSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import "./DayToNightLoading.css";

const DayToNightLoading = ({ page }) => {
  const dispatch = useDispatch();
  const { gameturn } = useSelector((state) => state.gamer);

  useEffect(() => {
    if (page === 2) {
      dispatch(setTurnCheck());
    }
  }, [page]);
  return (
    <div className="moon-page">
      <div className="wrap-moon">
        <div className="circle-moon">
          <div className="wave-one-moon"></div>
          <div className="wave-two-moon"></div>
          <div className="wave-three-moon"></div>
          <div className="wave-four-moon"></div>

          <FontAwesomeIcon icon={faMoon} />
          <FontAwesomeIcon icon={faMoon} className="blur-moon" />

          <div className="star">
            <FontAwesomeIcon icon={faAsterisk} className="star1" />
            <FontAwesomeIcon icon={faAsterisk} className="star2" />
            <FontAwesomeIcon icon={faAsterisk} className="star3" />
            <FontAwesomeIcon icon={faAsterisk} className="star4" />
            <FontAwesomeIcon icon={faAsterisk} className="star5" />
          </div>
        </div>
      </div>
      <div className="day-to-night__text">{gameturn}번째 밤</div>
    </div>
  );
};

export default DayToNightLoading;
