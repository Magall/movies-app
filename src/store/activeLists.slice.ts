import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MediaType} from "../Enums";

interface iSetActive {
  name: listNames,
  status: MediaType,
};

const initialState = {
  discover: MediaType.Movies,
  trending: MediaType.Movies,
}

enum listNames {
  discover = 'discover',
  trending = 'trending',
}

const activeListsSlice = createSlice({
  name: 'activeList',
  initialState,
  reducers: {
    setActiveList(state, action: PayloadAction<iSetActive>) {
      state[action.payload.name] = action.payload.status
    }
  }
});

export const {setActiveList} = activeListsSlice.actions;

export default activeListsSlice.reducer;