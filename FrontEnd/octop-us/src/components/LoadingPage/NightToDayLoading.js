import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import "./NightToDayLoading.css";

const NightToDayLoading = () => {
  return (
    <div className="wrap-sun">
      <div className="circle-sun">
        <div className="wave-one-sun"></div>
        <div className="wave-two-sun"></div>
        <div className="wave-three-sun"></div>
        <div className="wave-four-sun"></div>

        <FontAwesomeIcon icon={faSun} />
        <FontAwesomeIcon icon={faSun} className="blur-sun" />

        <div className="cloud">
          <FontAwesomeIcon icon={faCloud} className="cloud1" />
          <FontAwesomeIcon icon={faCloud} className="cloud2" />
          <FontAwesomeIcon icon={faCloud} className="cloud3" />
          <FontAwesomeIcon icon={faCloud} className="cloud4" />
          <FontAwesomeIcon icon={faCloud} className="cloud5" />
        </div>
      </div>
    </div>
  );
};

export default NightToDayLoading;
