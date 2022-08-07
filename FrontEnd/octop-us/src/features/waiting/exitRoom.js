import React from 'react';
import axios from 'axios';

export const exitRoom = async (roomId, userName) => {
    await axios
      .get(`http://localhost:8080/rooms/detail/roomid/${roomId}`)
      .then((res) => {
        let getRoomInfo = res.data
        let users = res.data.userList.split(', ')
        getRoomInfo.userList = users
        console.log("방 기존 정보",getRoomInfo)
        if (getRoomInfo.personNum === 1) {
            axios.delete(`http://localhost:8080/rooms/${roomId}`)
            .then(()=> console.log("혼자일 때 방 나가기 완료"))
        } else {
            if (getRoomInfo.roomChief === userName) {
                getRoomInfo.userList.splice(getRoomInfo.userList.indexOf(userName),1," ")
                for (let user of getRoomInfo.userList) {
                    if (user !== userName && user !== "" && user !== " ") {
                      getRoomInfo.roomChief = user;
                      break;
                    }
                }
                getRoomInfo.personNum = getRoomInfo.personNum - 1
                getRoomInfo.userList = getRoomInfo.userList.join(", ")
                console.log("방 나갈 때 정보", getRoomInfo)
                axios.put("http://localhost:8080/rooms", JSON.stringify(getRoomInfo), {
                    headers: {
                    "Content-Type": `application/json`,
                    },
                })
                .then((res)=> console.log("방장일 때 방 나가기 완료", res.data))
            } else {
                getRoomInfo.userList.splice(getRoomInfo.userList.indexOf(userName),1," ")
                getRoomInfo.personNum = getRoomInfo.personNum - 1
                getRoomInfo.userList = getRoomInfo.userList.join(", ")
                console.log("방 나갈 때 정보", getRoomInfo)
                axios.put("http://localhost:8080/rooms", JSON.stringify(getRoomInfo), {
                    headers: {
                    "Content-Type": `application/json`,
                    },
                })
                .then((res) => console.log("방장 아닐 때 방 나가기 완료", res.data))
            }
        }
      });
  };
export default exitRoom;