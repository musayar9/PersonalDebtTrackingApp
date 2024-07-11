import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Persistor } from "redux-persist";
import { Action, ThunkAction } from "@reduxjs/toolkit";

// Root reducer'ı combineReducers ile oluşturun
const rootReducer = combineReducers({ user: userReducer });

// Persist yapılandırmasını oluşturun
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Persist edilmiş reducer'ı oluşturun
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store'u configureStore ile oluşturun
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Persistor'u oluşturun
export const persistor: Persistor = persistStore(store);

// RootState ve AppDispatch tiplerini çıkarın
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Thunk tipi için AppThunk tipini oluşturun
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
