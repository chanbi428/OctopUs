import React from 'react'
import './ShowRoom.css';
import Card from '../Card/Card'

export default function ShowRoom({roomName, personLimit, personNum, roomId, isPrivate, roomPw, gameTime, roomChief}) {
    return (
        <div>
            <Card className="MakeRoom">
                <div className="CardHeader">
                <h2>방 설정</h2>
                </div>
                <div className="CardBody">
                    <p>방 이름 : </p>
                    <div>{roomName}</div>
                </div>
                <div className="CardBody">
                    <p>인원 : </p>
                    <div>{personNum} / {personLimit}</div>
                </div>
                <div className="CardBody">
                    <p>회의 시간 : </p>
                    <div>{gameTime}</div>
                </div>
                <div className="CardBody">
                    <p>공개 방 여부 : </p>
                    { isPrivate === false ? <div>공개방</div> : <div>비공개방</div> }
                    {isPrivate === "true" &&
                    <div className="CardBody">  
                        <p>방 비밀번호</p>
                        <div>{roomPw}</div>
                    </div>
                    }
                </div>
            </Card>
        </div>
    )
}