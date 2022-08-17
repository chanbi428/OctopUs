import React from "react";
import axios from "axios";
import { BASE_URL } from "../../api/BASE_URL";

export const exitRoom = async (roomId, userName) => {
  await axios.get(`${BASE_URL}/rooms/detail/roomid/${roomId}`).then((res) => {
    let getRoomInfo = res.data;
    let users = res.data.userList.split(",");
    getRoomInfo.userList = users;
    console.log("방 기존 정보", getRoomInfo);
    if (getRoomInfo.personNum === 1) {
      axios
        .delete(`${BASE_URL}/rooms/${roomId}`)
        .then(() => console.log("혼자일 때 방 나가기 완료"));
    } else {
      if (getRoomInfo.roomChief === userName) {
        getRoomInfo.userList.splice(
          getRoomInfo.userList.indexOf(userName),
          1,
          ""
        );
        for (let user of getRoomInfo.userList) {
          if (user !== userName && user !== "") {
            getRoomInfo.roomChief = user;
            break;
          }
        }
        getRoomInfo.personNum = getRoomInfo.personNum - 1;
        getRoomInfo.userList = getRoomInfo.userList.join();
        console.log("방 나갈 때 정보", getRoomInfo);
        axios
          .put(`${BASE_URL}/rooms`, JSON.stringify(getRoomInfo), {
            headers: {
              "Content-Type": `application/json`,
            },
          })
          .then((res) => console.log("방장일 때 방 나가기 완료", res.data));
      } else {
        getRoomInfo.userList.splice(
          getRoomInfo.userList.indexOf(userName),
          1,
          ""
        );
        getRoomInfo.personNum = getRoomInfo.personNum - 1;
        getRoomInfo.userList = getRoomInfo.userList.join();
        console.log("방 나갈 때 정보", getRoomInfo);
        axios
          .put(`${BASE_URL}/rooms`, JSON.stringify(getRoomInfo), {
            headers: {
              "Content-Type": `application/json`,
            },
          })
          .then((res) => console.log("방장 아닐 때 방 나가기 완료", res.data));
      }
    }
  });
};
export default exitRoom;
