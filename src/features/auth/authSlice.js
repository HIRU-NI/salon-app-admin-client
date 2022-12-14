import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import authService from './authService'

//get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user.user : null,
    isError: false,
    isSuccess: false,
    isLoading: false, 
    message: '',
    token: null
}

//register user
export const signup = createAsyncThunk('signup', async (user, thunkAPI) => {
    try {
        console.log(user)
        return await authService.signup(user)
        
    } catch (error) {
        const message = error.response.data ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//login user
export const login = createAsyncThunk('login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = error.response.data ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//logout user
export const logout = createAsyncThunk('logout', async (thunkAPI) => {
    try {
        return await authService.logout()
    } catch (error) {
        const message = error
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload.user
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload.user
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.error
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer

