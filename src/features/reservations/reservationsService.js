import axios from '../axios.js'

const API_URL = '/reservation'


//create reservation
const createReservation = async (reservationData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL , reservationData, config)

    return response.data
}

//get all reservations
const getAllReservations = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

//delete client
const deleteReservation = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL +  `/${id}`, config)
    
    return response.data
}

const clientService = {
    createReservation,
    getAllReservations,
    deleteReservation
}

export default clientService