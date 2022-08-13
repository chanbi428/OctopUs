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
// import axios from "axios";
// import { room } from "../../../../features/waiting/waitSlice"
// import { gamerInit, gamerUserList } from "../../../../features/gamer/gamerActions"
import { setMessageList } from "../../../../features/gamer/gamerSlice";
import axios from "axios";
import {
  updateRoomId,
  updateUserList,
  updateRoomChief,
} from "../../../../features/waiting/waitSlice";
import { gamerUserList } from "../../../../features/gamer/gamerActions";
import {
  setGamerInit,
  setUserList,
  setReporter,
  setMessageListReset,
  setGameStatus,
} from "../../../../features/gamer/gamerSlice";
import { BASE_URL } from "../../../../api/BASE_URL";
import Timer from "../../Timer";

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
    if (this.props.user.getStreamManager().stream.streamId === undefined) {
      this.props.user.getStreamManager().stream.session.on("signal:chat", (event) => {
        const data = JSON.parse(event.data);
        let message = {
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
          isDead: data.isDead,
          job: data.job,
          gameStatus: data.gameStatus,
        };
        const document = window.document;
        setTimeout(() => {
          const userImg = document.getElementById("userImg-" + (this.state.messageList.length - 1));
          const video = document.getElementById("video-" + data.streamId);
          const avatar = userImg.getContext("2d");
          avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
        }, 50);
        if (data.nickname === "사회자" && data.job === this.props.gamerData.job) {
          this.props.setMessageList({ message: message });
        } else {
          if (data.isDead === true && this.props.gamerData.isDead === true) {
            // 유령
            this.props.setMessageList({ message: message });
            console.log("유령 대화에 들어옴 ", message);
          }
          if (data.isDead === false && this.props.gamerData.gameStatus !== 1) {
            this.props.setMessageList({ message: message });
            console.log("살아있는 대화에 들어옴 ", message);
          } else if (
            this.props.gamerData.job === "마피아" &&
            this.props.gamerData.gameStatus === 1 &&
            this.props.gamerData.isDead === false &&
            data.job === "마피아" &&
            data.isDead === false
          ) {
            this.props.setMessageList({ message: message });
            console.log("마피아 대화에 들어옴 ", message);
          }
        }
      });
      this.props.user.getStreamManager().stream.session.on("signal:timer", (event) => {
        console.log("timer다 1초씩 줄어들면 됨!");
        const data = JSON.parse(event.data);
        const second = data.second;
        this.props.changeTime(second);
      });
      var flag = {
        gameEnd: false, // 게임종료여부,
        voteGo: false, // 투표결과(최후변론 할지 안할지),
        agreeVoteGo: false, // 찬반투표결과(처형 할지 안할지)
      };
      this.props.user.getStreamManager().stream.session.on("signal:gameEnd", (event) => {
        flag = {
          gameEnd: true,
          voteGo: false,
          agreeVoteGo: false,
        };
      });
      this.props.user.getStreamManager().stream.session.on("signal:voteGo", (event) => {
        flag = {
          gameEnd: false,
          voteGo: true,
          agreeVoteGo: false,
        };
      });
      this.props.user.getStreamManager().stream.session.on("signal:agreeVoteGo", (event) => {
        flag = {
          gameEnd: false,
          voteGo: false,
          agreeVoteGo: true,
        };
      });
      this.props.user.getStreamManager().stream.session.on("signal:change", (event) => {
        const data = JSON.parse(event.data);
        console.log(
          "리덕스 확인용 콘솔",
          data.page,
          this.props.gamerData.job,
          this.props.gamerData
        );
        if (data.page === 1) {
          this.props.setMessageListReset();
          console.log("1페이지다", this.props.gamerData.job);
          // 크레이지 경찰
          if (this.props.gamerData.job == "크레이지경찰") {
            console.log("드루와");
            let jobs = ["마피아", "마피아", "시민", "시민", "시민", "시민", "시민", "시민"];
            let users = [];
            this.shuffle(jobs);
            console.log(jobs);
            this.props.gamerData.userList.map((user, i) => {
              if (user.userName != this.props.userData.userInfo.userName) {
                let tmp = {
                  gameJob: jobs[i],
                  gameTeam: user.gameTeam,
                  isDead: user.isDead,
                  subIdx: user.subIdx,
                  userName: user.userName,
                };
                users = [...users, tmp];
                console.log(users);
              } else {
                let tmp = {
                  gameJob: user.gameJob,
                  gameTeam: user.gameTeam,
                  isDead: user.isDead,
                  subIdx: user.subIdx,
                  userName: user.userName,
                };
                users = [...users, tmp];
                console.log(users);
              }
            });
            console.log("크레이지 경찰 다시 세팅", this.props.gamerData.userList);
            setTimeout(() => {
              this.props.setUserListAll({ userList: users });
              console.log("크레이지 경찰 다시 세팅", this.props.gamerData.userList);
            }, 1000);
          }
        }
        if (data.page === 2) {
          console.log("pickUser 초기화");
          this.props.resetPickUser();
          //if (this.props.gamerData.host === this.props.gamerData.userName) {
          axios
            .put(`${BASE_URL}/night/initialization/${this.props.gamerData.roomId}`)
            .then((res) => {
              console.log("host가 밤 초기화");
            });
          //}
        }
        if (data.page === 8) {
          console.log("pickUser 초기화");
          this.props.resetPickUser();
        }
        // 다영 추가
        // if (data.page === 11) {
        //   console.log("VOTE : pickUser 초기화");
        //   this.props.resetPickUser();
        //   axios
        //     .put(`${BASE_URL}/vote/initialization/${this.props.gamerData.roomId}`)
        //     .then((res) => {
        //       console.log("HOST : VOTE TABLE에서 VOTE 초기화");
        //     });
        // }
        const obj = {
          minigameResult: this.props.gamerData.minigameResult,
          job: this.props.gamerData.job,
          hasSkill: this.props.getHasSkill(),
          isDead: this.props.gamerData.isDead,
          shark: this.props.gamerData.shark,
          fisher: this.props.gamerData.fisher,
          reporter: this.props.getPickUser(),
          // vote: this.propss.getPickUser(), // 다영 추가
        };
        console.log("change repoter 값", this.props.gamerData.reporter);
        setTimeout(() => {
          console.log("page 변환!", data.page);
          this.props.changeTime(data.initTime);
          this.props.changePage(data.page);
          Timer(data.initTime, this.props.user, data.page, flag, obj);
        }, 1000);
      });

      this.props.user.getStreamManager().stream.session.on("signal:changeToGame", (event) => {
        setTimeout(() => {
          console.log("page 변환!");
          const data = JSON.parse(event.data);
          this.props.changeTime(data.initTime);
          this.props.changePage(data.page, data.gameChoice);
          // this.props.clickBtnGame(data.gameChoice);
          // Timer(data.initTime, this.props.user, data.page, flag, obj);
        }, 1000);
      });
      this.props.user.getStreamManager().stream.session.on("signal:mafia", (event) => {
        const data = JSON.parse(event.data);
        console.log("MAFIA : RECIEVE MESSAGE, 선택한 게이머 notice받음");
        console.log("RECEIVED PICK USER : ", data.gamer);
        if (
          this.props.gamerData.job === "마피아" &&
          this.props.gamerData.isDead === false &&
          this.props.gamerData.userName !== data.mafiaName
        ) {
          console.log("UPDATE PICK USER FROM RECEIVED MESSAGE1");
          this.props.changePerson({ pickUser: data.gamer.userName });
        }
      });
      this.props.user.getStreamManager().stream.session.on("signal:nightEnd", (event) => {
        // 각자 DB에 업뎃하게 함
        console.log("night 끝났음");
        this.props.updatePickUser();
        //console.log("getPickUser", this.props.getPickUser());
        // setTimeout(() => {
        //   this.props.setReporter({ reporter: this.props.reporter });
        // }, 3000);

        // axios.get(`${BASE_URL}/nights/reporter/${this.props.gamerData.roomId}`).then((res) => {
        //   console.log("기자ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ", res);
        //   this.props.setReporter({ reporter: res.data.nomineeName });
        // });
        //if (this.props.gamerData.host === this.props.gamerData.userName) {
        //}
      });
      // 다영 수정
      this.props.user.getStreamManager().stream.session.on("signal:voteEnd", (event) => {
        // 각자 DB에 업뎃하게 함
        console.log("VOTE 끝남");
        console.log("HOST : 각자 VOTE 테이블에 투표 결과 UPDATE! ");
        this.props.updatePickUserAtVote();
      });

      this.props.user.getStreamManager().stream.session.on("signal:voteResult", (event) => {
        const data = JSON.parse(event.data);
        console.log("VOTE : RECIEVE MESSAGE, MAX VOTES notice받음");
        console.log("RECEIVED MAX VOTES : ", data.votes.userName);
        if (data.votes.userName !== "skip") {
          // 그냥 페이지 테스트용
          console.log("NO MAX VOTES => 찬반 페이지 PASS");
          this.props.resetPickUser(); // pickUser reset
          // this.props.changePage(data.page, data.gameChoice);
        } else {
          console.log("MAX VOTES => 찬반 페이지 GO");
          this.state.localUser.getStreamManager().stream.session.signal({
            type: "voteGo",
          });
        }
      });
    }
    this.scrollToBottom();
  }

  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
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
    console.log("센드메세지", this.state.message);
    if (this.props.user && this.state.message) {
      let message = this.state.message.replace(/ +(?= )/g, "");
      if (message !== "" && message !== " ") {
        const data = {
          message: message,
          nickname: this.props.user.getNickname(),
          streamId: this.props.user.getStreamManager().stream.streamId,
          isDead: this.props.gamerData.isDead, // 메세지 보낼 때 생사도 함께 보낸다.
          job: this.props.gamerData.job,
          gameStatus: this.props.gamerData.gameStatus,
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
      message: `[알림] ${this.props.userData.userInfo.userName}님이 입장하셨습니다`,
      nickname: "서버",
      streamId: this.props.user.getStreamManager().stream.streamId,
      job: "",
      gameStatus: 0,
      isDead: false,
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
    console.log("퇴장 알림");
    const data = {
      message: `[알림] ${this.props.userData.userInfo.userName}님이 퇴장하셨습니다`,
      nickname: "서버",
      streamId: this.props.user.getStreamManager().stream.streamId,
      job: "",
      gameStatus: 0,
      isDead: false,
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
      job: "",
      gameStatus: 0,
      isDead: false,
    };
    this.props.user.getStreamManager().stream.session.signal({
      data: JSON.stringify(data),
      type: "chat",
    });
  }

  // cancelNotice() {
  //   console.log("notice 감지 후 동작, 그 후 messageList 초기화 위함");
  //   const data = {
  //     message: ``,
  //     nickname: "서버",
  //     streamId: this.props.user.getStreamManager().stream.streamId,
  //   };
  //   this.props.user.getStreamManager().stream.session.signal({
  //     data: JSON.stringify(data),
  //     type: "chat",
  //   });
  // }

  settingRoomId = (data) => {
    this.props.setRoomId(data);
  };

  settingUserList = (data) => {
    this.props.setUserList(data);
  };

  settingRoomChief = (data) => {
    this.props.setRoomChief(data);
  };

  settingGamerInit = (data) => {
    this.props.setInit(data);
  };

  settingGamerList = (data) => {
    this.props.setGamerList(data);
  };

  componentDidUpdate(prevState) {
    this.scrollToBottom();
    if (this.props.gamerData.messageList.length !== 0) {
      console.log(this.UserModel);
      let msg = this.props.gamerData.messageList.at(-1).message;
      //console.log("ComponentDidUpdate의 메세지 가장 마지막꺼", msg);
      if (msg.includes("[알림]")) {
        // console.log("개인이 감지해야함", this.props.waitData.roomId)  // roomChief를 알거나, roomId를 알거나...
        axios.get(`${BASE_URL}/rooms/detail/roomid/${this.props.waitData.roomId}`).then((res) => {
          // state에 seats를 저장하거나 state에 유저리스트를 저장한다. 유저리스트 저장이 좀 더 쓸모 있을 것 같다.
          // console.log("문어자리 업데이트용-chatcompo", res.data)
          const roomNum = res.data.roomId;
          const chief = res.data.roomChief;
          const users = res.data.userList.split(",");
          console.log("유저 비교!!!", users, this.props.waitData.userList);
          if (this.props.waitData.userList !== users || this.props.waitData.roomId !== roomNum) {
            this.settingRoomId({ roomId: roomNum });
            console.log("업데이트 아이디 확인", this.props.waitData);
            this.settingUserList(users);
            console.log("업데이트 리스트 확인", this.props.waitData);
            this.settingRoomChief({ roomChief: chief });
            console.log("업데이트 호스트 확인", this.props.waitData);
            const lst = {
              connectionId: this.props.user.getStreamManager().stream.streamId,
              message: "",
              nickname: "",
              job: "",
              gameStatus: 0,
              isDead: false,
            };
            this.props.setMessageList({ message: lst });
            // if (this.props.gamerDate.messageList.at(-1) !== lst) {
            //   this.props.setMessageList({ message: lst });
            // }
          }
        });
      } else if (msg.includes("[게임]")) {
        const userName = this.props.userData.userInfo.userName;
        console.log(userName);
        // console.log("게임 시작 감지!" , this.props,)
        axios.get(`${BASE_URL}/gamers/${userName}`).then((res) => {
          console.log("DB에서 유저 개인 게임 정보 받아오기 성공!", res.data);
          const roomNum = res.data.roomId;

          //         // // 다영
          this.settingGamerInit(res.data);
          console.warn("REDUX : GAMER INIT1 : USER");
          console.log("업데이트 게이머 확인", this.props.gamerData);

          this.settingGamerList(res.data.roomId);
          console.warn("REDUX : GAMER INIT2 : USERLIST");
          console.log("업데이트 게이머 유저리스트 확인", this.props.gamerData);

          this.props.settingListForSub({ subscribers: this.props.subscribers });
          console.warn("REDUX : GAMER INIT3 : SUB");
          console.log("업데이트 SUBSCRIBERS 확인", this.props.subscribers);
          console.log("업데이트 게이머 확인", this.props.gamerData);

          this.settingUserList(roomNum);

          const lst = {
            connectionId: this.props.user.getStreamManager().stream.streamId,
            message: "",
            nickname: "",
            job: "",
            gameStatus: 0,
            isDead: false,
          };
          this.props.setMessageList({ message: lst });
          // if (this.props.gamerDate.messageList.at(-1) !== lst) {
          //   this.props.setMessageList({ message: lst });
          // }
        });
      }
    }
  }

  componentWillUnmount() {
    console.log("chatComponent unmount!!");
  }

  render() {
    const styleChat = { display: this.props.chatDisplay };
    const {
      waitData,
      userData,
      gamerData,
      setRoomId,
      setUserList,
      setGamerList,
      setInit,
      settingListForSub,
    } = this.props;
    return (
      <div id="chatContainer">
        <div id="chatComponent" style={styleChat}>
          {/* <div id="chatToolbar">
            <span>
              {this.props.user.getStreamManager().stream.session.sessionId} -
              {this.props.roomName} - CHAT
            </span>
            <IconButton id="closeButton" onClick={this.close}>
              <HighlightOff color="secondary" />
            </IconButton>
          </div> */}
          <div className="message-wrap" ref={this.chatScroll}>
            {gamerData.messageList.map((data, i) => {
              if (data.message !== "") {
                if (gamerData.isDead === true && data.isDead === true) {
                  // 유령들끼리만 보이는 채팅 (여기 글자색을 다르게 한다던지 하면될듯)
                  return (
                    <div
                      key={i}
                      id="remoteUsers"
                      className={
                        "message" +
                        (data.connectionId !== this.props.user.getConnectionId()
                          ? " left"
                          : " right" + " ghostColor")
                      }
                    >
                      <canvas id={"userImg-" + i} width="60" height="60" className="user-img" />
                      <div className="msg-detail">
                        <div className="msg-info">
                          <p> {data.nickname}</p>
                        </div>
                        <div className="msg-content">
                          <span className="triangle" />
                          <p className="ghost">{data.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
                if (data.isDead === false && data.gameStatus !== 1) {
                  // 살아있는 사람의 채팅은 모두에게 보인다.
                  return (
                    <div
                      key={i}
                      id="remoteUsers"
                      className={
                        "message" +
                        (data.connectionId !== this.props.user.getConnectionId()
                          ? " left"
                          : " right" + " alive")
                      }
                    >
                      <canvas id={"userImg-" + i} width="60" height="60" className="user-img" />
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
                  );
                }
                if (
                  gamerData.job === "마피아" &&
                  gamerData.isDead === false &&
                  data.job === "마피아" &&
                  data.isDead === false &&
                  data.gameStatus === 1
                ) {
                  // 밤이 1라는 가정
                  return (
                    <div
                      key={i}
                      id="remoteUsers"
                      className={
                        "message" +
                        (data.connectionId !== this.props.user.getConnectionId()
                          ? " left"
                          : " right" + " mafiaColor")
                      }
                    >
                      <canvas id={"userImg-" + i} width="60" height="60" className="user-img" />
                      <div className="msg-detail">
                        <div className="msg-info">
                          <p> {data.nickname}</p>
                        </div>
                        <div className="msg-content">
                          <span className="triangle" />
                          <p className="mafia">{data.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              }
            })}
          </div>
          {this.props.canSend === "true" ? (
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
          ) : (
            <div></div>
          )}
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
    // updateRoom : (data) => {dispatch(room(data))},
    // updateUserList : (data) => {dispatch(gamerUserList(data))},
    // updateInit : (data) => {dispatch(gamerInit(data))},
    setMessageList: (data) => {
      dispatch(setMessageList(data));
    },

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
    setRoomChief: (data) => {
      dispatch(updateRoomChief(data));
    },
    setUserListAll: (data) => {
      dispatch(setUserList(data));
    },
    setReporter: (data) => {
      dispatch(setReporter(data));
    },
    setMessageListReset: () => {
      dispatch(setMessageListReset());
    },
    setGameStatus: (data) => {
      dispatch(setGameStatus(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(ChatComponent);
