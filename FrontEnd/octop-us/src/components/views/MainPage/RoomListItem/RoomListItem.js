import './RoomListItem.css'

function RoomListItem ({item}) {

  const onClickEnterRoom = (e) => {
    e.preventDefault();

    let userList = item.userList.split(',')
    userList[userList.indexOf("")] = 'currentUser'

    const data = {
      roomChief : 'host1',
      isPrivate : item.isPrivate,
      roomName : item.roomName,
      personLimit : item.personLimit,
      roomPw : item.roomPw,
      gameTime : item.gameTime,
      userList : userList.join(),
      roomId : item.roomId
    }

    
  }

  return (
  <div className="col">
    <div className="card">
      <div className="card-body">
        <div className="RoomHeader">
          <p>{item.idx}</p>
          <p>{item.personNum} / {item.personLimit}</p>
        </div>
        <h5 className="card-title">{item.roomName} {item.isPrivate}</h5>
        <div className="RoomFooter">
          <div>{item.isPrivate &&
            <p className="RoomPrivate">자물쇠</p>
            }
          </div>{item.gameStatus ? <button disabled>게임중</button> : <button onClick={onClickEnterRoom}>게임시작</button>}
        </div>
      </div>
    </div>
  </div>
  );
}

export default RoomListItem