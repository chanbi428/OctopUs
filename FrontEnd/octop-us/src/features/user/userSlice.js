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
    // 로그인 리듀서
    login: (state, { payload }) => {
      state.userInfo = {
        userName: payload.getUserName,
        token: payload.getUserToken,
      };
    },
    // 로그아웃 리듀서
    logout: (state) => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");
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
      console.log(
        "features/user/userSliece : 디스패치를 통해 액션이 실행됨 login pending!"
      );
      state.loading = true;
      state.error = null;
    },
    // 유저 로그인이 성공했을 때
    [userLogin.fulfilled]: (state, { payload }) => {
      console.log(
        "features/user/userSliece : 유저 로그인 성공 login fulfilled!"
      );
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
    },
    // 유저 로그인이 실패했을 때
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      console.log(
        "features/user/userSliece : 유저 로그인 실패 login rejected!"
      );
      alert("닉네임과 비밀번호를 확인해주세요.");
      console.log(state.payload);
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
