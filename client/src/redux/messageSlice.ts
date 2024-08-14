import { createSlice } from "@reduxjs/toolkit";
import { MessageState } from "../lib/types";

const initialState: MessageState = {
  recieverMessage: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action) => {

      state.recieverMessage = action.payload;
    },
  },
});

export const {addMessage} = messageSlice.actions;
export default messageSlice.reducer;
