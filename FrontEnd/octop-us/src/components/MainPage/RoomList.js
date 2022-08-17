import RoomListItem from "./RoomListItem";
import "./RoomList.css";

function RoomList({ roomInfo, pauseBgmAudio }) {
  return (
    <div className="room-list room-list__scroll">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {roomInfo.map((item) => {
          return <RoomListItem item={item} key={item.idx} pauseBgmAudio={pauseBgmAudio} />;
        })}
      </div>
    </div>
  );
}

export default RoomList;
