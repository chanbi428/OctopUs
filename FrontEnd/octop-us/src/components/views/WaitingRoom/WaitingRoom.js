import React, {useState} from 'react';
import axios from "axios";
// import MakeRoom from './MakeRoom/MakeRoom'

export default function WaitingRoom() {
    const [gameStatus, setGameStatus] = useState(false)
	const [gameTime, setGameTime] = useState("")
	const [idx, setIdx] = useState("")
	const [personLimit, setPersonLimit] = useState("")
	const [personNum, setPersonNum] = useState("")
	const [isPrivate, setIsPrivate] = useState("")
	const [roomChief, setRoomChief] = useState("")
	const [roomId, setRoomId] = useState("")
	const [roomName, setRoomName] = useState("")
	const [roomPw, setRoomPw] = useState("")
	const [userList, setUserList] = useState([])

	const exitRoom = async() => {
        const getRoomInfo = await axios.get(`http://localhost:8080/rooms/detail/roomid/${roomId}`)
        console.log(getRoomInfo)
        const usersInfo = await getRoomInfo.userList.split(',')
        updateRoomInfo(getRoomInfo.gameStatus, getRoomInfo.gameTime, getRoomInfo.idx, getRoomInfo.personLimit, getRoomInfo.personNum, getRoomInfo.isPrivate, getRoomInfo.roomChief, getRoomInfo.roomId, getRoomInfo.roomName, getRoomInfo.roomPw, getRoomInfo.usersInfo)
        let userListInfo = userList
        let roomChiefInfo = roomChief
        if (personNum === 1) {
                axios.delete(`http://localhost:8080/rooms/${roomId}`)
                // 소켓으로 방 탈출 요청
        } else if (personNum >= 2) {
            if ('userName' === roomChief) {
                // 유저 닉네임 정보 필요함
                for (let user of userListInfo) {
                    if (!user === 'userName' && !user === "") {
                        roomChiefInfo = user
                        break;
                    }
                } 
            }
            userListInfo.splice(userListInfo.indexOf('userName'), 1)
            let personNumInfo = personNum - 1
            updateRoomInfo(gameStatus, gameTime, idx, personLimit, personNum, isPrivate, roomChiefInfo, roomId, roomName, roomPw, userListInfo)
            const data = {
                gameStatus: gameStatus,
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


	const updateRoomInfo = (gameStatus, gameTime, idx, personLimit, personNum, isPrivate, roomChief, roomId, roomName, roomPw, userList) =>{
		setGameStatus(gameStatus)
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
        const users = getRoomInfo.userList.split(',')
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