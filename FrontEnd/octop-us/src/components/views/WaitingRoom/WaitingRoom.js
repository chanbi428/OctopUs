import React, {useState, useEffect } from 'react';
import axios from "axios";
import SeatsRoom from './SeatsRoom';
import MakeRoom from '../MakeRoom/MakeRoom'
import Card from '../../Card/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import './WaitingRoom.css'
import ShowRoom from './ShowRoom'
import { useSelector } from 'react-redux';

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
    let [seats, setSeats] = useState([{nickname:"", opacity:0}, {nickname:"", opacity:0}, {nickname:"", opacity:0}, {nickname:"", opacity:0}, {nickname:"", opacity:0}, {nickname:"", opacity:0}, {nickname:"", opacity:0}, {nickname:"", opacity:0}])
    let [throne, setThrone] = useState([{crown:0}, {crown:0}, {crown:0}, {crown:0}, {crown:0}, {crown:0}, {crown:0}, {crown:0}])
    
    const { userInfo } = useSelector((state) => state.user)

    // 방 입장 시 데이터 받아옴 (방 만들기가 아니라 호스트 이외 사람이 들어올 때)
    useEffect(() => {
        let pathName = document.location.pathname.replace("/", "")
        console.log(pathName)
        axios.get(`http://localhost:8080/rooms/detail/roomid/${pathName}`)
        .then(res => {
            console.log(res.data)
            // console.log(userInfo.userName)
            const tmp = res.data.userList.split(',')
            console.log(tmp)
            // updateRoomInfo(...res.data, userList=tmp)
            updateRoomInfo(res.data.gameStatus, res.data.gameTime, res.data.idx, res.data.personLimit, res.data.personLimit, res.data.personNum, res.data.isPrivate, res.data.roomChief, res.data.roomId, res.data.roomName, res.data.roomPw, tmp)
            console.log(seats, throne)
            sitRoom()
            getCrown()
            setTimeout(console.log(seats, userList), 1000)
        })
        .catch((error)=> console.log(error))
    }, [])

    // 유저 목록이 변경되면 문어 자리 다시 앉히고 다시 왕관 배정
    useEffect(() => {
        sitRoom();
        getCrown();
    }, [userList])

    const sitRoom = () => {
        let sit = []
        for (let i=0; i < personLimit; i++) {
            if ( userList[i] !== "") {
                console.log(userList[i])
                sit = sit.concat({
                    nickname : userList[i],
                    opacity : 1
                })
            } else {
                sit = sit.concat({
                    nickname : "",
                    opacity : 0
                })
            }
        }
        setSeats(sit)
    }

    const getCrown = () => {
        let crown = []
        for (let j=0; j < personLimit; j++) {
            if (userList[j] === roomChief) {
                crown = crown.concat({
                    crown : 1
                })
            } else {
                crown = crown.concat({
                    crown : 0
                })
            }
        }
        setThrone(crown)
    }

    // 방 나가기 구현... 소켓 신호 보내는 부분 못함
	const exitRoom = async() => {
        let getRoomInfo = await axios.get(`http://localhost:8080/rooms/detail/roomid/${roomId}`)
        .then(res => {
        //     // const temp = JSON.parse(res.data)
        //     // getRoomInfo = temp
            // console.log(res)
            // console.log(res.data)
        })
        // const temp = JSON.parse(getRoomInfo)
        // console.log(getRoomInfo)
        // console.log(temp)
        const usersInfo = await getRoomInfo.userList.split(',')
        updateRoomInfo(getRoomInfo.gameStatus, getRoomInfo.gameTime, getRoomInfo.idx, getRoomInfo.personLimit, getRoomInfo.personNum, getRoomInfo.isPrivate, getRoomInfo.roomChief, getRoomInfo.roomId, getRoomInfo.roomName, getRoomInfo.roomPw, usersInfo)
        let userListInfo = userList
        let roomChiefInfo = roomChief
        if (personNum === 1) {
            axios.delete(`http://localhost:8080/rooms/${roomId}`)
            // 소켓으로 방 탈출 요청
        } else if (personNum >= 2) {
            if ('userInfo.userName' === roomChief) {
                // 유저 닉네임 정보 필요함
                for (let user of userListInfo) {
                    if (user !== 'userInfo.userName' && user !== "") {
                        roomChiefInfo = user
                        break;
                    }
                } 
            }
            userListInfo.splice(userListInfo.indexOf('userInfo.userName'), 1, "")
            // let personNumInfo = personNum - 1
            updateRoomInfo(gameStatus, gameTime, idx, personLimit, personNum - 1, isPrivate, roomChiefInfo, roomId, roomName, roomPw, userListInfo)
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
            await axios.put('http://localhost:8080/rooms', JSON.stringify(data), {
                headers: {
                    "Content-Type": `application/json`,
                  }
            })
            console.log(data)
        }
        // 메인페이지로 이동
	
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
        console.log(gameStatus, gameTime, idx, personLimit, personNum, isPrivate, roomChief, roomId, roomName, roomPw, userList)
	}


    const onClickStart = async () => {
        //6인 이상 시작 조건문 넣기
        const getRoomInfo = await axios.get(`http://localhost:8080/rooms/detail/roomid/${roomId}`)
        console.log(getRoomInfo)
        const users = getRoomInfo.userList.split(',')
        for (let user of users) {
            let cnt = 0
            if (user === "") {
                cnt = cnt + 1
                users.splice(users.indexOf(user), 1)
            }
        }
        const data = {
            users : users,
            roomId : getRoomInfo.roomId
        }
        await axios.post('http://localhost:8080/games', data, {
            headers: {
                "Content-Type": `application/json`,
            }
        })
        // 소켓 게임 시작 알림
        await sendMessage()
        // 직업을 가져온다
        await axios.get(`http://localhost:8080/gamer/${'userInfo.userName'}`)
        .then(res => {
            const inGameJob = res.data.gameJob
            console.log(inGameJob)
            // setGameJob = inGameJob
            // 리덕스? 스테이트?
            axios.put(`http://localhost:8080/rooms/update/status/start/${roomId}`, {
                headers: {
                    "Content-Type": `application/json`,
                }
            })
            // 밤으로 넘어간다 => 소켓? 링크인가
        })

    }

    const sendMessage= () => {
        const data = {
            type : 'system',
            sender : 'FE',
            senderName : 'server',
            gameRange : 'ingame',
            dataType : 'order',
            data : {
                datatype : "slot",
                data : "night"
            }
        }
        this.props.user.getStreamManager().stream.session.signal({
            data: JSON.stringify(data),
            type: 'chat',
        });
        console.log("sendMessage : " + JSON.stringify(data));
                // this.sendMessage(JSON.stringify(data));
        // console.log(this.state.message);
        // if (this.props.user && this.state.message) {
        //     let message = this.state.message.replace(/ +(?= )/g, '');
        //     if (message !== '' && message !== ' ') {
        //         const data = {
        //             type : 'system',
        //             sender : 'FE',
        //             senderName : 'server',
        //             gameRange : 'ingame',
        //             dataType : 'order',
        //             data : {
        //                 datatype : "slot",
        //                 data : "night"
        //             }
        //         }
        //         this.props.user.getStreamManager().stream.session.signal({
        //             data: JSON.stringify(data),
        //             type: 'chat',
        //         });
        //         console.log("sendMessage : " + JSON.stringify(data));
        //         // this.sendMessage(JSON.stringify(data));
        //     }
        // }
        this.setState({ message: '' });
    }
	

	return (
		<div>
			<nav className="d-flex flex-row flex-between">
				<p className="col">렌더링 테스트</p>
				<button onClick={exitRoom} className="col">방 나가기</button>
			</nav>
            <div className="waiting_box">
                <div className="waiting_upper">
                    <div className="testing_block">testing</div>
                    {/* <SeatsRoom seats={seats} throne={throne}/> */}
                </div>
                <div className="waiting_lower ">
                    <div className="room_box col">
                        { 'userInfo.userName' === roomChief ? <MakeRoom /> : <ShowRoom />}
                    </div>
                    <div className="col">
                        {/* 채팅 */}
                        <Card>
                            <div className="CardBody chat_box" style={{ height:300}}>
                                채팅 들어올 자리
                            </div>
                        </Card>
                    </div>
                    <div className="col">
                        <Card>
                            <div className="CardBody cam" style={{height:200}}>
                                {/*웹캠*/}
                                웹캠 배치용
                            </div>
                        </Card>
                        <button className="start_btn " onClick = {onClickStart}>START</button>
                        {/* <a href="#" className="" onClick = {onClickStart}>START</a> */}
                        {/* { userInfo.userName === roomChief && <button className="start_btn" onClick = {onClickStart}>START</button> } */}
                    </div>
                </div>
            </div>
            
		</div>
	)
}