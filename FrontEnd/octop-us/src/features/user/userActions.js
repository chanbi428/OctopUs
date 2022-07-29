import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:8080";
export const userLogin = createAsyncThunk(
  "user/login",
  async ({ userName, userPW }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/Auth/login",
        { userName, userPW, userId: "dsafkldfy" },
        config
      );

      // 로컬 스토리지에 토큰 저장
      localStorage.setItem("userToken", data.userToken);
      console.log(data);

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
