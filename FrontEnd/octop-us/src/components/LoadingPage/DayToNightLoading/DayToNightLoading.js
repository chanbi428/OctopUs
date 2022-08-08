// import { fasAsterisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import './DayToNightLoading.css'

const DayToNightLoading = () => {
  return (
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
  );
};

export default DayToNightLoading;
