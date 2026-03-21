import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);

      if (!response.flag) {
        return rejectWithValue(response.message);
      }

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (registerInfo, { rejectWithValue }) => {
    try {
      const response = await authService.register(registerInfo);

      if (!response.flag) {
        return rejectWithValue(response.message);
      }

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.resetPassword(credentials);

      if (!response.flag) {
        return rejectWithValue(response.message);
      }

      return response.data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);
