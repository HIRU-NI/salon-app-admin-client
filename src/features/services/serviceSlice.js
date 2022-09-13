import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import serviceService from './serviceService'

const initialState = {
    services: [],
    isError: false,
    isSuccess: false,
    isLoading: false, 
    message: ''
}

//get all services
export const getAllServices = createAsyncThunk('getservices', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await serviceService.getAllServices(token)
    } catch (error) {
        const message = error.response.data ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const serviceSlice = createSlice({
    name: 'service',
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
            .addCase(getAllServices.pending, state => {
                state.isLoading = true
            })
            .addCase(getAllServices.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.services = action.payload
            })
            .addCase(getAllServices.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
    }
})

export const { reset } = serviceSlice.actions
export default serviceSlice.reducer