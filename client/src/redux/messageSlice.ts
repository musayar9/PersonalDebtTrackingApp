import { createSlice } from "@reduxjs/toolkit";
import { MessageGroup, MessageState } from "../lib/types";

const initialState: MessageState = {
  recieverMessage: null,
  inComingMessage: [],
  messageCount: 0,
  messageGroup: [],
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
      state.messageGroup = state.inComingMessage.reduce<MessageGroup[]>((acc, person) => {
        const key:string = person.senderName;
        const group = acc.find((group) => group[key]);
        if (group) {
          group[key].push(person);
        } else {
          acc.push({ [key]: [person] });
        }

        return acc;
      }, []);
    },

    setDeleteInComingMessage: (state, action) => {
      state.inComingMessage = action.payload;
      state.messageGroup= action.payload
    },
  },
});

export const {
  addMessage,
  deleteMessage,
  setInComingMessage,
  setDeleteInComingMessage,
} = messageSlice.actions;
export default messageSlice.reducer;
