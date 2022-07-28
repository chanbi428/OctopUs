import axios from 'axios';
import './RoomListItem.css'

function RoomListItem ({item}) {

  const onClickEnterRoom = (e) => {
    e.preventDefault();

    if (item.gameStatus === "true") {
      alert('이미 게임중입니다!')
    } else if (item.personNum >= item.personLimit) {
      alert('방 인원이 꽉 찼습니다.')
    } else {
      let userList = item.userList.split(',')
      console.log(userList)
      userList[userList.indexOf("")] = 'currentUser'
      console.log(userList)
      const personNum = item.personNum + 1
      const data = {
        roomChief : 'host1',
        isPrivate : item.isPrivate,
        roomName : item.roomName,
        personLimit : item.personLimit,
        personNum : personNum,
        roomPw : item.roomPw,
        gameTime : item.gameTime,
        userList : userList.join(),
        roomId : item.roomId,
      }
      axios.put('http://localhost:8080/rooms',JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        }
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
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