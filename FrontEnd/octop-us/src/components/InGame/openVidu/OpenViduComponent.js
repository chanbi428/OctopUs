import React, { Component } from "react";
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import StreamComponent from "./stream/StreamComponent";
import ChatComponent from "./chat/ChatComponent";
import ExecutionPage from "../components/VotePage/ExecutionPage";
import GameAnimation from "../../MiniGame/LoadingAnimation/AnimationRouter";
import "./OpenViduComponent.css";

import OpenViduLayout from "../layout/openvidu-layout";
import UserModel from "../models/user-model";
import ToolbarComponent from "./toolbar/ToolbarComponent";

import { connect } from "react-redux";
import {
  updateUserListforDead,
  updateUserListforSub,
} from "../../../features/gamer/gamerSlice";

var localUser = new UserModel();

class OpenViduComponent extends Component {
  constructor(props) {
    super(props);
    this.OPENVIDU_SERVER_URL = "https://i7E106.p.ssafy.io:8443";
    this.OPENVIDU_SERVER_SECRET = this.props.openviduSecret
      ? this.props.openviduSecret
      : "MY_SECRET";
    this.hasBeenUpdated = false;
    this.layout = new OpenViduLayout();
    let hostName = this.props.host ? this.props.host : "HostA";
    let sessionName = this.props.sessionName
      ? this.props.sessionName
      : "SessionA";
    let userName = localStorage.getItem("userName");
    this.remotes = [];
    this.localUserAccessAllowed = false;
    // 상위 컴포넌트에서 하위 함수 호출 위한 부분
    // 혹시 chatComponent 추가하게 된다면 prop처럼 추가하여 잘 달아주세요
    this.ovref = React.createRef();
    this.state = {
      mySessionId: sessionName,
      myUserName: userName,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: "block",
      currentVideoDevice: undefined,
      page: 0,
      voteWaitPageStart: 0,
      votePageStart: 0,
      agreePageStart: 0,
      votePage: 0,
      agreePage: 0,
      gameNum: 0,
      hostName: hostName,
      userList: ["a", "b", "c", "d"],
      pickUser: "",
      agree: false,
    };
    console.log(
      "OpenVidu Constructor : " +
        this.mySessionId +
        " : " +
        this.props.sessionName
    );
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
  }

