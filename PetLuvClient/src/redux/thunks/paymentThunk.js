import { createAsyncThunk } from '@reduxjs/toolkit';
import paymentService from '../../services/payment.service';

export const getPaymentHistories = createAsyncThunk(
  'payments/getPaymentHistories',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await paymentService.getPaymentHistories(userId);

      if (!response.flag) {
        return rejectWithValue(response.message);
      }

      return response?.data?.data || response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.message || error);
    }
  }
);

export const IpnAction = createAsyncThunk(
  'payments/IpnAction',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await paymentService.IpnAction(userId);

      if (!response?.flag) {
        return rejectWithValue(response?.message);
      }

      return response?.data?.data || response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.message || error);
    }
  }
);
