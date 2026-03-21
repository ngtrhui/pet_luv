import { createAsyncThunk } from '@reduxjs/toolkit';
import petBreedService from '../../services/petBreed.service';

export const getAllBreed = createAsyncThunk(
  'pet-breeds/getAllBreed',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await petBreedService.getAllASync(params);

      if (!response.flag) {
        return rejectWithValue(response.message);
      }

      return response?.data?.data || response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
