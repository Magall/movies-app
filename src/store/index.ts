import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import alertReducer from "./alert.slice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth:authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
