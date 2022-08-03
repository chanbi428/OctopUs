import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import getAPI from "../../api/user";

const BASE_URL = "http://localhost:8080";
export const userLogin = createAsyncThunk(
  "user/login",
  async ({ userName, userPW }, { rejectWithValue }) => {
    try {
      // const { data } = await getAPI("/Auth/login", { userName, userPW });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/Auth/login",
        { userName, userPW },
        config
      );
      console.log(data);

      // 세션 스토리지에 토큰 저장
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

// export const userNameCheck = createAsyncThunk(
//   "user/namecheck",
//   async ({ userName }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const { data } = await axios.post(
//         `${BASE_URL}/user/existName`,
//         { userName },
//         config
//       );
//       console.log(data);
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );
