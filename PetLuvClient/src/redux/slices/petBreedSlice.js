import { createSlice } from '@reduxjs/toolkit';
import { getAllBreed } from '../thunks/petBreedThunk';

const initialState = {
  petBreeds: [],
  petBreed: {},
  loading: false,
  error: null,
};

const petSlice = createSlice({
  name: 'pet-breeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getAllBreed.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBreed.fulfilled, (state, action) => {
        state.loading = false;
        state.petBreeds = action.payload;
      })
      .addCase(getAllBreed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default petSlice.reducer;
