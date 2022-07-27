import './RoomListItem.css'

function RoomListItem ({idx, gameStatus, personLimit, personNum, isPrivate, roomName}) {
  return (
  <div class="col">
    <div class="card">
      <div class="card-body">
        <div className="RoomHeader">
          <p>{idx}</p>
          <p>{personNum} / {personLimit}</p>
        </div>
        <h5 class="card-title">{roomName} {isPrivate}</h5>
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