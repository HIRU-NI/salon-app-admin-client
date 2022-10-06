import axios from "../axios.js";

const API_URL = "/";

//register user
const signup = async (userData) => {
  console.log("here");
  const response = await axios.post(API_URL + "signup", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

//login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//logout user
const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  localStorage.removeItem("user");
  return response.data;
};

//update user
const updateUser = async (token, id, user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + `user/${id}`, user, config);

  

  if (response.data) {
    let userLocal = JSON.parse(localStorage.getItem("user"));

    localStorage.setItem(
      "user",
      JSON.stringify({user : {
        ...userLocal.user,
        email: response.data.user.email,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
      }})
    );
  }
  return response.data;
};

const authService = {
  signup,
  login,
  logout,
  updateUser,
};

export default authService;
