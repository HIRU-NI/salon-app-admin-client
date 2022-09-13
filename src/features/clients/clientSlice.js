import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import clientService from './clientService'

const initialState = {
    clients: [],
    isError: false,
    isSuccess: false,
    isLoading: false, 
    message: ''
}

//create a client
export const createClient = createAsyncThunk('createClient', async (client, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await clientService.createClient(client, token)
    } catch (error) {
        const message = error.response.data ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get all clients
export const getAllClients = createAsyncThunk('getclients', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await clientService.getAllClients(token)
    } catch (error) {
        const message = error.response.data ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//delete client
export const deleteClient = createAsyncThunk('deleteClient', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await clientService.deleteClient(id, token)
    } catch (error) {
        const message = error
        return thunkAPI.rejectWithValue(message)
    }
})

export const clientSlice = createSlice({
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
            .addCase(createClient.pending, state => {
                state.isLoading = true
            })
            .addCase(createClient.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.clients.push(action.payload)
            })
            .addCase(createClient.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(getAllClients.pending, state => {
                state.isLoading = true
            })
            .addCase(getAllClients.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.clients = action.payload
            })
            .addCase(getAllClients.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(deleteClient.pending, state => {
                state.isLoading = true
            })
            .addCase(deleteClient.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.clients = state.clients.filter(client => client._id !== action.payload.id)
            })
            .addCase(deleteClient.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
    }
})

export const { reset } = clientSlice.actions
export default clientSlice.reducer

