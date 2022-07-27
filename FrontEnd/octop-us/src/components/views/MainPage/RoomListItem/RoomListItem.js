import './RoomListItem.css'

function RoomListItem ({idx, gameStatus, personLimit, personNum, isPrivate, roomName}) {
  return (
  <div className="col">
    <div className="card">
      <div className="card-body">
        <div className="RoomHeader">
          <p>{idx}</p>
          <p>{personNum} / {personLimit}</p>
        </div>
        <h5 className="card-title">{roomName} {isPrivate}</h5>
        <div className="RoomFooter">
          <div>{isPrivate &&
            <p className="RoomPrivate">자물쇠</p>
            }
          </div>{gameStatus ? <button disabled>게임중</button> : <button>게임시작</button>}
        </div>
      </div>
    </div>
  </div>
  );
}

export default RoomListItem