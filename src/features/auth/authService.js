import axios from '../axios.js'

const API_URL = '/'


//register user
const signup = async (userData) => {
    console.log("here")
    const response = await axios.post(API_URL + 'signup', userData, {headers:{
        "Content-Type": "application/json",
    }})
   
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
    }

    return response.data
}

//login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData, {headers:{
        "Content-Type": "application/json",
    }})
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//logout user
const logout = async () => {
    const response = await axios.get(API_URL + 'logout', )
    localStorage.removeItem('user')
    return response.data
}

const authService = {
    signup,
    login,
    logout
}

export default authService