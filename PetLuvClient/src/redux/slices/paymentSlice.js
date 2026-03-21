import { createSlice } from '@reduxjs/toolkit';
import { getPaymentHistories, IpnAction } from '../thunks/paymentThunk';

const initialState = {
  payment: {},
  payments: [],
  selectedPaymentId: null,
  IpnResult: null,
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Payment History
    builder
      .addCase(getPaymentHistories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPaymentHistories.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(getPaymentHistories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // IpnAction
    builder
      .addCase(IpnAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(IpnAction.fulfilled, (state, action) => {
        state.loading = false;
        state.IpnResult = action.payload;
      })
      .addCase(IpnAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
