import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import gamerReducer from "../features/gamer/gamerSlice";
import waitReducer from "../features/waiting/waitSlice"; 

const store = configureStore({
  reducer: {
    user: userReducer,
    gamer: gamerReducer,
    wait: waitReducer,
  },
});

export default store;
