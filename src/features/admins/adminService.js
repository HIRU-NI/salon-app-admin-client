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

const adminService = {
    getAllAdmins
}

export default adminService