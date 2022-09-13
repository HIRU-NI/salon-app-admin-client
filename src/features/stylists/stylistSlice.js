import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import stylistService from './stylistService'

const initialState = {
    stylists: [],
    isError: false,
    isSuccess: false,
    isLoading: false, 
    message: ''
}

//get all stylists
export const getAllStylists = createAsyncThunk('getstylists', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await stylistService.getAllStylists(token)
    } catch (error) {
        const message = error.response.data ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const stylistSlice = createSlice({
    name: 'stylist',
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
            .addCase(getAllStylists.pending, state => {
                state.isLoading = true
            })
            .addCase(getAllStylists.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.stylists = action.payload
            })
            .addCase(getAllStylists.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
    }
})

export const { reset } = stylistSlice.actions
export default stylistSlice.reducer