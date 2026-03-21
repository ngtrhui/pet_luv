import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';

import serviceReducer from './slices/serviceSlice.js';
import serviceComboSlice from './slices/serviceComboSlice.js';
import roomReducer from './slices/roomSlice.js';
import authReducer from './slices/authSlice.js';
import userReducer from './slices/userSlice.js';
import petReducer from './slices/petSlice.js';
import bookingReducer from './slices/bookingSlice.js';
import bookingTypeReducer from './slices/bookingTypeSlice.js';
import petBreedReducer from './slices/petBreedSlice.js';
import paymentReducer from './slices/paymentSlice.js';

const authUserFilter = createFilter('auth', ['user']);
const serviceFilter = createFilter('services', [
  'service',
  'services',
  'selectedServices',
]);
const petFilter = createFilter('pets', [
  'pets',
  'pet',
  'selectedPetId',
  'healthBookDetails',
]);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'services', 'pets', 'bookingTypes'],
  transforms: [authUserFilter, serviceFilter, petFilter],
  blacklist: ['error'],
  denylist: ['error'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  services: serviceReducer,
  serviceCombos: serviceComboSlice,
  rooms: roomReducer,
  pets: petReducer,
  petBreeds: petBreedReducer,
  bookings: bookingReducer,
  bookingTypes: bookingTypeReducer,
  payments: paymentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persister = persistStore(store);
export default store;
