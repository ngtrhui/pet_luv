import { createAsyncThunk } from '@reduxjs/toolkit';
import servicesService from '../../services/services.service';

export const getServices = createAsyncThunk(
  'services/getServices',
  async (params, { rejectWithValue }) => {
    try {
      const response = await servicesService.getServices(params);

      if (!response?.flag) {
        return rejectWithValue(response?.message);
      }

      return response?.data?.data || response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getServiceById = createAsyncThunk(
  'services/getById',
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await servicesService.getServiceById(serviceId);

      if (!response?.flag) {
        return rejectWithValue(response?.message);
      }

      return response?.data?.data || response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getVariants = createAsyncThunk(
  'services/getVariants',
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await servicesService.getVariants(serviceId);

      if (!response?.flag) {
        return rejectWithValue(response?.message);
      }

      return response?.data?.data || response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
