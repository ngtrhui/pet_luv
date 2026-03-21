import { createAsyncThunk } from '@reduxjs/toolkit';
import serviceCombosService from '../../services/serviceCombos.service';

export const getServiceCombos = createAsyncThunk(
  'serviceCombos/getServiceCombos',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await serviceCombosService.getAll(params);

      if (!response.flag) {
        return rejectWithValue(response.message);
      }

      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getServiceComboById = createAsyncThunk(
  'serviceCombos/getServiceComboById',
  async (serviceComboId, { rejectWithValue }) => {
    try {
      const response = await serviceCombosService.getById(serviceComboId);

      if (!response.flag) return rejectWithValue(response.message);

      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getServicesByCombo = createAsyncThunk(
  'serviceCombos/getServicesByCombo',
  async (serviceComboId, { rejectWithValue }) => {
    try {
      const response = await serviceCombosService.getServices(serviceComboId);

      if (!response.flag) return rejectWithValue(response.message);

      return response.data.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);
