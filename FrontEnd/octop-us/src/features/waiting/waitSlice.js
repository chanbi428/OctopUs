import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId : "",
  userList : [],
  roomChief: "",
  personNum : 0,
  isPrivate : false,
  roomPw : "",
  gameTime : "",
};

const waitSlice = createSlice({
  name: "wait",
  initialState,
  reducers: {
    updateRoomId : (state, {payload}) => {
      state.roomId = payload.roomId
    },
    updateUserList : (state, {payload}) => {
      state.userList = payload
    },
    updateRoomChief : (state, {payload}) => {
      state.roomChief = payload.roomChief
    },
    updatePersonNum : (state, {payload}) => {
      state.personNum = payload.personNum
    },
    updateIsPrivate : (state, {payload}) => {
      state.isPrivate = payload.isPrivate
    },
    updateRoomPw : (state, {payload}) => {
      state.roomPw = payload.roomPw
    },
    updateGameTime : (state, {payload}) => {
      state.gameTime = payload.gameTime
    }
  },
});

export const { 
  updateRoomId, 
  updateUserList, 
  updateRoomChief,
  updatePersonNum,
  updateIsPrivate,
  updateRoomPw,
  updateGameTime
 } = waitSlice.actions;

export default waitSlice.reducer;
