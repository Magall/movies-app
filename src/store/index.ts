import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import alertReducer from "./alert.slice";
import activeListsReducer from "./activeLists.slice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth:authReducer,
    activeList:activeListsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
