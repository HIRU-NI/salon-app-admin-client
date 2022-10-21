import axios from '../axios.js'

const API_URL = '/summary'

//get status percentages
const getStatusSummary = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/status`, config)
    return response.data
}

//get allocations summary
const getCurrentWeekAllocations = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/allocations`, config)
    return response.data
}



const stylistService = {
    getStatusSummary,
    getCurrentWeekAllocations
}

export default stylistService