import { createSlice } from '@reduxjs/toolkit';

import {
  getServiceComboById,
  getServiceCombos,
  getServicesByCombo,
} from '../thunks/serviceComboThunk';

const initialState = {
  serviceCombos: [],
  services: [],
  serviceCombo: {},
  selectedCombos: [],
  loading: false,
  error: null,
};

const serviceComboSlice = createSlice({
  name: 'serviceCombos',
  initialState,
  reducers: {
    setSelectedCombo: (state, action) => {
      const combo = action.payload;

      if (!state.selectedCombos.includes(combo)) {
        state.selectedCombos.push(combo);
      }
    },

    resetSelectedCombo: (state) => {
      state.selectedCombos = [];
    },
  },
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getServiceCombos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServiceCombos.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceCombos =
          Array.isArray(action.payload) && action.payload.length > 0
            ? action.payload.filter((c) => c.isVisible)
            : [];
      })
      .addCase(getServiceCombos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get By Id
    builder
      .addCase(getServiceComboById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServiceComboById.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceCombo = action.payload;
      })
      .addCase(getServiceComboById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Services
    builder
      .addCase(getServicesByCombo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServicesByCombo.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(getServicesByCombo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default serviceComboSlice.reducer;

export const { setSelectedCombo, resetSelectedCombo } =
  serviceComboSlice.actions;
