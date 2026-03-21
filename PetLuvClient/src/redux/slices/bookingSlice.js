import { createSlice } from '@reduxjs/toolkit';
import { createBooking, getBookingHistory } from '../thunks/bookingThunk';

const initialState = {
  bookings: [],
  booking: {},
  bookingStartTime: null,
  bookingEndTime: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookingStartTime: (state, action) => {
      state.bookingStartTime = action.payload;
    },
    setBookingEndTime: (state, action) => {
      state.bookingEndTime = action.payload;
    },
    resetBookingTime: (state) => {
      state.bookingStartTime = null;
      state.bookingEndTime = null;
    },
  },
  extraReducers: (builder) => {
    // Create
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create
    builder
      .addCase(getBookingHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getBookingHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;

export const { setBookingStartTime, setBookingEndTime, resetBookingTime } =
  bookingSlice.actions;
