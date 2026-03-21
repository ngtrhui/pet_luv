import { createSlice } from '@reduxjs/toolkit';
import {
  addPetToCollection,
  createHealthBookDetail,
  deletePetImages,
  getHealthBookDetail,
  getPetByUser,
  getPetInfo,
  updateHealthBookDetail,
  updatePetFamily,
  updatePetImages,
  updatePetInfo,
} from '../thunks/petThunk';

const initialState = {
  pet: {},
  pets: [],
  selectedPetId: null,
  healthBookDetails: [],
  loading: false,
  error: null,
};

const petSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    setSelectedPet: (state, action) => {
      state.selectedPetId = action.payload;
    },
    resetSelectedPet: (state) => {
      state.selectedPetId = null;
    },
  },
  extraReducers: (builder) => {
    // Get Collection
    builder
      .addCase(getPetByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPetByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = action.payload;
      })
      .addCase(getPetByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add Pet To Collection
    builder
      .addCase(addPetToCollection.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPetToCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.pets.push(action.payload);
      })
      .addCase(addPetToCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Pet Info
    builder
      .addCase(getPetInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPetInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.pet = action.payload;
      })
      .addCase(getPetInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Pet Info
    builder
      .addCase(updatePetInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePetInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.pet = action.payload;
      })
      .addCase(updatePetInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Pet Image
    builder
      .addCase(updatePetImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePetImages.fulfilled, (state, action) => {
        state.loading = false;
        state.pet = action.payload;
      })
      .addCase(updatePetImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Pet Family
    builder
      .addCase(updatePetFamily.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePetFamily.fulfilled, (state, action) => {
        state.loading = false;
        state.pet = action.payload;
      })
      .addCase(updatePetFamily.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Pet Image
    builder
      .addCase(deletePetImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePetImages.fulfilled, (state, action) => {
        state.loading = false;
        state.pet = action.payload;
      })
      .addCase(deletePetImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Health Book Detail
    builder
      .addCase(getHealthBookDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHealthBookDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.healthBookDetails = action.payload;
      })
      .addCase(getHealthBookDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add New Health Book Detail
    builder
      .addCase(createHealthBookDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(createHealthBookDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.healthBookDetails.push(action.payload);
      })
      .addCase(createHealthBookDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update New Health Book Detail
    builder
      .addCase(updateHealthBookDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateHealthBookDetail.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.healthBookDetails.findIndex(
          (hb) => hb.healthBookDetailId === action.payload.healthBookDetailId
        );

        if (index !== -1) {
          state.healthBookDetails[index] = action.payload;
        }
      })
      .addCase(updateHealthBookDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default petSlice.reducer;

export const { setSelectedPet, resetSelectedPet } = petSlice.actions;
