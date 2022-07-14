import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface iAuth {
  sessionId: string;
  requestToken: string;
  expiresAt: string;
}

const initialState = {
  sessionId: "",
  requestToken: "",
  expiresAt: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<iAuth>) {
        state.sessionId = action.payload.sessionId;
        state.requestToken = action.payload.requestToken;
        state.expiresAt= action.payload.expiresAt;
    },
  },
});

export const {setCredentials} = authSlice.actions
export default authSlice.reducer;
