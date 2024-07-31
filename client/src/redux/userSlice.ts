import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, UsersState } from "../lib/types";
import {
  deleteUser,

  loginUser,
  signOut,
  updateUser,
} from "./dataFetch";

const initialState: UsersState = {
  user: null, // Başlangıçta user null olarak tanımlanır
  userStatus: "idle",
  userUpdateStatus: "idle",
userDeleteStatus:"idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          state.userStatus = "succeeded";
          state.user = action.payload;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.userStatus = "failed";
        console.log(action);

        state.error = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.userUpdateStatus = "loading";
        state.error = null;
        
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userUpdateStatus = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userUpdateStatus = "failed";
        state.error = action.payload as string;
      })

      .addCase(signOut.pending, (state) => {
        state.userStatus = "loading";
      })

      .addCase(signOut.fulfilled, (state) => {
        state.userStatus = "succeeded";
        state.user = null;
      })

      .addCase(signOut.rejected, (state) => {
        state.userStatus = "failed";
        state.error = true;
      })

      .addCase(deleteUser.pending, (state) => {
        state.userDeleteStatus = "loading";
      })

      .addCase(deleteUser.fulfilled, (state) => {
        state.userDeleteStatus = "succeeded";
        state.userStatus="idle"
        state.userUpdateStatus="idle"
        state.user = null;
        state.error = null;
      })
      
      .addCase(deleteUser.rejected, (state, action)=>{
            state.userDeleteStatus = "failed";
            state.error = action.payload as string;
      })
  },
});
export const { setError } = userSlice.actions;
export default userSlice.reducer;
