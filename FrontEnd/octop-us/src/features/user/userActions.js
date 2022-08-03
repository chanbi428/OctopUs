import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ userId, userPW }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/Auth/login",
        { userId, userPW },
        config
      );
      console.log(data);

      // 로컬 스토리지에 토큰 저장
      // localStorage.setItem("userToken", data.token);
      // localStorage.setItem("userName", data.userName);
      sessionStorage.setItem("userToken", data.token);
      sessionStorage.setItem("userName", data.userName);

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
