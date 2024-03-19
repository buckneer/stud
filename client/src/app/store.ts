// import { useDispatch } from "react-redux";
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { apiSlice } from './api/apiSlice';

import sessionReducer from './slices/sessionSlice';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage: storage,
  }
  
  const rootReducer = combineReducers({
    session: persistReducer(persistConfig, sessionReducer),
    [apiSlice.reducerPath]: apiSlice.reducer
  });
  
  export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleWare => 
      getDefaultMiddleWare({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(apiSlice.middleware),
  });
  
  export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;