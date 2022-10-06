import axios from "../axios.js";

const API_URL = "/user";

//get all admins
const getAllAdmins = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

//add new user
const addUser = async (token, userData) => {
  const response = await axios.post("/add-user", userData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// //update user
// const updateUser = async (token, id, user) => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
    
//     const response = await axios.put(API_URL + `/${id}`, user, config);
//     return response.data;
//   };

  //reset password
const reset = async (token, id, password) => {
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
   
    const response = await axios.post(API_URL + `/${id}`, {password}, config);
    return response.data;
  };
  

const adminService = {
  getAllAdmins,
  addUser,
  reset
};

export default adminService;
