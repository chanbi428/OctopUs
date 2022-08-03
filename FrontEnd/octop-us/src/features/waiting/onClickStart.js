import React from 'react';
import axios from 'axios';
import { sendMessage } from "./sendMessage";


export const onClickStart = async (roomId, userName) => {
    const navigate = useNavigate();
    //6인 이상 시작 조건문 넣기
    await axios
    .get(`http://localhost:8080/rooms/detail/roomid/${roomId}`)
    .then((res) => {
        console.log(res.data)
        let information = res.data
        let usersInfo = res.data.userList(",")
        const data = {
            users : usersInfo,
            roomId : roomId
        };
        await axios
            .post("http://localhost:8080/games", data, {
            headers: {
              "Content-Type": `application/json`,
            },
        })
    })
    .catch((err) => console.log(err));

    const message = {
        datatype : "slot",
        data : "night"
    };
    await sendMessage(message);
    await axios
        .get(`http://localhost:8080/gamer/${userName}`)
        .then((res) => {
        const inGameJob = res.data.gameJob;
        console.log(inGameJob);
        // setGameJob = inGameJob
        // 리덕스로 인게임 유저 정보에 저장하기!
        await axios.put(`http://localhost:8080/rooms/update/status/start/${roomId}`, {
            headers: {
            "Content-Type": `application/json`,
            }})
            .then(() => document.location.href = "https://localhost:3000/ingame") // 주소 손보고 연결 방식 바꾸기
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
        

    // const getRoomInfoa = axios.get(
    //   `http://localhost:8080/rooms/detail/roomid/${roomId}`
    // );
    // .then((res)=> {
    //   console.log(res.data)
    //   const users = res.data.userList.split(",");
    // })
    // console.log(getRoomInfo);
    // const users = getRoomInfo.userList.split(",");
    // for (let user of users) {
    //   let cnt = 0;
    //   if (user === "") {
    //     cnt = cnt + 1;
    //     users.splice(users.indexOf(user), 1);
    //   }
    // }
    // const data = {
    //   users: users,
    //   roomId: getRoomInfo.roomId,
    // };
    // await axios.post("http://localhost:8080/games", data, {
    //   headers: {
    //     "Content-Type": `application/json`,
    //   },
    // });
    // const message = {
    //   datatype : "slot",
    //   data : "night"
    // }
    // // 소켓 게임 시작 알림
    // await sendMessage(message);
    // // 직업을 가져온다
    // await axios
    //   .get(`http://localhost:8080/gamer/${"userInfo.userName"}`)
    //   .then((res) => {
    //     const inGameJob = res.data.gameJob;
    //     console.log(inGameJob);
    //     // setGameJob = inGameJob
    //     // 리덕스? 스테이트?
    //     axios.put(`http://localhost:8080/rooms/update/status/start/${roomId}`, {
    //       headers: {
    //         "Content-Type": `application/json`,
    //       },
    //     });
    //     // 밤으로 넘어간다 => 소켓? 링크인가
    //   });
  };