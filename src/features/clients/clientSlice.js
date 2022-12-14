import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

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
export const deleteClient = createAsyncThunk('deleteclient', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await clientService.deleteClient(id, token)
    } catch (error) {
        const message = error.response.data ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update client
export const updateClient = createAsyncThunk('updateclient', async (clientData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await clientService.updateClient(clientData.id, clientData.client, token)
    } catch (error) {
        const message = error.response.data ||
        error.message ||
        error.toString()
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
                toast.success("New client added successfully")
            })
            .addCase(createClient.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload.error
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
                state.message = action.payload.error
            })
            .addCase(deleteClient.pending, state => {
                state.isLoading = true
            })
            .addCase(deleteClient.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.clients = state.clients.filter(client => client._id !== action.payload._id)
                toast.success("Client deleted successfully")
            })
            .addCase(deleteClient.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(updateClient.pending, state => {
                state.isLoading = true
            })
            .addCase(updateClient.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.clients = state.clients.map(client => {
                    return client._id === action.payload._id ? {...client, 
                        email:action.payload.email, 
                        firstName:action.payload.firstName,
                        lastName:action.payload.lastName,
                        phone:action.payload.phone} : client
                })
                toast.success("Client details updated successfully")
            })
            .addCase(updateClient.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload.error
            })
    }
})

export const { reset } = clientSlice.actions
export default clientSlice.reducer

