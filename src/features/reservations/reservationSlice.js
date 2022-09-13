import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import reservationService from './reservationsService'

const initialState = {
    reservations: [],
    isError: false,
    isSuccess: false,
    isLoading: false, 
    message: ''
}

//create a reservation
export const createReservation = createAsyncThunk('createReservation', async (reservation, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reservationService.createReservation(reservation, token)
    } catch (error) {
        const message = error.response.data ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get all reservations
export const getAllReservations = createAsyncThunk('getreservations', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reservationService.getAllReservations(token)
    } catch (error) {
        const message = error.response.data ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// //delete client
// export const deleteClient = createAsyncThunk('deleteclient', async (id, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         return await reservationService.deleteClient(id, token)
//     } catch (error) {
//         const message = error.response.data ||
//         error.message ||
//         error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

export const reservationSlice = createSlice({
    name: 'reservation',
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
            .addCase(createReservation.pending, state => {
                state.isLoading = true
            })
            .addCase(createReservation.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.clients.push(action.payload)
            })
            .addCase(createReservation.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(getAllReservations.pending, state => {
                state.isLoading = true
            })
            .addCase(getAllReservations.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.reservations = action.payload
            })
            .addCase(getAllReservations.rejected, (state, action) => {
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

export const { reset } = reservationSlice.actions
export default reservationSlice.reducer

