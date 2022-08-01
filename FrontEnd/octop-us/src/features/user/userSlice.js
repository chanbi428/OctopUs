import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./userActions";

// 로컬 스토리지 유저토큰
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  // extrareducer : 액션이 실행되고 나서 그거에 대한 결과로 추가적인 액션을 실행하고 싶을 때
  extraReducers: {
    // 디스패치를 통해 액션이 실행됐을 때 - 로딩 중..
    [userLogin.pending]: (state) => {
      console.log("login pending!");
      state.loading = true;
      state.error = null;
    },
    // 유저 로그인이 성공했을 때
    [userLogin.fulfilled]: (state, { payload }) => {
      console.log("login fulfilled!");
      state.loading = false;
      state.userInfo = payload;

      state.userToken = payload.userToken;
    },
    // 유저 로그인이 실패했을 때
    [userLogin.rejected]: (state, { payload }) => {
      console.log("login rejected!");
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
