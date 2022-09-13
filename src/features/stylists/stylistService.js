import axios from '../axios.js'

const API_URL = '/stylist'

//get all clients
const getAllStylists = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const stylistService = {
   getAllStylists
}

export default stylistService