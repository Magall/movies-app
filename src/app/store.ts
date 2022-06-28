import { configureStore } from "@reduxjs/toolkit";
import { get } from "immer/dist/internal";
import alertReducer from "../features/alert.slice";
import { apiSlice } from "../features/api.slice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>{
      return getDefaultMiddleware().concat(apiSlice.middleware)
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
