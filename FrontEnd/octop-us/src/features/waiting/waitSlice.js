import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId : "",
  userList : [],
  roomChief: "",
  seats : [
    { nickname: "", opa: 0 },
    { nickname: "", opa: 0 },
    { nickname: "", opa: 0 },
    { nickname: "", opa: 0 },
    { nickname: "", opa: 0 },
    { nickname: "", opa: 0 },
    { nickname: "", opa: 0 },
    { nickname: "", opa: 0 },
  ],
  throne : [
    { crown: 0 },
    { crown: 0 },
    { crown: 0 },
    { crown: 0 },
    { crown: 0 },
    { crown: 0 },
    { crown: 0 },
    { crown: 0 },
  ],
};

const waitSlice = createSlice({
  name: "wait",
  initialState,
  reducers: {
  //   updateRoom(state, action) {
  //     const { roomId, userList } = action.payload
  //     // state.roomId = payload.roomId
  //     // state.userList = payload.userList
  //     state.roomId = action.payload.roomId;
  //     state.userList = action.payload.userList;
  //   },
    // updateOctopus(state, action) {
    //   const { seats, throne } = action.payload
    //   state.seats = action.payload.seats;
    //   state.throne = action.payload.throne;
    // }
    updateRoom : (state, { payload }) => {
      state.roomId = payload.roomId;
      state.userList = payload.userList;
    },
    updateOctopus : (state, {payload}) => {
      state.seats = payload.seats;
      state.throne = payload.throne;
    },
    updateRoomId : (state, {payload}) => {
      state.roomId = payload.roomId
      // console.log("state 바뀐거 확인용 아이디", payload.roomId,)
    },
    updateUserList : (state, {payload}) => {
      state.userList = payload
      // console.log("state 유저리스트 확인용", payload, state.userList)
    },
    updateRoomChief : (state, {payload}) => {
      state.roomChief = payload.roomChief
    }
  },
});

export const { updateRoom, updateOctopus, updateRoomId, updateUserList, updateRoomChief } = waitSlice.actions;

export default waitSlice.reducer;
