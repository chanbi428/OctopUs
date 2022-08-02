import axios from "axios";

export const persistLogin = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  };

  const getUserToken = localStorage.getItem("userToken");
  const { data } = await axios.post(
    // "/Auth/loginWithToken",
    "http://localhost:8080/Auth/loginWithToken",
    {
      idx: null,
      userName: null,
      userId: null,
      userPW: null,
      token: getUserToken,
    },
    config
  );
  console.log("이것은", data);

  return data;
};

export default persistLogin;
