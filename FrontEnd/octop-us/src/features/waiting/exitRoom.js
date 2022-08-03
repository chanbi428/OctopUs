import React from 'react';
import axios from 'axios';

export const exitRoom = async (roomId, userName) => {
    console.log(roomId)
    await axios
      .get(`http://localhost:8080/rooms/detail/roomid/${roomId}`)
      .then((res) => {
        let getRoomInfo = res.data
        let users = res.data.userList.split(',')
        getRoomInfo.userList = users
        if (getRoomInfo.personNum === 1) {
            axios.delete(`http://localhost:8080/rooms/${roomId}`)
            .then(() => document.location.href = "http://localhost:3000/main")
            // 세션 떠남 알림 필요 없나?
        }
        if (getRoomInfo.roomChief === userName) {
            getRoomInfo.userList.splice(getRoomInfo.userList.indexOf(userName),1," ")
            for (let user of getRoomInfo.userList) {
                if (user !== userName && user !== "" && user !== " ") {
                  getRoomInfo.roomChief = user;
                  break;
                }
            }
            getRoomInfo.personNum = getRoomInfo.personNum - 1
            getRoomInfo.userList = getRoomInfo.userList.join()
            axios.put("http://localhost:8080/rooms", JSON.stringify(getRoomInfo), {
                headers: {
                "Content-Type": `application/json`,
                },
            })
            .then(() => document.location.href = "http://localhost:3000/main")
        } else {
            getRoomInfo.userList.splice(getRoomInfo.userList.indexOf(userName),1," ")
            getRoomInfo.personNum = getRoomInfo.personNum - 1
            getRoomInfo.userList = getRoomInfo.userList.join()
            axios.put("http://localhost:8080/rooms", JSON.stringify(getRoomInfo), {
                headers: {
                "Content-Type": `application/json`,
                },
            })
            .then(() => {
                document.location.href = "http://localhost:3000/main"
            })
            // 방 떠날 때 세션 알림 필요한가? 방 떠날 때 방장에게 알려야 하는 거 아닌가?
        }
      });
  };
export default exitRoom;