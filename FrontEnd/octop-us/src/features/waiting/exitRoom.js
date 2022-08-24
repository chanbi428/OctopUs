import React from "react";
import axios from "axios";
import { BASE_URL } from "../../api/BASE_URL";

export const exitRoom = async (roomId, userName) => {
  await axios.get(`${BASE_URL}/rooms/detail/roomid/${roomId}`).then((res) => {
    let getRoomInfo = res.data;
    let users = res.data.userList.split(",");
    getRoomInfo.userList = users;
    if (getRoomInfo.personNum === 1) {
      axios
        .delete(`${BASE_URL}/rooms/${roomId}`)
        .then();
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
        axios
          .put(`${BASE_URL}/rooms`, JSON.stringify(getRoomInfo), {
            headers: {
              "Content-Type": `application/json`,
            },
          })
          .then();
      } else {
        getRoomInfo.userList.splice(
          getRoomInfo.userList.indexOf(userName),
          1,
          ""
        );
        getRoomInfo.personNum = getRoomInfo.personNum - 1;
        getRoomInfo.userList = getRoomInfo.userList.join();
        axios
          .put(`${BASE_URL}/rooms`, JSON.stringify(getRoomInfo), {
            headers: {
              "Content-Type": `application/json`,
            },
          })
          .then();
      }
    }
  });
};
export default exitRoom;
