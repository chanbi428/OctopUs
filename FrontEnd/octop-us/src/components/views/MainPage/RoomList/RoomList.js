import RoomListItem from "../RoomListItem/RoomListItem";
import "./RoomList.css";
import Card from "../../../Card/Card";

function RoomList({ roomInfo }) {
  return (
    <Card>
      <div className="RoomList">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {roomInfo.map((item) => {
            return <RoomListItem item={item} key={item.idx} />;
          })}
        </div>
      </div>
    </Card>
  );
}

export default RoomList;
