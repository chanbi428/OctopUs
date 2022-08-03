import axios from "axios";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
