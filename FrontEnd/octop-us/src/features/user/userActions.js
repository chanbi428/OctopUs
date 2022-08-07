import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, config } from "../../api/BASE_URL";

// BASE_URL, config 받아오는 것으로 수정
export const userLogin = createAsyncThunk(
  "user/login",
  async ({ userName, userPW }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/Auth/login`,
        { userName, userPW },
        config
      );
      console.log(data);

      // 로컬 스토리지에 토큰 저장
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userName", data.userName);

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

export const userRegister = createAsyncThunk(
  "user/register",
  async ({ userName, userPW }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/user/signUp`,
        { userName, userPW },
        config
      );
      console.log("회원가입:", data);
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
