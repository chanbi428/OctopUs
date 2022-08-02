import axios from "axios";

export const persistLogin = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  };

  const { data } = await axios.get(
    "http://localhost:8080/Auth/loginWithToken",
    config
  );

  return data;
};

export default persistLogin;
