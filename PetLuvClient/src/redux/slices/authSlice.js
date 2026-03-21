import { createSlice } from '@reduxjs/toolkit';
import { login, register, resetPassword } from '../thunks/authThunk';
import { updateUserInfo } from '../thunks/userThunk';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem('token', action.payload.token);
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Change password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        console.log('alo ', action.payload);
        state.error = action.payload;
      });

    // Additionally
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      if (action.payload !== null) state.user = action.payload;
    });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;
