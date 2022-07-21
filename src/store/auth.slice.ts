import {
  ActionCreatorWithPayload,
  createAction,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface iAuth {
  sessionId: string;
  requestToken: string;
  requestTokenExpiresAt: string;
}

const initialState = {
  sessionId: "INVALID",
  requestToken: "INVALID",
  requestTokenExpiresAt: "INVALID",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<iAuth>) => {
        state.sessionId = action.payload.sessionId;
        state.requestToken = action.payload.requestToken;
        state.requestTokenExpiresAt = action.payload.requestTokenExpiresAt;
      },
    },
  },
);

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
