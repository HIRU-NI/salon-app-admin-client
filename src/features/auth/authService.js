import axios from '../axios.js'

const API_URL = '/'


//register user
const signup = async (userData) => {
    const response = await axios.post(API_URL + 'signup', userData, {headers:{
        "Content-Type": "application/json",
    }})
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const authService = {
    signup
}

export default authService