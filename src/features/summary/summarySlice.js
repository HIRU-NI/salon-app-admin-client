import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import summaryService from "./summaryService";

const initialState = {
  allocations: [],
  status: { completed: 0, scheduled: 0 },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//get status summary
export const getStatusSummary = createAsyncThunk(
  "getstatussummary",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await summaryService.getStatusSummary(token);
    } catch (error) {
      const message = error.response.data || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get allocations summary
export const getCurrentWeekAllocations = createAsyncThunk(
  "getallocations",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await summaryService.getCurrentWeekAllocations(token);
    } catch (error) {
      const message = error.response.data || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatusSummary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStatusSummary.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.status = action.payload;
      })
      .addCase(getStatusSummary.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getCurrentWeekAllocations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentWeekAllocations.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.allocations = action.payload;
      })
      .addCase(getCurrentWeekAllocations.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = summarySlice.actions;
export default summarySlice.reducer;
