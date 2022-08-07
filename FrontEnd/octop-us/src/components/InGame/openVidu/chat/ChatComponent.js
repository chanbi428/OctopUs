import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import HighlightOff from "@material-ui/icons/HighlightOff";
import Send from "@material-ui/icons/Send";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./ChatComponent.css";
import { Tooltip } from "@material-ui/core";
import { connect } from "react-redux";
import axios from "axios";
import { updateRoomId, updateUserList } from "../../../../features/waiting/waitSlice";
import { gamerUserList } from "../../../../features/gamer/gamerActions";
import { setGamerInit } from "../../../../features/gamer/gamerSlice";

class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      message: "",
    };
    this.chatScroll = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.close = this.close.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.enterNotice = this.enterNotice.bind(this);
    this.exitNotice = this.exitNotice.bind(this);
    this.gameNotice = this.gameNotice.bind(this);
  }

  componentDidMount() {
    this.props.user.getStreamManager().stream.session.on("signal:chat", (event) => {
      const data = JSON.parse(event.data);
      let messageList = this.state.messageList;
      messageList.push({
        connectionId: event.from.connectionId,
        nickname: data.nickname,
        message: data.message,
      });
      const document = window.document;
      setTimeout(() => {
        const userImg = document.getElementById("userImg-" + (this.state.messageList.length - 1));
        const video = document.getElementById("video-" + data.streamId);
        const avatar = userImg.getContext("2d");
        avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
      }, 50);
      this.setState({ messageList: messageList });
      this.scrollToBottom();
    });
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handlePressKey(event) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }

  sendMessage() {
    console.log(this.state.message);
    if (this.props.user && this.state.message) {
      let message = this.state.message.replace(/ +(?= )/g, "");
      if (message !== "" && message !== " ") {
        const data = {
          message: message,
          nickname: this.props.user.getNickname(),
          streamId: this.props.user.getStreamManager().stream.streamId,
        };
        this.props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    this.setState({ message: "" });
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.chatScroll.current.scrollTop = this.chatScroll.current.scrollHeight;
      } catch (err) {}
    }, 20);
  }

  close() {
    this.props.close(undefined);
  }

  enterNotice() {
    console.log("입장 알림");
    const data = {
      message: `[알림] 누구님이 입장하셨습니다`,
      nickname: "서버",
      streamId: this.props.user.getStreamManager().stream.streamId,
    };
    this.props.user.getStreamManager().stream.session.signal({
      data: JSON.stringify(data),
      type: "chat",
    });
    // console.log("메시지 수신 확인", this.state.message)
    // console.log("목록 확인", this.state.messageList)
    // console.log("메시지 확인", this.state.messageList.at(-1))
  }

  exitNotice() {
    console.log("입장 알림");
    const data = {
      message: `[알림] 누구님이 퇴장하셨습니다`,
      nickname: "서버",
      streamId: this.props.user.getStreamManager().stream.streamId,
    };
    this.props.user.getStreamManager().stream.session.signal({
      data: JSON.stringify(data),
      type: "chat",
    });
  }

  gameNotice() {
    console.log("게임 시작 알림");
    const data = {
      message: `[게임] 게임을 시작합니다`,
      nickname: "서버",
      streamId: this.props.user.getStreamManager().stream.streamId,
    };
    this.props.user.getStreamManager().stream.session.signal({
      data: JSON.stringify(data),
      type: "chat",
    });
  }

  cancelNotice() {
    console.log("notice 감지 후 동작, 그 후 messageList 초기화 위함");
    const data = {
      message: ``,
      nickname: "서버",
      streamId: this.props.user.getStreamManager().stream.streamId,
    };
    this.props.user.getStreamManager().stream.session.signal({
      data: JSON.stringify(data),
      type: "chat",
    });
  }

  settingRoomId = (data) => {
    this.props.setRoomId(data);
  };

  settingUserList = (data) => {
    this.props.setUserList(data);
  };

  settingGamerInit = (data) => {
    this.props.setInit(data);
  };

  settingGamerList = (data) => {
    this.props.setGamerList(data);
  };

  componentDidUpdate(prevState) {
    if (this.state.messageList.length !== prevState.messageList) {
      console.log(this.UserModel);
      let msg = this.state.messageList.at(-1).message;
      if (msg.includes("[알림]")) {
        // console.log("개인이 감지해야함", this.props.waitData.roomId)  // roomChief를 알거나, roomId를 알거나...
        axios
          .get(`http://localhost:8080/rooms/detail/roomid/${this.props.waitData.roomId}`)
          .then((res) => {
            // state에 seats를 저장하거나 state에 유저리스트를 저장한다. 유저리스트 저장이 좀 더 쓸모 있을 것 같다.
            // console.log("문어자리 업데이트용-chatcompo", res.data)
            const roomNum = res.data.roomId;
            const users = res.data.userList.split(", ");
            console.log("유저 비교!!!", users, this.props.waitData.userList);
            if (this.props.waitData.userList !== users || this.props.waitData.roomId !== roomNum) {
              this.settingRoomId({ roomId: roomNum });
              console.log("업데이트 아이디 확인", this.props.waitData);
              this.settingUserList(users);
              console.log("업데이트 리스트 확인", this.props.waitData);
              const lst = this.state.messageList.concat({
                connectionId: this.props.user.getStreamManager().stream.streamId,
                message: "",
                nickname: "",
              });
              this.setState({ messageList: lst });
            }
          });
      } else if (msg.includes("[게임]")) {
        const userName = this.props.userData.userInfo.userName
        console.log(userName)
        // console.log("게임 시작 감지!" , this.props,)
        axios.get(`http://localhost:8080/gamers/${userName}`).then((res) => {
          console.log("DB에서 유저 개인 게임 정보 받아오기 성공!", res.data);
          const roomNum = this.props.waitData.roomId;

          // // 다영
          this.settingGamerInit(res.data);
          console.warn("REDUX : GAMER INIT1 : USER");
          console.log("업데이트 게이머 확인", this.props.gamerData);

          this.settingGamerList(roomNum);
          console.warn("REDUX : GAMER INIT2 : USERLIST");
          console.log("업데이트 게이머 유저리스트 확인", this.props.gamerData);

          this.settingUserList(roomNum);

          const lst = this.state.messageList.concat({
            connectionId: this.props.user.getStreamManager().stream.streamId,
            message: "",
            nickname: "",
          });
          this.setState({ messageList: lst });
        });
      }
    }
  }

  componentWillUnmount() {
    console.log("chatComponent unmount!!");
  }

  render() {
    const styleChat = { display: this.props.chatDisplay };
    const { waitData, userData, gamerData, setRoomId, setUserList, setGamerList, setInit } =
      this.props;
    return (
      <div id="chatContainer">
        <div id="chatComponent" style={styleChat}>
          <div className="message-wrap" ref={this.chatScroll}>
            {this.state.messageList.map((data, i) => (
              <div
                key={i}
                id="remoteUsers"
                className={
                  "message" +
                  (data.connectionId !== this.props.user.getConnectionId() ? " left" : " right")
                }
              >
                <div className="msg-detail">
                  <div className="msg-info">
                    <p> {data.nickname}</p>
                  </div>
                  <div className="msg-content">
                    <span className="triangle" />
                    <p className="text">{data.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div id="messageInput">
            <input
              placeholder="메세지를 입력해주세요"
              id="chatInput"
              value={this.state.message}
              onChange={this.handleChange}
              onKeyPress={this.handlePressKey}
            />
            <Tooltip title="Send message">
              <Send onClick={this.sendMessage} />
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.user,
  waitData: state.wait,
  gamerData: state.gamer,
});

const mapDispatchToProps = (dispatch) => {
  // actions : 'wait/room', 'user/', 'gamer/set'
  return {
    setRoomId: (data) => {
      dispatch(updateRoomId(data));
    },
    setUserList: (data) => {
      dispatch(updateUserList(data));
    },
    setInit: (data) => {
      dispatch(setGamerInit(data));
    },
    setGamerList: (data) => {
      dispatch(gamerUserList(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(
  ChatComponent
);
