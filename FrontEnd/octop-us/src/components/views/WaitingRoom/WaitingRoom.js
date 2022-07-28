import React, {useState} from 'react';
import axios from "axios";
// import MakeRoom from './MakeRoom/MakeRoom'

// gameStatus": true,
//   "gameTime": 0,
//   "idx": 0,
//   "personLimit": 0,
//   "personNum": 0,
//   "private": true,
//   "roomChief": "string",
//   "roomId": "string",
//   "roomName": "string",
//   "roomPw": "string",
//   "userList": "string"
// }

export default function WaitingRoom() {
	const [gameTime, setGameTime] = useState()
	const [idx, setIdx] = useState()
	const [personLimit, setPersonLimit] = useState()
	const [personNum, setPersonNum] = useState()
	const [isPrivate, setIsPrivate] = useState()
	const [roomChief, setRoomChief] = useState()
	const [roomId, setRoomId] = useState()
	const [roomName, setRoomName] = useState()
	const [roomPw, setRoomPw] = useState()
	const [userList, setUserList] = useState()

	const exitRoom = async() => {
		const getRoomInfo = await axios.get(`http://localhot:8080/rooms/detail/roomid/${roomId}`)
        console.log(getRoomInfo)
        const usersInfo = await getRoomInfo.userList.splice(',')
		updateRoomInfo(getRoomInfo.gameTime, getRoomInfo.idx, getRoomInfo.personLimit, getRoomInfo.personNum, getRoomInfo.isPrivate, getRoomInfo.roomChief, getRoomInfo.roomId, getRoomInfo.roomName, getRoomInfo.roomPw, getRoomInfo.usersInfo)
		let userListInfo = userList
        let roomChiefInfo = roomChief
		if (personNum === 1) {
				axios.delete(`http://localhost:8080/rooms/${roomId}`)
				// 소켓으로 방 탈출 요청
		} else if (personNum >= 2) {
            if ('userName' === roomChief) {
                // 유저 닉네임 정보 필요함
                for (let user of userListInfo) {
                    if (user != 'userName' && user != "") {
                        roomChiefInfo = user
                        break;
                    }
                } 
            }
            userListInfo.splice(userListInfo.indexOf('userName'), 1)
            let personNumInfo = personNum - 1
            updateRoomInfo(gameTime, idx, personLimit, personNum, isPrivate, roomChiefInfo, roomId, roomName, roomPw, userListInfo)
            const data = {
                gameTime : gameTime,
                idx : idx,
                personLimit : personLimit,
                isPrivate : isPrivate,
                roomChief : roomChief,
                roomId : roomId,
                roomName : roomName,
                roomPw : roomPw,
                userList : userList
            }
            const updateRoom = await axios.put('http://localhost:8080/rooms', data=data)
            console.log(data)
		}
        // 소켓으로 방 나감 알림

	}


	const updateRoomInfo = (gameTime, idx, personLimit, personNum, isPrivate, roomChief, roomId, roomName, roomPw, userList) =>{
		setGameTime(gameTime)
		setIdx(idx)
		setPersonLimit(personLimit)
		setPersonNum(personNum)
		setIsPrivate(isPrivate)
		setRoomChief(roomChief)
		setRoomId(roomId)
		setRoomName(roomName)
		setRoomPw(roomPw)
		setUserList(userList)
	}

    // const exitAlarm = () => {
    //     if (WebSocket.emit("disconnection") {

    //     })
    // }

    const startGame = async () => {
        const getRoomInfo = await axios.get(`http://localhost:8080/rooms/detail/roomid/${roomId}`)
        console.log(getRoomInfo)
        const users = getRoomInfo.userList.splice(',')
        for (let user of users) {
            let cnt = 0
            if (user === "") {
                cnt = cnt + 1
                users.splice(users.indexOf(user), 1)
            }
            users.push("")
        }
        const params = {
            users : users,
            roomId : getRoomInfo.roomId
        }
        const sendRoomInfo = await axios.post('http://localhost:8080/games', params)
        // 소켓 게임 시작 알림
    }
	

	return (
		<div>
			<div>
				렌더링 테스트
				<button onClick={exitRoom}>방 나가기</button>
			</div>
			<div>
				<div>
					{/* 채팅 */}
				</div>
				<div>
					{/*웹캠*/}
					{/* <Link to="/"><button>START</button></Link> */}
					<button onClick = {startGame}>START</button>
				</div>
			</div>
		</div>
	)
}