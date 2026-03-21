import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/user.service';

export const getUserInfo = createAsyncThunk(
  'users/getUserInfo',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userService.getUserById(userId);

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

export const updateUserInfo = createAsyncThunk(
  'users/updateUserInfo',
  async (params, { rejectWithValue }) => {
    try {
      const { userId, payload } = params;

      const response = await userService.updateInfo(userId, payload);

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
