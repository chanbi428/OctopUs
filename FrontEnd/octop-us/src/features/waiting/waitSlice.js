import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId : "",
  userList : [],
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
    room : (state, { payload }) => {
      state.roomId = payload.roomId;
      state.userList = payload.userList;
    },
    octopus : (state, {payload}) => {
      state.seats = payload.seats;
      state.throne = payload.throne;
    }
  },
});

export const { room, octopus } = waitSlice.actions;

export default waitSlice.reducer;
