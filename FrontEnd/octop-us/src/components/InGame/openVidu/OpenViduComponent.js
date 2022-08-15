import React, { Component } from "react";
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import StreamComponent from "./stream/StreamComponent";
import ChatComponent from "./chat/ChatComponent";
import RoundComponent from "../components/JobComponents/RoundComponent";
import JobCardComponent from "../components/JobComponents/JobCardComponent";
import DayToNightLoading from "../../LoadingPage/DayToNightLoading/DayToNightLoading";
import NightToDayLoading from "../../LoadingPage/NightToDayLoading/NightToDayLoading";
import DeathResultComponent from "../components/JobComponents/DeathResultComponent";
import NewsResultComponent from "../components/JobComponents/NewsResultComponent";
import VoteAnimationComponent from "../components/VotePage/VoteAnimationComponent";
import VoteDoneAnimationComponent from "../components/VotePage/VoteDoneAnimationComponent";
import AgreePage from "../components/VotePage/AgreePage";
import VotePage from "../components/VotePage/VotePage";
import VoteWaitPage from "../components/VotePage/VoteWaitPage";
import ExecutionPage from "../components/VotePage/ExecutionPage";
import GameAnimation from "../../MiniGame/LoadingAnimation/AnimationRouter";
import SharkGameResult from "../../MiniGame/SharkGame/SharkGameResult";
import FishingGame from "../../MiniGame/FishingGame/FishingGame";
import GameResultPage from "../components/JobComponents/GameResultPage";
import CrazyCard from "../../LoadingPage/JobCard/CrazyCard/CrazyCard";
import DoctorCard from "../../LoadingPage/JobCard/DoctorCard/DoctorCard";
import MafiaCard from "../../LoadingPage/JobCard/MafiaCard/MafiaCard";
import MayorCard from "../../LoadingPage/JobCard/MayorCard/MayorCard";
import NeutralCard from "../../LoadingPage/JobCard/NeutralCard/NeutralCard";
import PoliceCard from "../../LoadingPage/JobCard/PoliceCard/PoliceCard";
import ReporterCard from "../../LoadingPage/JobCard/ReporterCard/ReporterCard";
import ShowRoom from "../components/WaitingRoomPage/ShowRoom";
import WaitingRoomPage from "../components/WaitingRoomPage/WaitingRoomPage";
import DayOctopi from "../components/octopi/DayOctopi";
import NightOctopi from "../components/octopi/NightOctopi";
import MafiaNightOctopi from "../components/octopi/MafiaNightOctopi";
import NightComponent from "../components/MusicComponents/NightComponent";
import DayComponent from "../components/MusicComponents/DayComponent";
import VoteAgreeComponent from "../components/MusicComponents/VoteAgreeComponent";
import WaitingComponent from "../components/MusicComponents/WaitingComponent";
import "./OpenViduComponent.css";

import OpenViduLayout from "../layout/openvidu-layout";
import UserModel from "../models/user-model";
import ToolbarComponent from "./toolbar/ToolbarComponent";

import { connect } from "react-redux";
import {
  updateUserListforDead,
  updateUserListforSub,
  setLocalUser,
  hasntSkill,
  setShark,
  setFisher,
  setPickUser,
  getMinigame,
  setReporter,
} from "../../../features/gamer/gamerSlice";

import Timer from "../Timer";
import { BASE_URL } from "../../../api/BASE_URL";

