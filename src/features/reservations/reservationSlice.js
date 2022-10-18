import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import reservationService from "./reservationsService";

const initialState = {
  currentPageReservations: [],
  count: 0,
  reservations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//create a reservation
export const createReservation = createAsyncThunk(
  "createReservation",
  async (reservation, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reservationService.createReservation(reservation, token);
    } catch (error) {
      const message = error.response.data || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get all reservations
export const getAllReservations = createAsyncThunk(
  "getreservations",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reservationService.getAllReservations(token);
    } catch (error) {
      const message = error.response.data || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get all reservations for given page
export const getPage = createAsyncThunk(
  "getpagereservations",
  async (page, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reservationService.getPage(token, page);
    } catch (error) {
      const message = error.response.data || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//delete reservation
export const deleteReservation = createAsyncThunk(
  "deletereservation",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reservationService.deleteReservation(id, token);
    } catch (error) {
      const message = error.response.data || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//update a reservation
export const updateReservation = createAsyncThunk(
  "updatereservation",
  async (reservationData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await reservationService.updateReservation(
        reservationData.id,
        reservationData.reservation,
        token
      );
    } catch (error) {
      const message = error.response.data || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    resetPage: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.reservations.push(action.payload);
        state.count++;
        toast.success("Reservation added successfully");
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getAllReservations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllReservations.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.reservations = action.payload;
      })
      .addCase(getAllReservations.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getPage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPage.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.currentPageReservations = action.payload.reservations;
        state.count = action.payload.count;
      })
      .addCase(getPage.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteReservation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.reservations = state.reservations.filter(
          (reservation) => reservation._id !== action.payload._id
        );
        toast.success("Reservation deleted successfully");
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateReservation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.reservations = state.reservations.map((reservation) => {
          return reservation._id === action.payload._id
            ? {
                ...reservation,
                client: action.payload.client,
                service: action.payload.service,
                stylist: action.payload.stylist,
                date: action.payload.date,
                isComplete: action.payload.isComplete,
              }
            : reservation;
        });
        toast.success("Reservation details updated successfully");
      })
      .addCase(updateReservation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload.error;
      });
  },
});

export const { reset, resetPage } = reservationSlice.actions;
export default reservationSlice.reducer;
