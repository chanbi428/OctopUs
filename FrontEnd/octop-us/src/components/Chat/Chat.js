import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
// import "./Chat.css"


const Chat = () => {
  const client = useRef({});
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState(localStorage.getItem('wschat.sender'));
  const ROOM_SEQ = useParams().roomId;
  
  console.log(useParams().roomId + " : " + ROOM_SEQ);

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      //   brokerURL: "ws://localhost:8080/ws/chat", // 웹소켓 서버로 직접 접속
      webSocketFactory: () => new SockJS("https://localhost:8080/ws/chat"), // proxy를 통한 접속
      //여기서 /ws/chat 은 spring에서 StompWebSocketConfig 에서 EndPoint를 이렇게 설정해둬서 맞춰주는것
      //   connectHeaders: { // Interceptor로 인증 할 경우 사용
      //     "auth-token": "spring-chat-auth-token",
      //   },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
    // client.current.publish({
    //     destination: `/topic/chat/room/${ROOM_SEQ}`,
    //     body: JSON.stringify({type:'ENTER', roomId: ROOM_SEQ, sender: sender}), // spring에서 AxiosMessage 양식 맞게 보냄
    //   });
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = () => {
    console.log("subscribe sender : " + sender);
    client.current.subscribe(`/topic/chat/room/${ROOM_SEQ}`, ({ body }) => {
        console.log(JSON.parse(body));
      setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
    });
  };

  const publish = (message) => {
    if (!client.current.connected) {
      return;
    }
    console.log('publish' + JSON.stringify({type:'Chat', sender: "FE", senderName : sender, gameRange: "outgame", dataType: "waitingRoom", data: {message : message} }));
    client.current.publish({
      destination: `/topic/chat/room/${ROOM_SEQ}`,
      /* /topic + chat/room/${ROOM_SEQ}
      /topic -> spring에서 config 중 registry.setApplicationDestinationPrefixes("/app"); 에서 /app 링크
      /chat/room/${ROOM_SEQ} -> spring에서 SocketMessageController - SendTESTMessage에 보낼 링크*/

      body: JSON.stringify({type:'Chat', sender: "FE", senderName : sender, gameRange: "outgame", dataType: "waitingRoom", data: {message : message} }), // spring에서 AxiosMessage 양식 맞게 보냄
    });

    setMessage("");
  };

//   const clickExpendBtn = (e) => {
//     if (isClose === true) {

//     }
//   }

  const scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({behavior : 'smooth'})
  }

  const componentDidMount = () => {
    this.scrollToBottom();
  }

  const componentDidUpdate = () => {
    this.scrollToBotton();
  }

  return (
    <div>
      <div className="container">
        {chatMessages && chatMessages.length > 0 && (
          <ul className="list-group" >
            {chatMessages.map((_chatMessage, index) => (
              <li className="list-group-item" key={index}>
                {_chatMessage.type ==='ENTER'?'[알림] '+_chatMessage.data.message:'['+_chatMessage.senderName+'] '+_chatMessage.data.message}
              </li>
            ))}
          </ul>
        )}
        <div className="input-group">
          {/* <button className="" onClick={clickExpendBtn} isClose="true" >▲</button> */}
          <input
            className="form-control"
            type={"text"}
            placeholder={"채팅을 입력하세요."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.which === 13 && publish(message)}
          />
          <button className="btn btn-primary" onClick={() => publish(message)}>
            보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
