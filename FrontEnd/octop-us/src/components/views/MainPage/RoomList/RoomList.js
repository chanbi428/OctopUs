import { useState, useEffect } from 'react';
import axios from 'axios';
import RoomListItem from '../RoomListItem/RoomListItem';
import './RoomList.css'

function RoomList () {

  const [roomInfo, setRoomInfo] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/rooms')
    .then(res => setRoomInfo(res.data))
    .catch(err => console.log(err))
  }, []);
  
  return (
    <div className="RoomList">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {
          roomInfo.map(item => {
            return <RoomListItem 
                    idx={item.idx} gameStatus={item.gameStatus}
                    personLimit={item.personLimit} personNum={item.personNum}
                    isPrivate={item.private} roomName={item.roomName} key={item.idx}/>
          })
        }
      </div>
    </div>
  );
}

export default RoomList;