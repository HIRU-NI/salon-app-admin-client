import axios from '../axios.js'

const API_URL = '/user'

//get all admins
const getAllAdmins = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

//add new user
const addUser = async (userData) => {
    const response = await axios.post('/add-user', userData, {headers:{
        "Content-Type": "application/json",
    }})
    // if(response.data) {
    //     localStorage.setItem('user', JSON.stringify(response.data.user))
    // }

    return response.data
}

const adminService = {
    getAllAdmins,
    addUser
}

export default adminService