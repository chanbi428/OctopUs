import { createSlice } from "@reduxjs/toolkit";
import { gamerInit } from "./gamerActions";
import { gamerUserList } from "./gamerActions";
import { gamerDead } from "./gamerActions";

const initialState = {
  gameStatus: 0, // 0 대기실 1 .. 2.. 3.. 4.. ?
  loading: false,
  error: null,
  roomId: null,
  userName: null,
  job: null,
  hasSkill: true,
  isDead: false,
  host: "",
  idx: 0,
  minigameList: [true, true, true], // fish, shark, 미니게임3
  minigameResult: false, // true : Mafia , false : No Mafia
  userList: null,
  messageList: [], // 채팅내용 저장
  subscribers: null,
  shark: false,
  fisher: false,
  reporter: "가가",
  localUser: null,
  pickUser: "",
  gameturn: 0,
};

const gamerSlice = createSlice({
  name: "gamer",
  initialState,
  reducers: {
    // gamer init
    setGamerInit: (state, { payload }) => {
      state.userName = payload.userName;
      state.job = payload.gameJob;
      state.roomId = payload.roomId;
    },
    // set UserName Reducer
    setUserName: (state, { payload }) => {
      state.userName = payload.userName;
    },
    // set RoomId & UserList Reducer
    setRoom: (state, { payload }) => {
      state.roomId = payload.roomId;
    },
    setUserList: (state, { payload }) => {
      state.userList = payload.userList;
    },
    // 게임 status 변경
    setGameStatus: (state, { payload }) => {
      state.gameStatus = payload.gameStatus;
    },
    // 밤에 지목한 사람 업뎃
    setPickUser: (state, { payload }) => {
      state.pickUser = payload.pickUser;
    },
    // 기자 사용 능력 소멸
    hasntSkill: (state) => {
      state.hasSkill = false;
    },
    // 미니 게임 사용했을 때 => 해당 idx = false  리듀서
    getMinigame: (state, { payload }) => {
      state.minigameList[payload.idx] = false;
    },
    // 미니 게임 마피아 승 => minigameResult = true 리듀서
    mafiaWinAtMinigame: (state) => {
      state.minigameResult = true;
    },
    // 미니 게임 마피아 패배 => minigameResult = false 리듀서
    mafiaLoseAtMinigame: (state) => {
      state.minigameResult = false;
    },
    // 죽은 사람 => userList의 isDead = true 리듀서
    updateUserListforDead: (state, { payload }) => {
      console.log("gamerSlice에서 죽음 처리", payload.userName);
      state.userList.forEach((user) => {
        if (user.userName === payload.userName) {
          console.log(payload.userName, "죽었다");
          user.isDead = true;
        }
      });
      if (payload.userName === state.userName) {
        state.isDead = true;
      }
    },
    // subscribers 와 연결
    updateUserListforSub: (state, { payload }) => {
      console.warn("In subscribers");
      console.log(payload.subscribers);

      state.userList.forEach((user) => {
        var idx = 0;
        payload.subscribers.forEach((sub) => {
          if (user.userName === sub.nickname) {
            console.log("match name");
            user.subIdx = idx;
          }
          idx++;
        });
      });
    },
    // set localUser Reducer
    setLocalUser: (state, { payload }) => {
      state.localUser = payload.localUser;
    },
    // set Reporter Reducer
    setReporter: (state, { payload }) => {
      console.log("setReporter 기자", payload);
      state.reporter = payload.reporter;
      console.log("setReporter after 기자", state.reporter);
    },

    // set shark Reducer
    setShark: (state) => {
      state.shark = true;
    },

    // set fisher Reducer
    setFisher: (state) => {
      state.fisher = true;
    },

    // reset shark
    resetShark: (state) => {
      state.shark = false;
    },
    // updateUserListforSub: (state, { payload }) => {
    //   state.userList.forEach((user) => {
    //   })
    // }

    // 죽은 사람 => userList의 isDead = true 리듀서
    // updateUserListforSub: (state, { payload }) => {
    //   state.userList.forEach((user) => {
    //     if (user.userName === payload.userName) {
    //       user.isDead = true;
    //     }
    //   });
    // },
    setIsDead: (state, { payload }) => {
      state.isDead = payload.isDead;
    },
    setJob: (state, { payload }) => {
      state.job = payload.job;
    },
    setMessageList: (state, { payload }) => {
      //state.messageList = [...state.messageList, payload.message];
      if (
        state.messageList.length != 0 &&
        state.messageList.at(-1).nickname == "사회자" &&
        state.messageList.at(-1).job == state.job
      ) {
        console.log("추가하지않음");
      } else {
        state.messageList = [...state.messageList, payload.message];
      }
    },
    setMessageListReset: (state) => {
      state.messageList = [];
    },
    // 턴 체크
    setTurnCheck: (state) => {
      state.gameturn++;
    },
    resetGamer: (state) => {
      state.gameStatus = 0;
      state.loading = false;
      state.error = null;
      state.roomId = null;
      state.userName = null;
      state.job = null;
      state.hasSkill = true;
      state.isDead = false;
      state.host = "";
      state.idx = 0;
      state.minigameList = [true, true, true];
      state.minigameResult = false;
      state.userList = null;
      state.messageList = [];
      state.subscribers = null;
      state.shark = false;
      state.fisher = false;
      state.reporter = "가가";
      state.localUser = null;
      state.pickUser = "";
      state.gameturn = 0;
    },
  },
  extraReducers: {
    /*
    gamerInit
    */
    // 디스패치를 통해 액션이 실행됐을 때 - 로딩 중..
    [gamerInit.pending]: (state) => {
      console.log(
        "features/gamer/gamerSliece : 디스패치를 통해 액션이 실행됨 gamer init!"
      );
      state.loading = true;
      state.error = null;
    },
    // gamer init 성공
    [gamerInit.fulfilled]: (state, { payload }) => {
      console.log("features/gamer/gamerSliece : game init 성공!");
      state.job = payload.gameJob;
      state.roomId = payload.roomId;
      state.userName = payload.userName;
    },
    // gamer init 실패
    [gamerInit.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      console.error("features/gamer/gamerSliece : 게이머 init 실패 rejected!");
      console.log(state.payload);
    },

    /*
    get UserList
    */
    // 디스패치를 통해 액션이 실행됐을 때 - 로딩 중..
    [gamerUserList.pending]: (state) => {
      console.log("features/gamer/gamerSliece : Dispatch: get UserList!");
      state.loading = true;
      state.error = null;
    },
    //  get UserList 성공
    [gamerUserList.fulfilled]: (state, { payload }) => {
      const list = [];
      payload.forEach((user, i) => {
        if (user === state.userName) {
          list.push({
            userName: user.userName,
            isDead: user.dead,
            gameJob: user.gameJob,
            gameTeam: user.gameTeam,
            // subIdx: undefined,
            subIdx: undefined, //임시 테스트용
          });
        } else {
          list.push({
            userName: user.userName,
            isDead: user.dead,
            gameJob: user.gameJob,
            gameTeam: user.gameTeam,
            subIdx: undefined,
            // subIdx: i, //임시 테스트용
          });
        }
      });

      state.userList = list;
      console.log("features/gamer/gamerSliece : get UserList 성공!");
    },
    //  get UserList실패
    [gamerUserList.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      console.error(
        "features/gamer/gamerSliece :  get UserList 실패 rejected!"
      );
      console.log(state.payload);
    },

    /*
    gamer Dead
    */
    [gamerDead.pending]: (state) => {
      console.log(
        "features/gamer/gamerSliece : 디스패치를 통해 액션이 실행됨 gamer dead!"
      );
      state.loading = true;
      state.error = null;
    },
    [gamerDead.fulfilled]: (state, { payload }) => {
      console.log("features/gamer/gamerSliece : game dead 성공!");
      state.isDead = true;
    },
    [gamerDead.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      console.error(
        "features/gamer/gamerSliece : 게이머 dead 처리 실패 rejected!"
      );
    },
  },
});

export const {
  setGamerInit,
  setUserName,
  setRoom,
  setUserList,
  setGameStatus,
  hasntSkill,
  getMinigame,
  mafiaWinAtMinigame,
  mafiaLoseAtMinigame,
  updateUserList,
  setIsDead,
  setJob,
  setMessageList,
  setMessageListReset,
  updateUserListforDead,
  updateUserListforSub,
  setReporter,
  setShark,
  setFisher,
  resetShark,
  setLocalUser,
  setPickUser,
  setTurnCheck,
  resetGamer,
} = gamerSlice.actions;

export default gamerSlice.reducer;
