import { createSlice } from "@reduxjs/toolkit";
import { MessageState } from "../lib/types";

const initialState: MessageState = {
  recieverMessage: null,
  inComingMessage: [],
  messageCount: 0,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.recieverMessage = action.payload;
    },

    deleteMessage: (state, action) => {
      state.recieverMessage = action.payload;
    },

    setInComingMessage: (state, action) => {
      state.inComingMessage = action.payload;
    },
    
    setDeleteInComingMessage: (state,action)=>{
      state.inComingMessage = action.payload
    }
  },
});

export const { addMessage, deleteMessage, setInComingMessage, setDeleteInComingMessage } = messageSlice.actions;
export default messageSlice.reducer;
