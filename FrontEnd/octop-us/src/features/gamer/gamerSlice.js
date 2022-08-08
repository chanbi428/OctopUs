import { createSlice } from "@reduxjs/toolkit";
import { gamerInit } from "./gamerActions";
import { gamerUserList } from "./gamerActions";
import { gamerDead } from "./gamerActions";

const initialState = {
  gameStatus: 0, // 0 대기실 1 밤 2 낮...?
  loading: false,
  error: null,
  roomId: null,
  userName: null,
  job: null,
  hasSkill: true,
  isDead: false,
  idx: 0,
  minigameList: [true, true, true], // 미니게임1, 미니게임2, 미니게임3
  minigameResult: true, // true : Mafia , false : No Mafia
  userList: null,

  messageList: [],  // 채팅내용 저장
};

const gamerSlice = createSlice({
  name: "gamer",
  initialState,
  reducers: {
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
    // 기자 사용 능력 소멸
    hasntSkill: (state) => {
      state.hasSkill = false;
    },
    // 미니 게임 사용했을 때 => 해당 idx = false  리듀서
    useMinigame: (state, { payload }) => {
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
      state.userList.forEach((user) => {
        if (user.userName === payload.userName) {
          user.isDead = true;
          // user.sub = ?
        }
      });
    },
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
      state.messageList = [...state.messageList, payload.message];
    },
    setMessageListReset: (state) => {
      state.messageList = []
    }
  },
  extraReducers: {
    /*
    gamerInit
    */
    // 디스패치를 통해 액션이 실행됐을 때 - 로딩 중..
    [gamerInit.pending]: (state) => {
      console.log("features/gamer/gamerSliece : 디스패치를 통해 액션이 실행됨 gamer init!");
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
      let users = payload.userList.split(",");

      const list = [];
      users.forEach((user) => {
        list.push({
          userName: user,
          isDead: false,
          // sub: undefined,
        });
      });

      state.userList = list;
      console.log("features/gamer/gamerSliece : get UserList 성공!");
    },
    //  get UserList실패
    [gamerUserList.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      console.error("features/gamer/gamerSliece :  get UserList 실패 rejected!");
      console.log(state.payload);
    },

    /*
    gamer Dead
    */
    [gamerDead.pending]: (state) => {
      console.log("features/gamer/gamerSliece : 디스패치를 통해 액션이 실행됨 gamer dead!");
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
      console.error("features/gamer/gamerSliece : 게이머 dead 처리 실패 rejected!");
      console.log(state.payload);
    },
  },
});

export const {
  setUserName,
  setRoom,
  setUserList,
  hasntSkill,
  useMinigame,
  mafiaWinAtMinigame,
  mafiaLoseAtMinigame,
  updateUserList,
  setIsDead,
  setJob,
  setMessageList,
  setMessageListReset,
  setGameStatus
} = gamerSlice.actions;

export default gamerSlice.reducer;
