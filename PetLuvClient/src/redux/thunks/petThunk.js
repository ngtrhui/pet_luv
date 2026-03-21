import { createAsyncThunk } from '@reduxjs/toolkit';
import petService from '../../services/pet.service';

export const getPetByUser = createAsyncThunk(
  'pets/getPetByUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await petService.getPetCollection(userId);

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

export const getPetInfo = createAsyncThunk(
  'pets/getPetInfo',
  async (petId, { rejectWithValue }) => {
    try {
      const response = await petService.getById(petId);

      if (!response?.flag) return rejectWithValue(response?.message);

      return response?.data?.data || response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const addPetToCollection = createAsyncThunk(
  'pets/addPetToCollection',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await petService.createAsync(payload);

      if (!response?.flag) return rejectWithValue(response?.message);

      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const updatePetInfo = createAsyncThunk(
  'pets/updatePetInfo',
  async (params, { rejectWithValue }) => {
    const { petId, payload } = params;

    try {
      const response = await petService.update(petId, payload);

      if (!response.flag) return rejectWithValue(response.message);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const updatePetImages = createAsyncThunk(
  'pets/updatePetImages',
  async (params, { rejectWithValue }) => {
    const { petId, payload } = params;

    try {
      const response = await petService.updateImages(petId, payload);

      if (!response.flag) return rejectWithValue(response.message);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const updatePetFamily = createAsyncThunk(
  'pets/updatePetFamily',
  async (params, { rejectWithValue }) => {
    const { petId, payload } = params;

    try {
      const response = await petService.updateFamily(petId, payload);

      if (!response.flag) return rejectWithValue(response.message);

      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const deletePetImages = createAsyncThunk(
  'pets/deletePetImages',
  async (params, { rejectWithValue }) => {
    const { petId, imagePath } = params;

    try {
      const response = await petService.deleteImage(petId, imagePath);

      if (!response.flag) return rejectWithValue(response.message);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getHealthBookDetail = createAsyncThunk(
  'pets/getHealthBookDetail',
  async (petId, { rejectWithValue }) => {
    try {
      const response = await petService.getHealthBookDetail(petId);

      if (!response?.flag) return rejectWithValue(response?.message);

      return response?.data?.data || response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const createHealthBookDetail = createAsyncThunk(
  'pets/createHealthBookDetail',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await petService.createHealthBookDetail(payload);

      if (!response?.flag) return rejectWithValue(response?.message);

      return response?.data?.data || response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const updateHealthBookDetail = createAsyncThunk(
  'pets/updateHealthBookDetail',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await petService.updateHealthBookDetail(payload);

      if (!response?.flag) return rejectWithValue(response?.message);

      return response?.data?.data || response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
