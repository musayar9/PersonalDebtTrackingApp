import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, UsersState } from "../lib/types";
import { loginUser, signOut } from "./dataFetch";

const initialState: UsersState = {
  user: null, // Başlangıçta user null olarak tanımlanır
  userStatus: "idle",
  error: false,
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
      });
  },
});
export const { setError } = userSlice.actions;
export default userSlice.reducer;
