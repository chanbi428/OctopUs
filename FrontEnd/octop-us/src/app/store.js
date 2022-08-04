import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import gamerReducer from "../features/gamer/gamerSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    gamer: gamerReducer,
  },
});

export default store;