  componentDidMount() {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: "OV_big", // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };
    this.state.mySessionId = this.props.sessionName;
    console.log("componentDidMout : " + this.props.sessionName);
    this.layout.initLayoutContainer(
      document.getElementById("layout"),
      openViduLayoutOptions
    );
    window.addEventListener("beforeunload", this.onbeforeunload);
    window.addEventListener("resize", this.updateLayout);
    this.joinSession();
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
    window.removeEventListener("resize", this.updateLayout);
    this.leaveSession();
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  joinSession() {
    var options = {
      loglevel: 0,
    };
    console.log("JoinSession : ");
    console.log("JoinSession : " + this.state.mySessionId);
    this.OV = new OpenVidu(options);

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        this.subscribeToStreamCreated();

        this.connectToSession();
      }
    );
  }

  connectToSession() {
    if (this.props.token !== undefined) {
      console.log("token received: ", this.props.token);
      this.connect(this.props.token);
    } else {
      this.getToken()
        .then((token) => {
          console.log(token);
          this.connect(token);
        })
        .catch((error) => {
          if (this.props.error) {
            this.props.error({
              error: error.error,
              messgae: error.message,
              code: error.code,
              status: error.status,
            });
          }
          console.log(
            "There was an error getting the token:",
            error.code,
            error.message
          );
          alert("There was an error getting the token:", error.message);
        });
    }
  }

  connect(token) {
    this.state.session
      .connect(token, { clientData: this.state.myUserName })
      .then(() => {
        this.connectWebCam();
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error connecting to the session:", error.message);
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
      });
  }

  async connectWebCam() {
    var devices = await this.OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === "videoinput");

    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: "640x480",
      frameRate: 30,
      insertMode: "APPEND",
    });

    if (this.state.session.capabilities.publish) {
      publisher.on("accessAllowed", () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers();
          this.localUserAccessAllowed = true;
          if (this.props.joinSession) {
            this.props.joinSession();
          }
          console.log(this.subscribers);
        });
      });
    }
    localUser.setNickname(this.state.myUserName);
    localUser.setConnectionId(this.state.session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();
    this.sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
    });

    this.setState(
      { currentVideoDevice: videoDevices[0], localUser: localUser },
      () => {
        this.state.localUser.getStreamManager().on("streamPlaying", (e) => {
          this.updateLayout();
          publisher.videos[0].video.parentElement.classList.remove(
            "custom-class"
          );
        });
      }
    );
    // 유저 입장 시 채팅으로 [서버] 입장 알림.
    console.log(
      "ovref 입장 알림 준비. ovref.current null 시 주석 처리",
      this.ovref
    );
    this.ovref.current.enterNotice();
  }

  updateSubscribers() {
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
            nickname: this.state.localUser.getNickname(),
            isScreenShareActive: this.state.localUser.isScreenShareActive(),
          });
        }
        this.updateLayout();
      }
    );
  }

  leaveSession() {
    const mySession = this.state.session;
    // 유저 퇴장 시 채팅으로 [서버] 퇴장 알림.
    // console.log("ovref 퇴장 알림 준비. ovref.current null 시 주석 처리", this.ovref)
    // this.ovref.current.exitNotice()
    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "OpenVidu_User" + Math.floor(Math.random() * 100),
      localUser: undefined,
    });
    if (this.props.leaveSession) {
      this.props.leaveSession();
    }
  }

  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    this.setState({ localUser: localUser });
  }

  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    this.setState({ localUser: localUser });
  }

  deleteSubscriber(stream) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  subscribeToStreamCreated() {
    this.state.session.on("streamCreated", (event) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      // var subscribers = this.state.subscribers;
      subscriber.on("streamPlaying", (e) => {
        this.checkSomeoneShareScreen();
        subscriber.videos[0].video.parentElement.classList.remove(
          "custom-class"
        );
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType("remote");
      const nickname = event.stream.connection.data.split("%")[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  subscribeToStreamDestroyed() {
    // On every Stream destroyed...
    this.state.session.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream);
      setTimeout(() => {
        this.checkSomeoneShareScreen();
      }, 20);
      event.preventDefault();
      this.updateLayout();
    });
  }

  subscribeToUserChanged() {
    this.state.session.on("signal:userChanged", (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          console.log("EVENTO REMOTE: ", event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive);
          }
        }
      });
      this.setState(
        {
          subscribers: remoteUsers,
        },
        () => this.checkSomeoneShareScreen()
      );
    });
  }

  updateLayout() {
    setTimeout(() => {
      this.layout.updateLayout();
    }, 20);
  }

  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    this.state.session.signal(signalOptions);
  }

  checkSomeoneShareScreen() {
    let isScreenShared;
    // return true if at least one passes the test
    isScreenShared =
      this.state.subscribers.some((user) => user.isScreenShareActive()) ||
      localUser.isScreenShareActive();
    const openviduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: isScreenShared,
      bigClass: "OV_big",
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    };
    this.layout.setLayoutOptions(openviduLayoutOptions);
    this.updateLayout();
  }

  toggleChat(property) {
    let display = property;

    if (display === undefined) {
      display = this.state.chatDisplay === "none" ? "block" : "none";
    }
    if (display === "block") {
      this.setState({ chatDisplay: display, messageReceived: false });
    } else {
      console.log("chat", display);
      this.setState({ chatDisplay: display });
    }
    this.updateLayout();
  }
  // 임시로 만들어놓은 대기실에서 이동하는 버튼 함수
  clickBtn = () => {
    // if(this.props.host === myUserName){ // host일 경우에만 게임 시작 가능
    //   this.setState({ page: 1 });
    //   this.props.onClickBtn();
    // }
    this.setState({ page: 1 });
    this.props.onClickBtn();
  };

  clickUser = (e) => {
    console.log("clickUser on child : " + e);
  };
  // 투표 시작하는 버튼 누름(누르면 투표 활성화)
  clickBtnVote = () => this.setState({ votePageStart: 1 });
  moveVoteWait = () => this.setState({ voteWaitPageStart: 1 });
  // 찬반 투표로 넘어가는 버튼
  moveAgree = () => this.setState({ agreePageStart: 1 });

  // 유저를 선택하는 함수 (state의 pickUser가 선택한 userName으로 넘어감)
  selectVote = (userName, e) => {
    e.preventDefault();
    if (this.state.votePageStart === 1) {
      this.setState({ pickUser: userName });
      console.log("선택한 유저" + this.state.pickUser);
    }
  };
  clickBtnGame = (e) => {
    this.setState({ page: 100 });
    if (e === 1) {
      this.setState({ gameNum: 1 });
    } else if (e === 2) {
      this.setState({ gameNum: 2 });
    }
    this.props.selectGame(e);
    const startTimer = setTimeout(() => {
      this.setState({ page: 1 });
    }, 4000); // 여기 수정 v
    return () => clearTimeout(startTimer);
  };
  // 찬반 버튼 누르면 state.agree가 바뀜
  selectAgree = (e) => {
    e.preventDefault();
    this.setState({ agree: !this.state.agree });
    console.log("찬성여부" + this.state.agree);
  };
  clickBtnAuto() {
    // this.state.voteWaitPageStart = 1;
    this.setState({page: 101});
  }

  // 다영 (리덕스 gamer : userList <-> subscribers 연결 하는 함수)
  settingListForSub = (data) => {
    this.props.setUserListForSub(data);
  };
  // 밤으로 넘어가는 버튼 (시장)
  clickBtnNightForNone = () =>
    this.setState({ agreePage: 0, votePageStart: 0, page: 2 });
  // 밤으로 넘어가는 버튼(마피아)
  clickBtnNightForMafia = () =>
    this.setState({ agreePage: 0, votePageStart: 1, page: 3 });
  // 밤으로 넘어가는 버튼(마피아x 의사, 경찰, 기자)
  clickBtnNightForOther = () =>
    this.setState({ agreePage: 0, votePageStart: 1, page: 4 });
  // 밤으로 넘어가는 버튼(죽은 사람)
  clickBtnNightForDead = () =>
    this.setState({ agreePage: 0, votePageStart: 0, page: 5 });

  render() {
    // const mySessionId = this.state.mySessionId;
    const mySessionId = this.props.sessionName; // !== undefined ? this.props.sessionName : "SessionA";
    const localUser = this.state.localUser;
    var chatDisplay = { display: this.state.chatDisplay };
    console.log("OpenVidu Render session : " + mySessionId);
    return (
      <div className="screen" id="screen-div">
        {this.state.page === 0 && (
          <div>
            <div className="d-flex justify-content-between">
              {localUser !== undefined &&
                localUser.getStreamManager() !== undefined && (
                  <div className="aaaaa" style={chatDisplay}>
                    <ChatComponent
                    user={localUser}
                    chatDisplay={this.state.chatDisplay}
                    close={this.toggleChat}
                    ref={this.ovref}
                    roomName={this.props.roomName}
                    settingListForSub={this.settingListForSub}
                    subscribers={this.state.subscribers}
                    canSend="true"
                  />
                  </div>
                )}
              <div className="setting_box">
                <div id="layout" className="bounds">
                  {localUser !== undefined &&
                    localUser.getStreamManager() !== undefined && (
                      <div
                        className="OT_root OT_publisher custom-class"
                        id="localUser"
                      >
                        <StreamComponent user={localUser} />
                        <ToolbarComponent
                          user={localUser}
                          camStatusChanged={this.camStatusChanged}
                          micStatusChanged={this.micStatusChanged}
                          toggleChat={this.toggleChat}
                        />
                      </div>
                    )}
                </div>
                <div>
                  <button className="start__btn" onClick={this.clickBtn}>
                    START
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* 페이지 넘어가는 버튼 누르고 찬반 투표가 아닐 때 
          일단은 다 로컬유저로 해놨습니다 수정 필요
        */}
        {this.state.page === 1 && this.state.agreePageStart === 0 && (
          <div className="d-flex justify-content-between">
            <div>
              {this.state.userList.map((sub, i) => (
                <div
                  id="layout"
                  className="ingame-bounds"
                  onClick={(e) => this.selectVote(sub.nickname, e)}
                >
                  <div
                    key={i}
                    className="OT_root OT_publisher custom-class"
                    id="remoteUsers"
                  >
                    {sub.nickname === this.state.pickUser && <p>투표</p>}
                    <StreamComponent user={localUser} />
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex flex-column justify-content-between">
              <div>
                {/* {this.state.voteWaitPageStart === 1
                  ? <VoteWaitPage moveAgree={this.moveAgree} />
                  : <VotePage moveVoteWait={this.moveVoteWait} />
                } */}
                <button onClick={() => this.clickBtnGame(1)}>
                  낚시게임시작
                </button>
                <button onClick={() => this.clickBtnGame(2)}>
                  상어게임시작
                </button>
                <button onClick={this.clickBtnVote}>투표시작</button>
                <button onClick={this.clickBtnMoveAgree}>찬반시작</button>
                <button onClick={this.clickBtnAuto}>투표,찬반 자동</button>
                <button onClick={this.clickBtnNightForNone}>밤-시장</button>
                <button onClick={this.clickBtnNightForMafia}>밤-마피아</button>
                <button onClick={this.clickBtnNightForOther}>
                  밤-역할수행
                </button>
                <button onClick={this.clickBtnNightForDead}>밤-죽은사람</button>
              </div>
              <div className="aaaaa" style={chatDisplay}>
                <ChatComponent
                  user={localUser}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  ref={this.ovref}
                  roomName={this.props.roomName}
                  settingListForSub={this.settingListForSub}
                  subscribers={this.state.subscribers}
                  canSend="true"
                />
              </div>
            </div>
            <div>
              {this.state.userList.map((sub, i) => (
                <div
                  id="layout"
                  className="ingame-bounds"
                  onClick={(e) => this.selectVote(sub.nickname, e)}
                >
                  <div
                    key={i}
                    className="OT_root OT_publisher custom-class"
                    id="remoteUsers"
                  >
                    {sub.nickname === this.state.pickUser && <p>투표</p>}
                    <StreamComponent user={localUser} />
                  </div>
                  <div>
                    <p>투표</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* 찬반페이지 */}
        {this.state.agreePageStart === 1 && (
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column justify-content-between">
              <h2>최후변론</h2>
              <div id="layout" className="voted-bounds">
                {localUser !== undefined &&
                  localUser.getStreamManager() !== undefined && (
                    <div
                      className="OT_root OT_publisher custom-class"
                      id="localUser"
                    >
                      <StreamComponent user={localUser} />
                      {this.state.agree === true && (
                        <ExecutionPage
                          streamId={localUser.streamManager.stream.streamId}
                        />
                      )}
                    </div>
                  )}
              </div>
              <div className="d-flex justify-content-around agree-box">
                <button
                  onClick={(e) => this.selectAgree(e)}
                  disabled={this.state.agree === true ? true : false}
                  className="agree__btn"
                >
                  찬성
                </button>
                <button
                  onClick={(e) => this.selectAgree(e)}
                  disabled={this.state.agree === false ? true : false}
                  className="agree__btn"
                >
                  반대
                </button>
              </div>
            </div>
          </div>
        )}
        {this.state.page === 100 && (
          <GameAnimation gameNum={this.state.gameNum} />
        )}
        {this.state.page === 101 && (
          <div className="d-flex flex-column justify-content-between">
            <div></div>
            <div className="aaaaa" style={chatDisplay}>
              <ChatComponent
                user={localUser}
                chatDisplay={this.state.chatDisplay}
                close={this.toggleChat}
                settingListForSub={this.settingListForSub}
                subscribers={this.state.subscribers}
                canSend="false"
              />
            </div>
          </div>
        )}
        {/* 밤페이지 - 밤역할 수행 x (시장..) */}
        {this.state.page === 2 && this.state.votePageStart === 0 && (
          <div className="d-flex justify-content-between">
            <div>
              {this.props.gamerData.userList.slice(0, 4).map((subGamer, i) => (
                <div id="layout" className="ingame-bounds">
                  <div
                    key={i}
                    className="OT_root OT_publisher custom-class"
                    id="remoteUsers"
                  >
                    <img src="images/octopus.png" width="200" />
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex flex-column justify-content-between">
              <div></div>
              <div className="aaaaa" style={chatDisplay}>
                <ChatComponent
                  user={localUser}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  settingListForSub={this.settingListForSub}
                  subscribers={this.state.subscribers}
                  canSend="false"
                />
              </div>
            </div>
            <div>
              {this.props.gamerData.userList.slice(4, 8).map((subGamer, i) => (
                <div id="layout" className="ingame-bounds">
                  <div
                    key={i}
                    className="OT_root OT_publisher custom-class"
                    id="remoteUsers"
                  >
                    <img src="images/octopus.png" width="200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* 밤페이지 - 밤역할 수행 o (마피아) */}
        {this.state.page === 3 && this.state.votePageStart === 1 && (
          <div className="d-flex justify-content-between">
            <div>
              {this.props.gamerData.userList.slice(0, 4).map((subGamer, i) => (
                <div
                  id="layout"
                  className="ingame-bounds"
                  onClick={(e) => this.selectVote(subGamer.userName, e)}
                >
                  <div
                    key={i}
                    className="OT_root OT_publisher custom-class"
                    id="remoteUsers"
                  >
                    {subGamer.userName === this.state.pickUser && <p>투표</p>}
                    {subGamer.isDead === true ||
                    subGamer.gameJob !== "마피아" ? (
                      <img src="images/octopus.png" width="200" />
                    ) : (
                      <StreamComponent
                        user={
                          subGamer.subIdx === undefined
                            ? localUser
                            : this.state.subscribers[subGamer.subIdx]
                        }
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex flex-column justify-content-between">
              <div></div>
              <div className="aaaaa" style={chatDisplay}>
                <ChatComponent
                  user={localUser}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  settingListForSub={this.settingListForSub}
                  subscribers={this.state.subscribers}
                  canSend="true"
                />
              </div>
            </div>
            <div>
              {this.props.gamerData.userList.slice(4, 8).map((subGamer, i) => (
                <div
                  id="layout"
                  className="ingame-bounds"
                  onClick={(e) => this.selectVote(subGamer.userName, e)}
                >
                  <div
                    key={i}
                    className="OT_root OT_publisher custom-class"
                    id="remoteUsers"
                  >
                    {subGamer.userName === this.state.pickUser && <p>투표</p>}
                    {subGamer.isDead === true ||
                    subGamer.gameJob !== "마피아" ? (
                      <img src="images/octopus.png" width="200" />
                    ) : (
                      <StreamComponent
                        user={
                          subGamer.subIdx === undefined
                            ? localUser
                            : this.state.subscribers[subGamer.subIdx]
                        }
                      />
                    )}
                  </div>
                  <div>
                    <p>투표</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* 밤페이지 - 밤역할 수행 o 의사, 경찰, 기자 */}
        {this.state.page === 4 && this.state.votePageStart === 1 && (
          <div className="d-flex justify-content-between">
            <div>
              {this.props.gamerData.userList.slice(0, 4).map((subGamer, i) => (
                <div
                  id="layout"
                  className="ingame-bounds"
                  onClick={(e) => this.selectVote(subGamer.userName, e)}
                >
                  <div
                    key={i}
                    className="OT_root OT_publisher custom-class"
                    id="remoteUsers"
                  >
                    {subGamer.userName === this.state.pickUser && <p>투표</p>}
                    {subGamer.userName !== this.props.gamerData.userName ? (
                      <img src="images/octopus.png" width="200" />
                    ) : (
                      <StreamComponent
                        user={
                          subGamer.subIdx === undefined
                            ? localUser
                            : this.state.subscribers[subGamer.subIdx]
                        }
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex flex-column justify-content-between">
              <div></div>
              <div className="aaaaa" style={chatDisplay}>
                <ChatComponent
                  user={localUser}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  settingListForSub={this.settingListForSub}
                  subscribers={this.state.subscribers}
                  canSend="false"
                />
              </div>
            </div>
            <div>
              {this.props.gamerData.userList.slice(4, 8).map((subGamer, i) => (
                <div
                  id="layout"
                  className="ingame-bounds"
                  onClick={(e) => this.selectVote(subGamer.userName, e)}
                >
                  <div
                    key={i}
                    className="OT_root OT_publisher custom-class"
                    id="remoteUsers"
                  >
                    {subGamer.userName === this.state.pickUser && <p>투표</p>}
                    {subGamer.userName !== this.props.gamerData.userName ? (
                      <img src="images/octopus.png" width="200" />
                    ) : (
                      <StreamComponent
                        user={
                          subGamer.subIdx === undefined
                            ? localUser
                            : this.state.subscribers[subGamer.subIdx]
                        }
                      />
                    )}
                  </div>
                  <div>
                    <p>투표</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* 밤페이지 - 밤역할 수행 x (죽은 사람) */}
        {this.state.page === 5 && this.state.votePageStart === 0 && (
          <div className="d-flex justify-content-between">
            <div>
              {this.props.gamerData.userList.slice(0, 4).map((subGamer, i) => (
                <div id="layout" className="ingame-bounds">
                  <div
                    key={i}
                    className="OT_root OT_publisher custom-class"
                    id="remoteUsers"
                  >
                    <img src="images/octopus.png" width="200" />
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex flex-column justify-content-between">
              <div></div>
              <div className="aaaaa" style={chatDisplay}>
                <ChatComponent
                  user={localUser}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  settingListForSub={this.settingListForSub}
                  subscribers={this.state.subscribers}
                  canSend="true"
                />
              </div>
            </div>
            <div>
              {this.props.gamerData.userList.slice(4, 8).map((subGamer, i) => (
                <div id="layout" className="ingame-bounds">
                  <div
                    key={i}
                    className="OT_root OT_publisher custom-class"
                    id="remoteUsers"
                  >
                    <img src="images/octopus.png" width="200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a session in OpenVidu Server	(POST /api/sessions)
   *   2) Generate a token in OpenVidu Server		(POST /api/tokens)
   *   3) The token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId)
    );
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(this.OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                this.OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                this.OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({});
      axios
        .post(
          this.OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}

const mapStateToProps = (state) => ({
  userData: state.user,
  waitData: state.wait,
  gamerData: state.gamer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUserListForSub: (data) => {
      dispatch(updateUserListforSub(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(OpenViduComponent);