import MP_btn1 from "../../../effect/MP_btn1.mp3";
import MP_btn2 from "../../../effect/MP_btn2.mp3";
import MP_bgm1 from "../../../effect/MP_bgm1.mp3";

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
    let sessionName = this.props.sessionName ? this.props.sessionName : "SessionA";
    let userName = localStorage.getItem("userName");
    // let bgmAudio = new Audio(MP_bgm1);
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
      victoryUsers: ["d1", "d2", "d3", "d4", "d5"],
      pickUser: "d1",
      agree: false,
      speakingUsers: [0, 0, 0, 0, 0, 0, 0, 0],
      timer: 0,
      hasSkill: true,
      killed: "없음",
      voteName: "",
      // bgmAudio: bgmAudio,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.changePerson = this.changePerson.bind(this);
    this.checkGameTurn = this.checkGameTurn.bind(this);
  }

  timer(time, user, page, flag, obj) {
    Timer(time, user, page, flag, obj);
  }

  changeTime = (second) => {
    this.setState({ timer: second });
  };

  changePage = (pageNum, gameChoice) => {
    console.log("changePage 실행됨 : " + pageNum + " : " + gameChoice);
    if (pageNum === 20) {
      this.setState({ gameNum: gameChoice });
      this.props.selectGame(gameChoice);
      this.setState({ page: pageNum });
    } else {
      this.setState({ page: pageNum });
    }
  };

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

    this.layout.initLayoutContainer(document.getElementById("layout"), openViduLayoutOptions);
    window.addEventListener("beforeunload", this.onbeforeunload);
    window.addEventListener("resize", this.updateLayout);
    this.joinSession();
    // this.state.bgmAudio.play();
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
    setTimeout(() => {
      this.state.session.on("publisherStartSpeaking", (event) => {
        const array = event.connection.data.split('"');
        const targetPlayerId = array[3];
        let tmp = [...this.state.speakingUsers];
        console.log("누구?", this.props.gamerData.userList, array, targetPlayerId);
        {
          this.props.gamerData.userList &&
            this.props.gamerData.userList.map((sub, i) => {
              if (sub.userName === targetPlayerId) {
                tmp[i] = 1;
                this.setState({ speakingUsers: tmp });
                console.log("말한다");
              }
            });
        }
      });

      this.state.session.on("publisherStopSpeaking", (event) => {
        const array = event.connection.data.split('"');
        const targetPlayerId = array[3];
        let tmp = [...this.state.speakingUsers];
        {
          this.props.gamerData.userList &&
            this.props.gamerData.userList.map((sub, i) => {
              if (sub.userName === targetPlayerId) {
                tmp[i] = 0;
                this.setState({ speakingUsers: tmp });
              }
            });
        }
      });
    }, 1000);
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
          console.log("There was an error getting the token:", error.code, error.message);
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
        console.log("There was an error connecting to the session:", error.code, error.message);
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

    this.setState({ currentVideoDevice: videoDevices[0], localUser: localUser }, () => {
      this.state.localUser.getStreamManager().on("streamPlaying", (e) => {
        this.updateLayout();
        publisher.videos[0].video.parentElement.classList.remove("custom-class");
      });
    });
    // 유저 입장 시 채팅으로 [서버] 입장 알림.
    console.log("ovref 입장 알림 준비. ovref.current null 시 주석 처리", this.ovref);
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
    const userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
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
        subscriber.videos[0].video.parentElement.classList.remove("custom-class");
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
    var audio = new Audio(MP_btn1);
    audio.play();
    // this.state.bgmAudio.pause();
    setTimeout(() => audio.pause(), 3000);
    // if(this.props.host === myUserName){ // host일 경우에만 게임 시작 가능
    //   this.setState({ page: 1 });
    //   this.props.onClickBtn();
    // }
    // 애니메이션 (밤) 주석하기 (다영)
    // this.setState({ pickUser: "c1" }); // 투표 테스트용
    this.props.onClickBtn();
    // const startTimer = setTimeout(() => {
    //   this.setState({ page: 13 });
    // }, 2000); // 여기 수정 v
    // return () => clearTimeout(startTimer);

    // 타이머 주석 풀기 (다영)
    console.log("제발 start 1");
    const flag = {
      gameEnd: false, // 게임종료여부,
      voteGo: false, // 투표결과(최후변론 할지 안할지),
      agreeVoteGo: false, // 찬반투표결과(처형 할지 안할지)
    };
    const obj = {
      minigameResult: this.props.gamerData.minigameResult,
      job: this.props.gamerData.job,
      hasSkill: this.props.gamerData.hasSkill,
      isDead: this.props.gamerData.isDead,
      shark: this.props.gamerData.shark,
      fisher: this.props.gamerData.fisher,
      reporter: this.props.gamerData.reporter,
      roomChief: this.props.waitData.roomChief,
    };

    this.settingLocalUser({ localUser: this.state.localUser });
    console.log(this.state.localUser);
    this.timer(0, this.state.localUser, 0, flag, obj);
  };

  clickUser = (e) => {
    console.log("clickUser on child : " + e);
  };
  // 투표 시작하는 버튼 누름(누르면 투표 활성화)
  clickBtnVote = () => this.setState({ votePageStart: 1 });
  moveVoteWait = () => this.setState({ voteWaitPageStart: 1 });
  // 찬반 투표로 넘어가는 버튼
  moveAgree = () => this.setState({ agreePageStart: 1 });

  setVoteName = (data) => {
    this.setState({ voteName: data });
  };

  // 유저를 선택하는 함수 (state의 pickUser가 선택한 userName으로 넘어감)
  selectVote = (gamer, e) => {
    e.preventDefault();
    if (this.state.pickUser === gamer.userName) {
      var audio = new Audio(MP_btn2);
      audio.play();
      this.setState({ pickUser: "" });
    } else if (gamer.isDead === false) {
      var audio = new Audio(MP_btn2);
      audio.play();
      this.setState({ pickUser: gamer.userName });
    }
    console.log("선택한 유저" + this.state.pickUser);
  };

  // 밤 역할 있는 문어가 유저를 선택하는 함수 (state의 pickUser가 선택한 userName으로 넘어감)
  selectVoteAtNight = (gamer, e) => {
    e.preventDefault();
    if (this.props.gamerData.job === "의사") {
      if (this.state.pickUser === gamer.userName) {
        var audio = new Audio(MP_btn2);
        audio.play();
        this.setState({ pickUser: "" });
      } else if (gamer.isDead === false) {
        var audio = new Audio(MP_btn2);
        audio.play();
        this.setState({ pickUser: gamer.userName });
      }
    } else {
      if (gamer.userName === this.props.gamerData.userName) {
        console.log("자기 자신은 선택 X");
      } else if (this.state.pickUser === gamer.userName) {
        var audio = new Audio(MP_btn2);
        audio.play();
        this.setState({ pickUser: "" });
      } else if (gamer.isDead === false) {
        var audio = new Audio(MP_btn2);
        audio.play();
        this.setState({ pickUser: gamer.userName });
      }

      if (this.props.gamerData.job === "기자") {
        if (this.state.hasSkill === true) {
          if (gamer.userName === this.props.gamerData.userName) {
            console.log("자기 자신은 선택 X");
          } else if (this.state.pickUser === gamer.userName) {
            var audio = new Audio(MP_btn2);
            audio.play();
            this.setState({ pickUser: "" });
            console.log("reporterpick 같은 유저 선택", this.state.pickUser);
          } else if (gamer.isDead === false) {
            var audio = new Audio(MP_btn2);
            audio.play();
            // console.log(g)
            this.setState({ pickUser: gamer.userName });
            console.log("reporterpick 지금 기자가 밤에 찍은 사람 누구?", this.state.pickUser);
          }
        }
        console.log(
          "기자 능력 확인 : ",
          this.props.gamerData.hasSkill === false ? "사용" : "미사용"
        );
      }
    }
    console.log("선택한 유저" + this.state.pickUser);
  };

  // 마피아 죽일 사람 선택하는 함수
  selectPerson = (gamer, e) => {
    e.preventDefault();
    if (gamer.isDead === false && gamer.gameJob !== "마피아") {
      var audio = new Audio(MP_btn2);
      audio.play();
      if (this.state.pickUser === gamer.userName) {
        this.setState({ pickUser: "" });
        console.log("선택한 유저" + this.state.pickUser);
        // 채팅 전송
        this.pickMafiaNotice(gamer, 1);
      } else {
        this.setState({ pickUser: gamer.userName });
        console.log("선택한 유저" + this.state.pickUser);
        // 채팅 전송
        this.pickMafiaNotice(gamer, 2);
      }
    }
  };

  // PICKUSER 변경하는 함수
  changePerson = (pickUser) => {
    console.log("UPDATE PICK USER FROM RECEIVED MESSAGE2 (changePerson 수행)");
    // 다영 이부분은 고민 중
    var audio = new Audio(MP_btn2);
    audio.play();
    if (this.state.pickUser === pickUser) {
      this.setState({ pickUser: "" });
    } else {
      console.log("다른 마피아 선택 변경 : ", pickUser);
      this.setState({ pickUser: pickUser.pickUser });
    }
    console.log("다른 마피아 선택 변경 완료 : ", this.state.pickUser);
  };

  // 마피아 밤 죽일 사람 => CHATTING MESSAGE 전송
  pickMafiaNotice(gamer, idx) {
    if (idx === 1) {
      console.log("MAFIA : SEND MESSAGE, NOTICE 감지");
      console.log("PICK USER", "없음, 두 번 클릭");
      const data = {
        mafiaName: this.props.gamerData.userName,
        gamer: { userName: "" },
        nickname: "서버",
        streamId: this.state.localUser.getStreamManager().stream.streamId,
      };
      this.state.localUser.getStreamManager().stream.session.signal({
        data: JSON.stringify(data),
        type: "mafia",
      });
    } else {
      console.log("MAFIA : SEND MESSAGE, NOTICE 감지");
      console.log("PICK USER", gamer);
      const data = {
        mafiaName: this.props.gamerData.userName,
        gamer: gamer,
        nickname: "서버",
        streamId: this.state.localUser.getStreamManager().stream.streamId,
      };
      this.state.localUser.getStreamManager().stream.session.signal({
        data: JSON.stringify(data),
        type: "mafia",
      });
    }
  }

  // clickBtnMiniGame = (e) => {
  //   if (e === 1) {
  //     console.log("낚시게임 리덕스에 저장");
  //     this.settingFisher({ fisher: true });
  //   } else if (e === 2) {
  //     console.log("상어게임 리덕스에 저장");
  //     this.settingShark({ shark: true });
  //   }
  //   this.usingMinigame({ idx: e - 1 });
  // };

  clickSharkMiniGame = () => {
    var audio = new Audio(MP_btn1);
    audio.play();
    this.props.setShark();
    this.usingMinigame({ idx: 1 });
  };

  clickFisherMiniGame = () => {
    var audio = new Audio(MP_btn1);
    audio.play();
    this.props.setFisher();
    this.usingMinigame({ idx: 0 });
  };

  clickBtnGame = (e) => {
    var audio = new Audio(MP_btn2);
    audio.play();
    console.log("clickBtnGame : " + e);
    // this.setState({ page: 2 });
    // if (e === 1) {
    //   this.setState({ gameNum: 1 });
    // } else if (e === 2) {
    //   this.setState({ gameNum: 2 });
    // }

    // const startTimer = setTimeout(() => {
    //   console.log("startTimer");
    //   this.props.selectGame(e);
    // }, 4000); // 여기 수정 v
    // const startTimerReturnDay = setTimeout(() => {
    //   console.log("startTimerReturnDay");
    //   this.setState({ page: 10 });
    // }, 34000); // 여기 수정 v
    // return () => clearTimeout(startTimerReturnDay, startTimer);
  };

  // 찬반 버튼 누르면 state.agree가 바뀜

  selectAgree = (e) => {
    var audio = new Audio(MP_btn2);
    audio.play();
    this.setState({ agree: true });
    console.log("AGREE VOTE 찬성 여부 : " + this.state.agree);
    // 다영 테스트 지워야함
    // this.state.localUser.getStreamManager().stream.session.signal({
    //   type: "agreeVoteEnd",
    // });
  };
  // 다영 수정
  selectDisAgree = (e) => {
    var audio = new Audio(MP_btn2);
    audio.play();
    this.setState({ agree: false });
    console.log("AGREE VOTE 찬성 여부 : " + this.state.agree);
    // 다영 테스트 지워야함
    // this.state.localUser.getStreamManager().stream.session.signal({
    //   type: "agreeVoteEnd",
    // });
  };

  clickBtnAuto() {
    this.state.voteWaitPageStart = 1;
  }

  // 하민 (승리 유저 갱신)
  setVictoryUser = (data) => {
    this.setState({ victoryUsers: data });
    console.log("승리 유저 바뀜!");
    if (this.props.waitData.roomChief === this.state.myUserName) {
      this.state.localUser.getStreamManager().stream.session.signal({
        type: "gameEnd",
      });
    }
  };

  // 다영 (리덕스 gamer : userList <-> subscribers 연결 하는 함수)
  settingListForSub = (data) => {
    this.props.setUserListForSub(data);
  };
  settingLocalUser = (data) => {
    this.props.setLocalUser(data);
  };

  settingPickUser = (data) => {
    this.props.setPickUser(data);
  };

  settingHasntSkill = (data) => {
    this.props.setHasntSkill(data);
  };
  settingShark = (data) => {
    this.props.setShark(data);
  };
  settingFisher = (data) => {
    this.props.setFisher(data);
  };
  usingMinigame = (data) => {
    this.props.getMinigame(data);
  };

  updatePickUser = () => {
    console.log("pickUser 들어옴", this.state.pickUser);
    axios
      .put(
        `${BASE_URL}/night/update/${this.state.pickUser === "" ? "없음" : this.state.pickUser}/${
          this.props.userData.userInfo.userName
        }`
      )
      .then((res) => {
        console.log("DB에 지목상대 저장!");
        this.settingPickUser({ pickUser: this.state.pickUser });
        console.log("pickUser 고름", this.props.gamerData);
        if (
          (this.props.gamerData.job === "경찰" || this.props.gamerData.job === "크레이지경찰") &&
          this.state.pickUser != ""
        ) {
          console.log("경찰이 수사함", `gamers/ismafia/${this.state.pickUser}`);
          //axios.get(`${BASE_URL}/gamers/ismafia/${this.state.pickUser}`).then((res) => {
          let message = "";
          this.props.gamerData.userList.map((user, i) => {
            if (this.state.pickUser === user.userName) {
              message =
                user.gameJob === "마피아"
                  ? `${this.state.pickUser} 님은 오징어가 맞습니다.`
                  : `${this.state.pickUser} 님은 오징어가 아닙니다.`.replace(/ +(?= )/g, "");
            }
          });
          const data = {
            message: message,
            nickname: "사회자",
            streamId: this.state.localUser.getStreamManager().stream.streamId,
            isDead: this.props.gamerData.isDead, // 메세지 보낼 때 생사도 함께 보낸다.
            job: this.props.gamerData.job,
            gameStatus: this.props.gamerData.gameStatus,
          };
          setTimeout(() => {
            this.state.localUser.getStreamManager().stream.session.signal({
              data: JSON.stringify(data),
              type: "chat",
            });
          });
          //});
        } else if (this.props.gamerData.job === "기자" && this.state.pickUser !== "") {
          this.settingHasntSkill();
        }
      });
    setTimeout(() => {
      this.nightResult();
    }, 1000);
  };

  nightResult() {
    axios.get(`${BASE_URL}/nights/result/${this.props.gamerData.roomId}`).then((res) => {
      console.log("밤 결과 확인!", res.data);
      this.setState({ killed: res.data.userName });
      console.log("killed  state에 잘 들어갔는지 확인!!", this.state.killed);
      if (res.data.userName != "없음") {
        console.log("누가 죽었니?", res.data.userName);
        this.props.updateUserListforDead({ userName: res.data.userName });
      }
    });
  }

  getPickUser = () => {
    console.log("getPickUser실행!!!", this.state.pickUser);
    return this.state.pickUser;
  };

  resetPickUser = () => {
    this.setState({ pickUser: "" });
  };

  getHasSkill = () => {
    return this.state.hasSkill;
  };

  getGamerData = () => {
    return this.props.gamerData;
  };
  // 다영 수정
  updatePickUserAtVote = () => {
    console.log("VOTE한 PICK USER 들어옴", this.state.pickUser);
    const data = {
      idx: 0,
      roomId: 0,
      userName: this.state.pickUser,
      vote: 0,
    };
    if (this.props.gamerData.job === "시장") {
      axios
        .put(`${BASE_URL}/votes/daytime/mayor`, JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res) => {
          console.log(data);
          console.log("투표 저장!", data);
        });
    } else {
      axios
        .put(`${BASE_URL}/votes/daytime/etc`, JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res) => {
          console.log("투표 저장!", data);
        });
    }
    setTimeout(() => {
      this.voteResult();
    }, 1000);
  };

  voteResult() {
    if (this.props.waitData.roomChief === this.props.gamerData.userName) {
      axios.get(`${BASE_URL}/votes/max/${this.props.gamerData.roomId}`).then((res) => {
        console.log("투표 결과 확인!", res.data);
        this.setState({ voteName: res.data.userName });

        console.log("VOTE : SEND MESSAGE, NOTICE 감지");
        console.log("MOST VOTES : ", res.data.userName);
        this.setState({ pickUser: res.data.userName });
        const data = {
          votes: res.data,
          nickname: "사회자",
          streamId: this.state.localUser.getStreamManager().stream.streamId,
        };
        this.state.localUser.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: "voteResult",
        });
      });
    }
  }

  // 다영 수정
  updatePickUserAtAgreeVote = () => {
    console.log("AGREE VOTE한 PICK USER 들어옴", this.state.pickUser);
    // this.setState({ pickUser: "c4" }); // 테스트용 지워야함 다영
    const data = {
      idx: 0,
      roomId: 0,
      userName: this.state.pickUser,
      vote: 0,
    };
    if (this.state.agree) {
      // 찬성
      axios
        .put(`${BASE_URL}/votes/agree`, JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res) => {
          console.log(data);
          console.log("처형 찬성!", data);
        });
    } else {
      // 반대
      axios
        .put(`${BASE_URL}/votes/disagree`, JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res) => {
          console.log("처형 반대!", data);
        });
    }
    setTimeout(() => {
      this.agreeVoteResult();
    }, 1000);
  };

  agreeVoteResult = () => {
    this.setState({ voteName: "skip" });
    if (this.props.waitData.roomChief === this.props.gamerData.userName) {
      axios.get(`${BASE_URL}/votes/${this.state.pickUser}`).then((res) => {
        console.log("투표 결과 확인!", res.data);

        console.log("AGREE VOTE : SEND MESSAGE, NOTICE 감지");
        console.log("AGREE VOTE RESULT : ", res.data.vote);

        const data = {
          votes: res.data,
          nickname: "사회자",
          streamId: this.state.localUser.getStreamManager().stream.streamId,
        };
        this.state.localUser.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: "agreeVoteResult",
        });
      });
    }
  };

  killPickUser = () => {
    console.log("AGREE VOTE한 PICK USER : ", this.state.pickUser);
    this.setState({ voteName: "처형" });
    if (this.state.pickUser === this.props.gamerData.sjh) {
      let victoryUsers = [];

      axios.put(`${BASE_URL}/gamers/isvictory/userName/${this.state.pickUser}`).then((res) => {
        console.log(res);
        console.log("AGREE VOTE : 처형 => 재간둥이 O => 종료 페이지 GO");
        console.log("AGREE VOTE : 재간둥이 승리!!");

        axios
          .get(`${BASE_URL}/gamers/winners`)
          .then((res) => {
            victoryUsers = res.data.map((row) => row.userName);
            this.setVictoryUser(victoryUsers);
            this.state.localUser.getStreamManager().stream.session.signal({
              type: "agreeVoteGoAndGameEnd",
            });
            console.log("처형 페이지로 이동 후 종료! ");
          })
          .catch((err) => console.log(err));
      });
    } else {
      console.log("AGREE VOTE : 처형 => 재간둥이 X => 처형 페이지 GO");
      const data = {
        idx: 0,
        roomId: 0,
        userName: this.state.pickUser,
        vote: 0,
      };

      axios
        .put(`${BASE_URL}/gamers/dead`, JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res) => {
          console.log(data);
          console.log("AGREE VOTE : 처형!!", data);

          // 리덕스 죽음 처리
          this.state.localUser.getStreamManager().stream.session.signal({
            data: JSON.stringify(data),
            type: "dead",
          });

          let pathName = document.location.pathname.replace("/", "");
          let victoryUsers = [];
          axios
            .get(`${BASE_URL}/gamers/victory/team/${pathName}`)
            .then((res) => {
              if (res.data.victory) {
                axios
                  .put(`${BASE_URL}/gamers/isvictory/gameTeam/${pathName}/${res.data.gameTeam}`)
                  .then((res) => {
                    axios
                      .get(`${BASE_URL}/gamers/winners`)
                      .then((res) => {
                        victoryUsers = res.data.map((row) => row.userName);
                        this.setVictoryUser(victoryUsers);
                        this.state.localUser.getStreamManager().stream.session.signal({
                          type: "agreeVoteGoAndGameEnd",
                        });
                        console.log("처형 페이지로 이동후 종료 페이지로 이동 ! ");
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              } else {
                // 처형페이지 이동
                this.state.localUser.getStreamManager().stream.session.signal({
                  type: "agreeVoteGo",
                });
              }
            })
            .catch((err) => console.log(err));
        });
    }
  };
  // 15턴 게임횟수 세는 함수 (다영 수정)
  checkGameTurn = () => {
    console.log("현재 GAME TURN : ", this.props.gamerData.gameturn);

    let pathName = document.location.pathname.replace("/", "");
    let victoryUsers = [];

    if (this.props.gamerData.gameturn === 15) {
      if (this.props.gamerData.userName === this.props.waitData.roomChief) {
        const gameTeam = "마피아";
        axios
          .put(`${BASE_URL}/gamers/isvictory/gameTeam/${pathName}/${gameTeam}`)
          .then((res) => {
            axios
              .get(`${BASE_URL}/gamers/winners`)
              .then((res) => {
                victoryUsers = res.data.map((row) => row.userName);
                this.setVictoryUser(victoryUsers);
                console.log("종료 페이지로 이동 !");
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    }
  };

  render() {
    const mySessionId = this.props.sessionName; // !== undefined ? this.props.sessionName : "SessionA";

    const localUser = this.state.localUser;
    var chatDisplay = { display: this.state.chatDisplay };
    return (
      <div className="screen" id="screen-div">
        {this.state.page === 0 && ( // 대기실
          <div>
            {/* <WaitingComponent /> */}
            <WaitingRoomPage clickExitBtn={this.props.clickExitBtn} />
            <div className="d-flex">
              <ShowRoom
                roomName={this.props.roomName}
                personNum={this.props.personNum}
                roomId={this.props.roomId}
                roomChief={this.props.roomChief}
                isPrivate={this.props.isPrivate}
                roomPw={this.props.roomPw}
                gameTime={this.props.gameTime}
              />
              <div className="d-flex justify-content-between">
                {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                  <div className="chating-box" style={chatDisplay}>
                    <ChatComponent
                      user={localUser}
                      chatDisplay={this.state.chatDisplay}
                      close={this.toggleChat}
                      ref={this.ovref}
                      roomName={this.props.roomName}
                      settingListForSub={this.settingListForSub}
                      subscribers={this.state.subscribers}
                      canSend="true"
                      changeTime={this.changeTime}
                      changePage={this.changePage}
                      clickBtnGame={this.clickBtnGame}
                      changePerson={this.changePerson}
                      updatePickUser={this.updatePickUser}
                      getPickUser={this.getPickUser}
                      resetPickUser={this.resetPickUser}
                      getHasSkill={this.getHasSkill}
                      updatePickUserAtVote={this.updatePickUserAtVote}
                      getGamerData={this.getGamerData}
                      updatePickUserAtAgreeVote={this.updatePickUserAtAgreeVote}
                      killPickUser={this.killPickUser}
                      setVoteName={this.setVoteName}
                    />
                  </div>
                )}
                <div className="setting_box">
                  <div id="layout" className="bounds">
                    {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                      <div className="OT_root OT_publisher custom-class" id="localUser">
                        <StreamComponent user={localUser} />
                        <ToolbarComponent
                          user={localUser}
                          camStatusChanged={this.camStatusChanged}
                          micStatusChanged={this.micStatusChanged}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    {this.props.waitData.roomChief === this.state.myUserName && (
                      <button className="start__btn" onClick={this.clickBtn}>
                        START
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {this.state.page === 1 && ( // 직업 카드 애니메이션
          <div>
            {this.props.gamerData.job === "마피아" && <MafiaCard />}
            {this.props.gamerData.job === "크레이지경찰" && <CrazyCard />}
            {this.props.gamerData.job === "경찰" && <PoliceCard />}
            {this.props.gamerData.job === "의사" && <DoctorCard />}
            {this.props.gamerData.job === "시장" && <MayorCard />}
            {this.props.gamerData.job === "기자" && <ReporterCard />}
            {this.props.gamerData.job === "재간둥이" && <NeutralCard />}
          </div>
        )}
        {this.state.page === 2 && ( // 밤 애니메이션
          <div>
            {/* 다영 수정 */}
            <DayToNightLoading page={this.state.page} checkGameTurn={this.checkGameTurn} />
          </div>
        )}
        {/* 밤페이지 - 밤역할 수행 x (시장, 재간둥이, 능력 쓴 기자) */}
        {this.state.page === 3 &&
          this.props.gamerData.isDead === false &&
          (this.props.gamerData.job === "시장" ||
            this.props.gamerData.job === "재간둥이" ||
            (this.props.gamerData.job === "기자" && this.props.gamerData.gameturn === 1 && this.props.gamerData.hasSkill === true) ||
            (this.props.gamerData.job === "기자" && this.props.gamerData.hasSkill === false)
            ) && (
            <div className="d-flex justify-content-between">
              <NightComponent />
              <div>
                {this.props.gamerData.userList.slice(0, 4).map((subGamer, i) => (
                  <div id="layout" className="ingame-bounds">
                    <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers">
                      {subGamer.isDead === true ? (
                        <img src="images/deadOcto.png" width="200" />
                      ) : (
                        <img src="images/octoAtNight.png" width="200" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex flex-column justify-content-between">
                <div>
                  <NightOctopi />
                </div>
                <h1 className="timer">{this.state.timer}</h1>
                <div className="chating-box" style={chatDisplay}>
                  <ChatComponent
                    user={localUser}
                    chatDisplay={this.state.chatDisplay}
                    close={this.toggleChat}
                    settingListForSub={this.settingListForSub}
                    subscribers={this.state.subscribers}
                    canSend="false"
                    changeTime={this.changeTime}
                    changePage={this.changePage}
                    clickBtnGame={this.clickBtnGame}
                    changePerson={this.changePerson}
                    updatePickUser={this.updatePickUser}
                    getPickUser={this.getPickUser}
                    resetPickUser={this.resetPickUser}
                    getHasSkill={this.getHasSkill}
                    getGamerData={this.getGamerData}
                    updatePickUserAtAgreeVote={this.updatePickUserAtAgreeVote}
                    killPickUser={this.killPickUser}
                    setVoteName={this.setVoteName}
                  />
                </div>
              </div>
              <div>
                {this.props.gamerData.userList.slice(4, 8).map((subGamer, i) => (
                  <div id="layout" className="ingame-bounds">
                    <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers">
                      {subGamer.isDead === true ? (
                        <img src="images/deadOcto.png" width="200" />
                      ) : (
                        <img src="images/octoAtNight.png" width="200" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        {/* 밤페이지 - 밤역할 수행 o (마피아) */}
        {this.state.page === 3 &&
          this.props.gamerData.isDead === false &&
          this.props.gamerData.job === "마피아" && (
            <div className="d-flex justify-content-between">
              <NightComponent />
              <div>
                {this.props.gamerData.userList.slice(0, 4).map((subGamer, i) => (
                  <div
                    id="layout"
                    className={"ingame-bounds"}
                    onClick={(e) => this.selectPerson(subGamer, e)}
                  >
                    <div
                      key={i}
                      className={
                        subGamer.userName === this.state.pickUser
                          ? "OT_root OT_publisher custom-class ingame_picked_user"
                          : "OT_root OT_publisher custom-class"
                      }
                      id="remoteUsers"
                    >
                      {subGamer.isDead === true ? (
                        <img src="images/deadOcto.png" width="200" />
                      ) : subGamer.gameJob !== "마피아" ? (
                        <div className="octo-night-box">
                          <img src="images/octoAtNight.png" width="200" />
                          <p className="gamer-nickname">{subGamer.userName}</p>
                        </div>
                      ) : (
                        <StreamComponent
                          user={
                            subGamer.subIdx === undefined
                              ? localUser
                              : this.state.subscribers[subGamer.subIdx]
                          }
                        />
                      )}
                      {subGamer.userName === this.state.myUserName && (
                        <ToolbarComponent
                          user={localUser}
                          camStatusChanged={this.camStatusChanged}
                          micStatusChanged={this.micStatusChanged}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex flex-column justify-content-between">
                <div>
                  <MafiaNightOctopi />
                </div>
                <div className="timer_bar">
                  <h1 className="timer_night">{this.state.timer}</h1>
                  <div className="mafiaButtons">
                    <p className="icons-property"></p>
                    {this.props.gamerData.minigameList[0] === true ? (
                      <button onClick={this.clickFisherMiniGame} className="mafiaEventBtn">
                        <img src="icons/icons8-spinner-lure-50.png" alt="lure event" />
                      </button>
                    ) : (
                      <button className="usedEventBtn">
                        <img src="icons/icons8-spinner-lure-50.png" alt="lure event" />
                      </button>
                    )}
                    {this.props.gamerData.minigameList[1] === true ? (
                      <button onClick={this.clickSharkMiniGame} className="mafiaEventBtn">
                        <img src="icons/icons8-shark-50.png" alt="shark event" />
                      </button>
                    ) : (
                      <button className="usedEventBtn">
                        <img src="icons/icons8-shark-50.png" alt="shark event" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="chating-box" style={chatDisplay}>
                  <ChatComponent
                    user={localUser}
                    chatDisplay={this.state.chatDisplay}
                    close={this.toggleChat}
                    settingListForSub={this.settingListForSub}
                    subscribers={this.state.subscribers}
                    canSend="true"
                    changeTime={this.changeTime}
                    changePage={this.changePage}
                    clickBtnGame={this.clickBtnGame}
                    changePerson={this.changePerson}
                    updatePickUser={this.updatePickUser}
                    getPickUser={this.getPickUser}
                    resetPickUser={this.resetPickUser}
                    getHasSkill={this.getHasSkill}
                    updatePickUserAtVote={this.updatePickUserAtVote}
                    getGamerData={this.getGamerData}
                    updatePickUserAtAgreeVote={this.updatePickUserAtAgreeVote}
                    killPickUser={this.killPickUser}
                    setVoteName={this.setVoteName}
                  />
                </div>
              </div>
              <div>
                {this.props.gamerData.userList.slice(4, 8).map((subGamer, i) => (
                  <div
                    id="layout"
                    className={"ingame-bounds"}
                    onClick={(e) => this.selectPerson(subGamer, e)}
                  >
                    <div
                      key={i}
                      className={
                        subGamer.userName === this.state.pickUser
                          ? "OT_root OT_publisher custom-class ingame_picked_user"
                          : "OT_root OT_publisher custom-class"
                      }
                      id="remoteUsers"
                    >
                      {subGamer.isDead === true ? (
                        <img src="images/deadOcto.png" width="200" />
                      ) : subGamer.gameJob !== "마피아" ? (
                        <div className="octo-night-box">
                          <img src="images/octoAtNight.png" width="200" />
                          <p className="gamer-nickname">{subGamer.userName}</p>
                        </div>
                      ) : (
                        <StreamComponent
                          user={
                            subGamer.subIdx === undefined
                              ? localUser
                              : this.state.subscribers[subGamer.subIdx]
                          }
                        />
                      )}
                      {subGamer.userName === this.state.myUserName && (
                        <ToolbarComponent
                          user={localUser}
                          camStatusChanged={this.camStatusChanged}
                          micStatusChanged={this.micStatusChanged}
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
        {/* 밤페이지 - 밤역할 수행 o 의사, 경찰, 능력있는 기자 */}
        {this.state.page === 3 &&
          this.props.gamerData.isDead === false &&
          (this.props.gamerData.job === "의사" ||
            this.props.gamerData.job === "경찰" ||
            this.props.gamerData.job === "크레이지경찰" ||
            (this.props.gamerData.job === "기자" && this.props.gamerData.hasSkill === true && this.props.gamerData.gameturn > 1)) && (
            <div className="d-flex justify-content-between">
              <NightComponent />
              {console.log("start police")}
              <div>
                {this.props.gamerData.userList.slice(0, 4).map((subGamer, i) => (
                  <div
                    id="layout"
                    className="ingame-bounds"
                    onClick={(e) => this.selectVoteAtNight(subGamer, e)}
                  >
                    <div
                      key={i}
                      className={
                        subGamer.userName === this.state.pickUser
                          ? "OT_root OT_publisher custom-class ingame_picked_user"
                          : "OT_root OT_publisher custom-class"
                      }
                      id="remoteUsers"
                    >
                      {subGamer.isDead === true ? (
                        <img src="images/deadOcto.png" width="200" />
                      ) : subGamer.userName !== this.props.gamerData.userName ? (
                        <div className="octo-night-box">
                          <img src="images/octoAtNight.png" width="200" />
                          <p className="gamer-nickname">{subGamer.userName}</p>
                        </div>
                      ) : (
                        <StreamComponent
                          user={
                            subGamer.subIdx === undefined
                              ? localUser
                              : this.state.subscribers[subGamer.subIdx]
                          }
                        />
                      )}
                      {subGamer.userName === this.state.myUserName && (
                        <ToolbarComponent
                          user={localUser}
                          camStatusChanged={this.camStatusChanged}
                          micStatusChanged={this.micStatusChanged}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex flex-column justify-content-between">
                <div>
                  <NightOctopi />
                </div>
                <div>
                  {this.state.hasSkill === true && this.props.gamerData.job === "기자" && (
                    <div className="timer_bar">
                      <h1 className="timer_night">{this.state.timer}</h1>
                      <p className="reporter-skill-button">
                        <img src="icons/icons8-news-50.png" /> 기자 능력 사용 가능{" "}
                      </p>
                    </div>
                  )}
                </div>
                {this.props.gamerData.job != "기자" && (
                  <h1 className="timer">{this.state.timer}</h1>
                )}
                <div className="chating-box" style={chatDisplay}>
                  <ChatComponent
                    user={localUser}
                    chatDisplay={this.state.chatDisplay}
                    close={this.toggleChat}
                    settingListForSub={this.settingListForSub}
                    subscribers={this.state.subscribers}
                    canSend="false"
                    changeTime={this.changeTime}
                    changePage={this.changePage}
                    clickBtnGame={this.clickBtnGame}
                    changePerson={this.changePerson}
                    updatePickUser={this.updatePickUser}
                    getPickUser={this.getPickUser}
                    resetPickUser={this.resetPickUser}
                    getHasSkill={this.getHasSkill}
                    updatePickUserAtVote={this.updatePickUserAtVote}
                    getGamerData={this.getGamerData}
                    updatePickUserAtAgreeVote={this.updatePickUserAtAgreeVote}
                    killPickUser={this.killPickUser}
                    setVoteName={this.setVoteName}
                  />
                </div>
              </div>
              <div>
                {this.props.gamerData.userList.slice(4, 8).map((subGamer, i) => (
                  <div
                    id="layout"
                    className="ingame-bounds"
                    onClick={(e) => this.selectVoteAtNight(subGamer, e)}
                  >
                    <div
                      key={i}
                      className={
                        subGamer.userName === this.state.pickUser
                          ? "OT_root OT_publisher custom-class ingame_picked_user"
                          : "OT_root OT_publisher custom-class"
                      }
                      id="remoteUsers"
                    >
                      {subGamer.isDead === true ? (
                        <img src="images/deadOcto.png" width="200" />
                      ) : subGamer.userName !== this.props.gamerData.userName ? (
                        <div className="octo-night-box">
                          <img src="images/octoAtNight.png" width="200" />
                          <p className="gamer-nickname">{subGamer.userName}</p>
                        </div>
                      ) : (
                        <StreamComponent
                          user={
                            subGamer.subIdx === undefined
                              ? localUser
                              : this.state.subscribers[subGamer.subIdx]
                          }
                        />
                      )}
                      {subGamer.userName === this.state.myUserName && (
                        <ToolbarComponent
                          user={localUser}
                          camStatusChanged={this.camStatusChanged}
                          micStatusChanged={this.micStatusChanged}
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
        {this.state.page === 3 && this.props.gamerData.isDead === true && (
          <div className="d-flex justify-content-between">
            <NightComponent />
            <div>
              {this.props.gamerData.userList.slice(0, 4).map((subGamer, i) => (
                <div id="layout" className="ingame-bounds">
                  <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers">
                    {subGamer.isDead === true ? (
                      <img src="images/deadOcto.png" width="200" />
                    ) : (
                      <img src="images/octoAtNight.png" width="200" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex flex-column justify-content-between">
              <div>
                <NightOctopi />
              </div>
              <h1 className="timer">{this.state.timer}</h1>
              <div className="chating-box" style={chatDisplay}>
                <ChatComponent
                  user={localUser}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  settingListForSub={this.settingListForSub}
                  subscribers={this.state.subscribers}
                  canSend="true"
                  changeTime={this.changeTime}
                  changePage={this.changePage}
                  clickBtnGame={this.clickBtnGame}
                  changePerson={this.changePerson}
                  updatePickUser={this.updatePickUser}
                  getPickUser={this.getPickUser}
                  resetPickUser={this.resetPickUser}
                  getHasSkill={this.getHasSkill}
                  updatePickUserAtVote={this.updatePickUserAtVote}
                  getGamerData={this.getGamerData}
                  updatePickUserAtAgreeVote={this.updatePickUserAtAgreeVote}
                  killPickUser={this.killPickUser}
                  setVoteName={this.setVoteName}
                />
              </div>
            </div>
            <div>
              {this.props.gamerData.userList.slice(4, 8).map((subGamer, i) => (
                <div id="layout" className="ingame-bounds">
                  <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers">
                    {subGamer.isDead === true ? (
                      <img src="images/deadOcto.png" width="200" />
                    ) : (
                      <img src="images/octoAtNight.png" width="200" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* 밤 => 낮 애니메이션
         */}
        {this.state.page === 7 && (
          <div className="day-to-night-sky">
            <NightToDayLoading setVictoryUser={this.setVictoryUser} />
          </div>
        )}
        {/* 죽음 결과
         */}
        {this.state.page === 8 && (
          <div className="night-result">
            <DeathResultComponent user={this.state.localUser} killed={this.state.killed} />
          </div>
        )}
        {/* 기자 결과s
         */}
        {this.state.page === 9 && (
          <div className="report-result">
            <NewsResultComponent />
          </div>
        )}
        {/* 낮
         */}
        {this.state.page === 10 && (
          <div className="d-flex justify-content-between">
            {/* <DayComponent /> */}
            <div>
              {this.props.gamerData.userList.slice(0, 4).map((subGamer, i) => (
                <div
                  id="layout"
                  className={
                    this.state.speakingUsers[i] && subGamer.isDead === false
                      ? "ingame-bounds-speaking"
                      : "ingame-bounds"
                  }
                >
                  <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers">
                    {subGamer.isDead === true ? (
                      <img src="images/deadOcto.png" width="200" />
                    ) : (
                      <StreamComponent
                        user={
                          subGamer.subIdx === undefined
                            ? localUser
                            : this.state.subscribers[subGamer.subIdx]
                        }
                      />
                    )}
                    {subGamer.userName === this.state.myUserName && (
                      <ToolbarComponent
                        user={localUser}
                        camStatusChanged={this.camStatusChanged}
                        micStatusChanged={this.micStatusChanged}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex flex-column justify-content-between">
              <div>
                <DayOctopi />
              </div>
              <h1 className="timer">{this.state.timer}</h1>
              <div className="chating-box" style={chatDisplay}>
                <ChatComponent
                  user={localUser}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  ref={this.ovref}
                  roomName={this.props.roomName}
                  settingListForSub={this.settingListForSub}
                  subscribers={this.state.subscribers}
                  canSend="true"
                  changeTime={this.changeTime}
                  changePage={this.changePage}
                  clickBtnGame={this.clickBtnGame}
                  changePerson={this.changePerson}
                  updatePickUser={this.updatePickUser}
                  getPickUser={this.getPickUser}
                  resetPickUser={this.resetPickUser}
                  getHasSkill={this.getHasSkill}
                  updatePickUserAtVote={this.updatePickUserAtVote}
                  getGamerData={this.getGamerData}
                  updatePickUserAtAgreeVote={this.updatePickUserAtAgreeVote}
                  killPickUser={this.killPickUser}
                  setVoteName={this.setVoteName}
                />
              </div>
            </div>
            <div>
              {this.props.gamerData.userList.slice(4, 8).map((subGamer, i) => (
                <div
                  id="layout"
                  className={
                    this.state.speakingUsers[i + 4] && subGamer.isDead === false
                      ? "ingame-bounds-speaking"
                      : "ingame-bounds"
                  }
                >
                  <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers">
                    {subGamer.isDead === true ? (
                      <img src="images/deadOcto.png" width="200" />
                    ) : (
                      <StreamComponent
                        user={
                          subGamer.subIdx === undefined
                            ? localUser
                            : this.state.subscribers[subGamer.subIdx]
                        }
                      />
                    )}
                    {subGamer.userName === this.state.myUserName && (
                      <ToolbarComponent
                        user={localUser}
                        camStatusChanged={this.camStatusChanged}
                        micStatusChanged={this.micStatusChanged}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* 투표
         */}
        {this.state.page === 11 && (
          <div className="d-flex justify-content-between">
            <DayComponent />
            <div>
              {this.props.gamerData.userList.slice(0, 4).map((subGamer, i) => (
                <div
                  id="layout"
                  className={
                    this.state.speakingUsers[i] && subGamer.isDead === false
                      ? "ingame-bounds-speaking"
                      : "ingame-bounds"
                  }
                  onClick={(e) => this.selectVote(subGamer, e)}
                >
                  <div
                    key={i}
                    className="OT_root OT_publisher custom-class pick-for-vote"
                    id="remoteUsers"
                  >
                    {subGamer.isDead === true ? (
                      <img src="images/deadOcto.png" width="200" />
                    ) : (
                      <StreamComponent
                        user={
                          subGamer.subIdx === undefined
                            ? localUser
                            : this.state.subscribers[subGamer.subIdx]
                        }
                        picked={this.state.pickUser}
                      />
                    )}
                    {subGamer.userName === this.state.myUserName && (
                      <ToolbarComponent
                        user={localUser}
                        camStatusChanged={this.camStatusChanged}
                        micStatusChanged={this.micStatusChanged}
                      />
                    )}
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
                <DayOctopi />
              </div>
              <h1 className="timer">{this.state.timer}</h1>
              <div className="chating-box" style={chatDisplay}>
                <ChatComponent
                  user={localUser}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  ref={this.ovref}
                  roomName={this.props.roomName}
                  settingListForSub={this.settingListForSub}
                  subscribers={this.state.subscribers}
                  canSend="true"
                  changeTime={this.changeTime}
                  changePage={this.changePage}
                  clickBtnGame={this.clickBtnGame}
                  changePerson={this.changePerson}
                  updatePickUser={this.updatePickUser}
                  getPickUser={this.getPickUser}
                  resetPickUser={this.resetPickUser}
                  getHasSkill={this.getHasSkill}
                  updatePickUserAtVote={this.updatePickUserAtVote}
                  getGamerData={this.getGamerData}
                  updatePickUserAtAgreeVote={this.updatePickUserAtAgreeVote}
                  killPickUser={this.killPickUser}
                  setVoteName={this.setVoteName}
                />
              </div>
            </div>
            <div>
              {this.props.gamerData.userList.slice(4, 8).map((subGamer, i) => (
                <div
                  id="layout"
                  className={
                    this.state.speakingUsers[i + 4] && subGamer.isDead === false
                      ? "ingame-bounds-speaking"
                      : "ingame-bounds"
                  }
                  onClick={(e) => this.selectVote(subGamer, e)}
                >
                  <div
                    key={i}
                    className="OT_root OT_publisher custom-class pick-for-vote"
                    id="remoteUsers"
                  >
                    {subGamer.isDead === true ? (
                      <img src="images/deadOcto.png" width="200" />
                    ) : (
                      <StreamComponent
                        user={
                          subGamer.subIdx === undefined
                            ? localUser
                            : this.state.subscribers[subGamer.subIdx]
                        }
                        picked={this.state.pickUser}
                      />
                    )}
                    {subGamer.userName === this.state.myUserName && (
                      <ToolbarComponent
                        user={localUser}
                        camStatusChanged={this.camStatusChanged}
                        micStatusChanged={this.micStatusChanged}
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
        {/* 투표 집계 애니메이션
         */}
        {this.state.page === 12 && (
          <div>
            <VoteAnimationComponent />
          </div>
        )}
        {/* 투표 결과 애니메이션
         */}
        {this.state.page === 16 && (
          <div>
            <VoteDoneAnimationComponent voteName={this.state.voteName} />
          </div>
        )}
        {/* 최후 변론 + 찬반페이지 */}
        {this.state.page === 13 && (
          <div className="d-flex justify-content-center">
            <VoteAgreeComponent />
            <div className="d-flex flex-column justify-content-between">
              <h1 className="timer">{this.state.timer}</h1>
              <div id="layout" className="voted-bounds">
                {localUser !== undefined &&
                  localUser.getStreamManager() !== undefined && (
                    <div
                      className="OT_root OT_publisher custom-class"
                      id="localUser"
                    >
                      {this.props.gamerData.userList
                        .slice(0, 8)
                        .map((subGamer, i) => (
                          <div>
                            {subGamer.userName === this.state.pickUser ? (
                              <StreamComponent
                                user={
                                  subGamer.subIdx === undefined
                                    ? localUser
                                    : this.state.subscribers[subGamer.subIdx]
                                }
                              />
                            ) : (
                              <div className="agree-non-pickuser">
                                <StreamComponent
                                  user={
                                    subGamer.subIdx === undefined
                                      ? localUser
                                      : this.state.subscribers[subGamer.subIdx]
                                  }
                                />
                              </div>
                            )}
                          </div>
                        ))}
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
                  onClick={(e) => this.selectDisAgree(e)}
                  disabled={this.state.agree === false ? true : false}
                  className="agree__btn"
                >
                  반대
                </button>
              </div>
            </div>
          </div>
        )}
        {/* 찬반투표 집계 애니메이션
         */}
        {this.state.page === 17 && (
          <div>
            <VoteAnimationComponent />
          </div>
        )}
        {/* 찬반투표 결과 애니메이션
         */}
        {this.state.page === 18 && (
          <div>
            <VoteDoneAnimationComponent voteName={this.state.voteName} />
          </div>
        )}
        {/* 처형 애니메이션
         */}
        {this.state.page === 14 && (
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column justify-content-between">
              <h1 className="timer">{this.state.timer}</h1>
              <div id="layout" className="voted-bounds">
                {localUser !== undefined &&
                  localUser.getStreamManager() !== undefined && (
                    <div
                      className="OT_root OT_publisher custom-class"
                      id="localUser"
                    >
                      {this.props.gamerData.userList
                        .slice(0, 8)
                        .map((subGamer, i) => (
                          <div>
                            {subGamer.userName === this.state.pickUser ? (
                              <StreamComponent
                                user={
                                  subGamer.subIdx === undefined
                                    ? localUser
                                    : this.state.subscribers[subGamer.subIdx]
                                }
                              />
                            ) : (
                              <div></div>
                            )}
                            <ExecutionPage
                              streamId={
                                localUser.streamManager.stream.streamId
                              }
                            />
                          </div>
                        ))}
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}

        {/*
          상어 / 낚시 미니게임
        */}
        {this.state.page === 20 && (
          <div className="d-flex justify-content-between">
            <div>
              {this.props.gamerData.userList.slice(0, 4).map((subGamer, i) => (
                <div
                  id="layout"
                  className={
                    this.state.speakingUsers[i] && subGamer.isDead === false
                      ? "ingame-bounds-speaking"
                      : "ingame-bounds"
                  }
                >
                  <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers">
                    {subGamer.isDead === true ? (
                      <img src="images/deadOcto.png" width="200" />
                    ) : (
                      <StreamComponent
                        user={
                          subGamer.subIdx === undefined
                            ? localUser
                            : this.state.subscribers[subGamer.subIdx]
                        }
                      />
                    )}
                    {subGamer.userName === this.state.myUserName && (
                      <ToolbarComponent
                        user={localUser}
                        camStatusChanged={this.camStatusChanged}
                        micStatusChanged={this.micStatusChanged}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="d-flex flex-column justify-content-between align-items-center"
              style={{ width: "100%" }}
            >
              <SharkGameResult gameNum={this.state.gameNum} />
            </div>
            <div>
              {this.props.gamerData.userList.slice(4, 8).map((subGamer, i) => (
                <div
                  id="layout"
                  className={
                    this.state.speakingUsers[i + 4] && subGamer.isDead === false
                      ? "ingame-bounds-speaking"
                      : "ingame-bounds"
                  }
                >
                  <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers">
                    {subGamer.isDead === true ? (
                      <img src="images/deadOcto.png" width="200" />
                    ) : (
                      <StreamComponent
                        user={
                          subGamer.subIdx === undefined
                            ? localUser
                            : this.state.subscribers[subGamer.subIdx]
                        }
                      />
                    )}
                    {subGamer.userName === this.state.myUserName && (
                      <ToolbarComponent
                        user={localUser}
                        camStatusChanged={this.camStatusChanged}
                        micStatusChanged={this.micStatusChanged}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {this.state.page === 30 && <FishingGame gameNum={this.state.gameNum} />}
        {/*
          최종 게임 결과 
        */}
        {this.state.page === 15 && (
          <div className="d-flex flex-column justify-content-center">
            {/* 승자들 */}
            <div>
              <GameResultPage />
            </div>
            <div className="d-flex justify-content-around winner-box">
              {this.props.gamerData.userList
                .filter((sub) => this.state.victoryUsers.includes(sub.userName))
                .map((subGamer, i) => (
                  <div className="d-flex justify-content-center flex-column">
                    <FontAwesomeIcon icon={faCrown} className="crown winner-crown" />
                    <div id="layout" className="winner-bounds">
                      {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                        <div key={i} className="OT_root OT_publisher custom-class" id="localUser">
                          <StreamComponent
                            user={
                              subGamer.subIdx === undefined
                                ? localUser
                                : this.state.subscribers[subGamer.subIdx]
                            }
                          />
                        </div>
                      )}
                    </div>
                    <p className="result-job-text">{subGamer.gameJob}</p>
                  </div>
                ))}
            </div>
            {/* 패자들 */}
            <div className="d-flex justify-content-center">
              {this.props.gamerData.userList
                .filter((sub) => this.state.victoryUsers.includes(sub.userName) === false)
                .map((subGamer, i) => (
                  <div>
                    <div id="layout" className="loser-bounds col">
                      {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                        <div key={i} className="OT_root OT_publisher custom-class" id="localUser">
                          <StreamComponent
                            user={
                              subGamer.subIdx === undefined
                                ? localUser
                                : this.state.subscribers[subGamer.subIdx]
                            }
                          />
                          {subGamer.userName === this.state.myUserName && (
                            <ToolbarComponent
                              user={localUser}
                              camStatusChanged={this.camStatusChanged}
                              micStatusChanged={this.micStatusChanged}
                            />
                          )}
                        </div>
                      )}
                    </div>
                    <p className="result-job-text">{subGamer.gameJob}</p>
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
            Authorization: "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
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
              window.location.assign(this.OPENVIDU_SERVER_URL + "/accept-certificate");
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
          this.OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection",
          data,
          {
            headers: {
              Authorization: "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
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
    setLocalUser: (data) => {
      dispatch(setLocalUser(data));
    },
    setPickUser: (data) => {
      dispatch(setPickUser(data));
    },
    setHasntSkill: (data) => {
      dispatch(hasntSkill(data));
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
    setReporter: (data) => {
      dispatch(setReporter(data));
    },
    updateUserListforDead: (data) => {
      dispatch(updateUserListforDead(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(OpenViduComponent);
