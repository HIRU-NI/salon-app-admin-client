import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import adminService from './adminService'

const initialState = {
    admins: [],
    isError: false,
    isSuccess: false,
    isLoading: false, 
    message: ''
}

//get all admins
export const getAllAdmins = createAsyncThunk('getadmins', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await adminService.getAllAdmins(token)
    } catch (error) {
        const message = error.response.data ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const adminSlice = createSlice({
    name: 'client',
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
            // .addCase(createClient.pending, state => {
            //     state.isLoading = true
            // })
            // .addCase(createClient.fulfilled, (state, action) => {
            //     state.isSuccess = true
            //     state.isLoading = false
            //     state.clients.push(action.payload)
            // })
            // .addCase(createClient.rejected, (state, action) => {
            //     state.isError = true
            //     state.isLoading = false
            //     state.message = action.payload
            // })
            .addCase(getAllAdmins.pending, state => {
                state.isLoading = true
            })
            .addCase(getAllAdmins.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.admins = action.payload
            })
            .addCase(getAllAdmins.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            // .addCase(deleteClient.pending, state => {
            //     state.isLoading = true
            // })
            // .addCase(deleteClient.fulfilled, (state, action) => {
            //     state.isSuccess = true
            //     state.isLoading = false
            //     state.clients = state.clients.filter(client => client._id !== action.payload.id)
            // })
            // .addCase(deleteClient.rejected, (state, action) => {
            //     state.isError = true
            //     state.isLoading = false
            //     state.message = action.payload
            // })
    }
})

export const { reset } = adminSlice.actions
export default adminSlice.reducer
