import { createSlice } from '@reduxjs/toolkit';
import {
  getServiceById,
  getServices,
  getVariants,
} from '../thunks/serviceThunk';

const initialState = {
  services: [],
  service: {},
  selectedServices: [],
  selectedBreedId: null,
  selectedPetWeightRange: null,
  loading: false,
  error: null,
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setSelectedService: (state, action) => {
      const service = action.payload;

      if (!state.selectedServices.includes(service)) {
        state.selectedServices.push(service);
      }
    },

    resetSelectedService: (state) => {
      state.selectedServices = [];
    },

    setSelectedVariant: (state, action) => {
      const { breedId, petWeightRange } = action.payload;

      state.selectedBreedId = breedId;
      state.selectedPetWeightRange = petWeightRange;
    },
    resetSelectedVariant: (state) => {
      state.selectedBreedId = null;
      state.selectedPetWeightRange = null;
    },
  },
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.loading = false;
        console.log('error ben slice ', action.payload);
        state.error = action.payload;
      });

    // Get By Id
    builder
      .addCase(getServiceById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
      })
      .addCase(getServiceById.rejected, (state, action) => {
        state.loading = false;
        console.log('error ben slice ', action);
        state.error = action.payload;
      });

    // Get Variants
    builder
      .addCase(getVariants.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVariants.fulfilled, (state, action) => {
        state.loading = false;
        state.variants = action.payload;
      })
      .addCase(getVariants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default servicesSlice.reducer;

export const {
  setSelectedService,
  resetSelectedService,
  setSelectedVariant,
  resetSelectedVariant,
} = servicesSlice.actions;
