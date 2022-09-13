import axios from '../axios.js'

const API_URL = '/service'

//get all clients
const getAllServices = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const serviceService = {
   getAllServices
}

export default serviceService