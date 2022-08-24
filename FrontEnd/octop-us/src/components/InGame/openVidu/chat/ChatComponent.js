import React, { Component } from "react";
import Send from "@material-ui/icons/Send";
import "./ChatComponent.css";
import { Tooltip } from "@material-ui/core";
import { connect } from "react-redux";
import { setMessageList } from "../../../../features/gamer/gamerSlice";
import axios from "axios";
import {
  updateRoomId,
  updateUserList,
  updateRoomChief,
  updatePersonNum,
} from "../../../../features/waiting/waitSlice";
import { gamerUserList } from "../../../../features/gamer/gamerActions";
import {
  setGamerInit,
  setUserList,
  setReporter,
  setMessageListReset,
  setGameStatus,
  updateUserListforDead,
  mafiaLoseAtMinigame,
  setFisher,
  setShark,
  getMinigame,
} from "../../../../features/gamer/gamerSlice";
import { BASE_URL } from "../../../../api/BASE_URL";
import Timer from "../../Timer";
import MP_Pling from "../../../../effect/MP_Pling.mp3";

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
    this.voteNotice = this.voteNotice.bind(this);
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
        if (data.nickname === "사회자" && data.job === this.props.gamerData.job) {
          var audio = new Audio(MP_Pling);
          audio.volume = 0.2; // 여기
          audio.play();

          setTimeout(() => {
            this.props.setMessageList({ message: message });
          }, 2000);
        } else {
          if (data.isDead === true && this.props.getGamerData().isDead === true) {
            var audio = new Audio(MP_Pling);
            audio.volume = 0.03; // 여기
            audio.play();
            // 유령
            this.props.setMessageList({ message: message });
          }
          if (data.isDead === false && this.props.getGamerData().gameStatus !== 1) {
            var audio = new Audio(MP_Pling);
            audio.volume = 0.03; // 여기
            audio.play();

            this.props.setMessageList({ message: message });
          } else if (
            this.props.gamerData.job === "마피아" &&
            this.props.getGamerData().gameStatus === 1 &&
            this.props.getGamerData().isDead === false &&
            data.job === "마피아" &&
            data.isDead === false
          ) {
            var audio = new Audio(MP_Pling);
            audio.volume = 0.03; // 여기
            audio.play();

            this.props.setMessageList({ message: message });
          }
        }
      });
      this.props.user.getStreamManager().stream.session.on("signal:timer", (event) => {
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
        if (this.props.gamerData.job === "크레이지경찰") {
          this.settingGamerList(this.props.gamerData.roomId);
          setTimeout(() => {
            this.props.settingListForSub({
              subscribers: this.props.subscribers,
            });
          }, 1000);
        }
      });
      this.props.user.getStreamManager().stream.session.on("signal:voteGo", (event) => {
        flag = {
          gameEnd: false,
          voteGo: true,
          agreeVoteGo: false,
        };
        const data = JSON.parse(event.data);
        this.props.setPickUserState(data.userName);
      });
      this.props.user.getStreamManager().stream.session.on("signal:agreeVoteGo", (event) => {
        flag = {
          gameEnd: false,
          voteGo: false,
          agreeVoteGo: true,
        };
      });
      this.props.user.getStreamManager().stream.session.on("signal:resetFlag", (event) => {
        flag = {
          gameEnd: false,
          voteGo: false,
          agreeVoteGo: false,
        };
      });
      this.props.user
        .getStreamManager()
        .stream.session.on("signal:agreeVoteGoAndGameEnd", (event) => {
          flag = {
            gameEnd: true,
            voteGo: false,
            agreeVoteGo: true,
          };
        });
      this.props.user.getStreamManager().stream.session.on("signal:change", (event) => {
        const data = JSON.parse(event.data);
        if (data.page === 1) {
          this.props.setMessageListReset();
          // 크레이지 경찰
          if (this.props.gamerData.job == "크레이지경찰") {
            let jobs = ["마피아", "마피아", "시민", "시민", "시민", "시민", "시민", "시민"];
            let users = [];
            this.shuffle(jobs);
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
              } else {
                let tmp = {
                  gameJob: user.gameJob,
                  gameTeam: user.gameTeam,
                  isDead: user.isDead,
                  subIdx: user.subIdx,
                  userName: user.userName,
                };
                users = [...users, tmp];
              }
            });
            setTimeout(() => {
              this.props.setUserListAll({ userList: users });
            }, 1000);
          }
        }
        if (data.page === 2) {
          this.props.resetPickUser();
          this.props.setGameStatus({ gameStatus: 1 });
          this.props.setmafiaLoseAtMinigame();
          this.props.setReporter({ reporter: "" });

          this.props.user.getStreamManager().stream.session.signal({
            type: "resetFlag",
          });
          if (this.props.waitData.roomChief === this.props.gamerData.userName) {
            axios
              .put(`${BASE_URL}/night/initialization/${this.props.gamerData.roomId}`)
              .then((res) => {
              });
          }
        }
        if (data.page === 10) {
          this.props.resetPickUser();
          this.props.setGameStatus({ gameStatus: 0 });
        }

        const obj = {
          minigameResult: this.props.getGamerData().minigameResult,
          job: this.props.gamerData.job,
          hasSkill: this.props.getHasSkill(),
          isDead: this.props.getGamerData().isDead,
          shark: this.props.getGamerData().shark,
          fisher: this.props.getGamerData().fisher,
          reporter: this.props.getGamerData().reporter,
          roomChief: this.props.waitData.roomChief,
          vote: this.props.getPickUser(), // 다영 추가
          gameTime: this.props.waitData.gameTime,
        };
        setTimeout(() => {
          this.props.changeTime(data.initTime);
          this.props.changePage(data.page);
          if (this.props.waitData.roomChief === this.props.gamerData.userName) {
            Timer(data.initTime, this.props.user, data.page, flag, obj);
          }
        }, 1000);
      });

      this.props.user.getStreamManager().stream.session.on("signal:changeToGame", (event) => {
        setTimeout(() => {
          const data = JSON.parse(event.data);
          this.props.changeTime(data.initTime);
          this.props.changePage(data.page, data.gameChoice);
        }, 1000);
      });
      this.props.user.getStreamManager().stream.session.on("signal:mafia", (event) => {
        const data = JSON.parse(event.data);
        if (
          this.props.gamerData.job === "마피아" &&
          this.props.getGamerData().isDead === false &&
          this.props.gamerData.userName !== data.mafiaName
        ) {
          this.props.changePerson({ pickUser: data.gamer.userName });
        }
      });
      this.props.user.getStreamManager().stream.session.on("signal:nightEnd", (event) => {
        // 각자 DB에 업뎃하게 함
        this.props.updatePickUser();
      });
      // 다영 수정
      this.props.user.getStreamManager().stream.session.on("signal:voteEnd", (event) => {
        // 각자 DB에 업뎃하게 함
        this.props.updatePickUserAtVote();
      });

      this.props.user.getStreamManager().stream.session.on("signal:voteResult", (event) => {
        const data = JSON.parse(event.data);
        this.props.setVoteName(data.votes.userName);
        if (data.votes.userName === "skip") {
          // 그냥 페이지 테스트용
          this.props.user.getStreamManager().stream.session.signal({
            type: "resetFlag",
          });
        } else {
          this.props.user.getStreamManager().stream.session.signal({
            data: JSON.stringify({
              userName: data.votes.userName,
            }),
            type: "voteGo",
          });
        }
      });
      // 다영 수정
      this.props.user.getStreamManager().stream.session.on("signal:agreeVoteEnd", (event) => {
        // 각자 DB에 업뎃하게 함
        this.props.updatePickUserAtAgreeVote();
      });
      this.props.user.getStreamManager().stream.session.on("signal:agreeVoteResult", (event) => {
        const data = JSON.parse(event.data);
        if (data.votes.vote > 0) {
          this.props.setVoteName("처형");
          // 처형처리
          this.props.killPickUser();
        } else {
          this.props.setVoteName("skip");
          // 페이지 이동 (페이지 수정 필요)
          this.props.user.getStreamManager().stream.session.signal({
            type: "resetFlag",
          });
        }
      });
      this.props.user.getStreamManager().stream.session.on("signal:dead", (event) => {
        const data = JSON.parse(event.data);
        const deadUser = data.userName;
        this.props.updateUserListforDead({ userName: deadUser });
        setTimeout(() => {
        }, 1000);
      });
      this.props.user.getStreamManager().stream.session.on("signal:reporter", (event) => {
        const data = JSON.parse(event.data);
        this.props.setReporter({ reporter: data.reporter });
      });
      this.props.user.getStreamManager().stream.session.on("signal:shark", (event) => {
        this.props.setShark();
      });
      this.props.user.getStreamManager().stream.session.on("signal:fisher", (event) => {
        this.props.setFisher();
      });
      this.props.user.getStreamManager().stream.session.on("signal:miniGame", (event) => {
        const data = JSON.parse(event.data);
        this.props.getMinigame({ idx: data.idx });
      });
      this.props.user.getStreamManager().stream.session.on("signal:pauseBgmAudio", (event) => {
        this.props.setPlayFalse();
      });
      this.props.user.getStreamManager().stream.session.on("signal:playBgmAudio", (event) => {
        this.props.setPlayTrue();
      });
      this.props.user.getStreamManager().stream.session.on("signal:voteStart", (event) => {
        this.voteNotice();
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
  }

  exitNotice() {
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

  voteNotice() {
    const data = {
      message: `[투표] 투표가 시작되었습니다. 오징어라고 생각되는 사람에게 투표하세요.`,
      nickname: "사회자",
      streamId: this.props.user.getStreamManager().stream.streamId,
      job: "",
      gameStatus: 0,
      isDead: false,
    };
    this.props.setMessageList({ message: data });
  }

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

  settingPersonNum = (data) => {
    this.props.setPersonNum(data);
  };

  componentDidUpdate(prevState) {
    this.scrollToBottom();
    if (this.props.gamerData.messageList.length !== 0) {
      let msg = this.props.gamerData.messageList.at(-1).message;
      if (msg.includes("[알림]")) {
        axios.get(`${BASE_URL}/rooms/detail/roomid/${this.props.waitData.roomId}`).then((res) => {
          const roomNum = res.data.roomId;
          const chief = res.data.roomChief;
          const people = res.data.personNum;
          const users = res.data.userList.split(",");
          if (this.props.waitData.userList !== users || this.props.waitData.roomId !== roomNum) {
            this.settingRoomId({ roomId: roomNum });
            this.settingUserList(users);
            this.settingRoomChief({ roomChief: chief });
            this.settingPersonNum({ personNum: people });
            const lst = {
              connectionId: this.props.user.getStreamManager().stream.streamId,
              message: "",
              nickname: "",
              job: "",
              gameStatus: 0,
              isDead: false,
            };
            this.props.setMessageList({ message: lst });
          }
        });
      } else if (msg.includes("[게임]")) {
        const userName = this.props.userData.userInfo.userName;
        axios.get(`${BASE_URL}/gamers/${userName}`).then((res) => {
          const roomNum = res.data.roomId;

          //         // // 다영
          this.settingGamerInit(res.data);

          this.settingGamerList(res.data.roomId);

          setTimeout(() => {
            this.props.settingListForSub({
              subscribers: this.props.subscribers,
            });
          }, 1000);

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
        });
      }
    }
  }

  // componentWillUnmount() {
  //   console.log("chatComponent unmount!!");
  // }

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
                          ? " left ghostColor"
                          : " right ghostColor")
                      }
                    >
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
                if (
                  (data.isDead === false && data.gameStatus !== 1) ||
                  (data.nickname === "사회자" && data.job === this.props.gamerData.job)
                ) {
                  // 살아있는 사람의 채팅은 모두에게 보인다.
                  return (
                    <div
                      key={i}
                      id="remoteUsers"
                      className={
                        "message" +
                        (data.connectionId !== this.props.user.getConnectionId()
                          ? " left"
                          : " right" + " alive") +
                        (data.nickname === "사회자" ? " moderator" : "")
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
                          ? " left mafiaColor"
                          : " right mafiaColor")
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
  return {
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
    updateUserListforDead: (data) => {
      dispatch(updateUserListforDead(data));
    },
    setmafiaLoseAtMinigame: () => {
      dispatch(mafiaLoseAtMinigame());
    },
    setShark: () => {
      dispatch(setShark());
    },
    setFisher: () => {
      dispatch(setFisher());
    },
    getMinigame: (data) => {
      dispatch(getMinigame(data));
    },
    setPersonNum: (data) => {
      dispatch(updatePersonNum(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(ChatComponent);
