import { createSlice } from '@reduxjs/toolkit';
import { getRoomById, getRooms, getRoomsByBreeds } from '../thunks/roomThunk';

const initialState = {
  rooms: [],
  room: {},
  selectedRooms: [],
  availableRooms: [],
  roomRentalTime: null,
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setSelectedRoom: (state, action) => {
      const room = action.payload;

      if (!state.selectedRooms?.includes(room)) {
        state.selectedRooms.push(room);
      }
    },

    resetSelectedRoom: (state) => {
      state.selectedRooms = [];
    },

    setRoomRentalTime: (state, action) => {
      state.roomRentalTime = action.payload;
    },

    resetRoomRentalTime: (state) => {
      state.roomRentalTime = null;
    },
  },
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms =
          Array.isArray(action.payload) && action.payload.length > 0
            ? action.payload.filter((room) => room.isVisible)
            : [];
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get By Id
    builder
      .addCase(getRoomById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoomById.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload;
      })
      .addCase(getRoomById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get By Breeds
    builder
      .addCase(getRoomsByBreeds.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoomsByBreeds.fulfilled, (state, action) => {
        state.loading = false;
        state.availableRooms = action.payload;
      })
      .addCase(getRoomsByBreeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default roomSlice.reducer;

export const {
  setSelectedRoom,
  resetSelectedRoom,
  setRoomRentalTime,
  resetRoomRentalTime,
} = roomSlice.actions;
