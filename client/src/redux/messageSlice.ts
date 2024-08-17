import { createSlice } from "@reduxjs/toolkit";
import { MessageGroup, MessageState } from "../lib/types";

const initialState: MessageState = {
  recieverMessage: null,
  inComingMessage: [],
  messageCount: 0,
  messageGroup: [],
  allChats: [],
  currentChatData: null,
  chatloading: false,
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
      state.messageGroup = state.inComingMessage.reduce<MessageGroup[]>(
        (acc, person) => {
          const key: string = person.senderName;
          const group = acc.find((group) => group[key]);
          if (group) {
            group[key].push(person);
          } else {
            acc.push({ [key]: [person] });
          }

          return acc;
        },
        []
      );
    },

    setDeleteInComingMessage: (state, action) => {
      state.inComingMessage = action.payload;
      state.messageGroup = action.payload;
    },

    setAllChats: (state, action) => {
      state.allChats = action.payload;
    },

    setCurrentChatData: (state, action) => {
      state.currentChatData = action.payload;
      state.chatloading = true;

      setTimeout(() => {
        state.chatloading = false;
      }, 1000);
    },
  },
});

export const {
  addMessage,
  deleteMessage,
  setInComingMessage,
  setDeleteInComingMessage,
  setAllChats,
  setCurrentChatData,
} = messageSlice.actions;
export default messageSlice.reducer;
