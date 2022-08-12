import React from 'react'
import './ShowRoom.css';
import Card from "../../../Card/Card"

export default function ShowRoom({roomName, personNum, isPrivate, roomPw, gameTime, roomChief}) {
    return (
        <div>
            <Card className="ShowRoom">
                <div className="ShowCardHeader">
                    <h2>방 정보</h2>
                </div>
                <div className="CardBody">
                    <p className="ShowInfo">방 이름 : {roomName}</p>
                </div>
                <div className="CardBody">
                    <p className="ShowInfo">방장 : {roomChief}</p>
                </div>
                <div className="CardBody">
                    <p className="ShowInfo">인원 : {personNum} / 8</p>
                </div>
                <div className="CardBody">
                    <p className="ShowInfo">회의 시간 : {gameTime} 초</p>
                </div>
                { isPrivate ? 
                <div className="CardBody">
                    <p className="ShowInfo">공개 방 여부 : 비공개</p>
                    <p className="ShowInfo">비밀번호 : {roomPw}</p>
                </div>
                : 
                <div className="CardBody">
                    <p className="ShowInfo">공개 방 여부 : 공개</p>
                </div>
                }
            </Card>
        </div>
    )
}