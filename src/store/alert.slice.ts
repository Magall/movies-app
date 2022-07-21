import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertType } from "../Enums";
import { iAlertStatus } from "../interfaces";


const initialState: iAlertStatus = {
  show: false,
  type: AlertType.Success,
  messages: [''],
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert (state, action :PayloadAction<iAlertStatus>){
        state.show = action.payload.show;
        state.type = action.payload.type;
        state.messages = action.payload.messages;
    },

    hideAlert (state){
        state.show = false;
    }
  },
});

export const { showAlert, hideAlert } =
alertSlice.actions;
export default alertSlice.reducer;
