import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:8080";

export const gamerInit = createAsyncThunk("gamer/init", async (userName, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/gamers/${userName}`);

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const gamerUserList = createAsyncThunk(
  "gamer/userList",
  async (roomId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/rooms/detail/roomid/${roomId}`);
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

export const gamerDead = createAsyncThunk("gamer/imDead", async (userName, { rejectWithValue }) => {
  try {
    const gamer = {
      gameJob: null,
      userName: userName,
      dead: true,
      gameTeam: null,
      idx: null,
      roomId: null,
      victory: null,
    };
    const { data } = axios.put(`${BASE_URL}/gamers/dead`, JSON.stringify(gamer), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
