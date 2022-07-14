import { configureStore } from "@reduxjs/toolkit";
import { get } from "immer/dist/internal";
import alertReducer from "../features/alert.slice";
import { api } from "../features/api";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    [api.reducerPath]: api.reducer,
    
  },

  middleware: (getDefaultMiddleware) =>{
      return getDefaultMiddleware().concat(api.middleware)
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
