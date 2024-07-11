import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ApiResponse, UsersState } from "../lib/types";
import { loginUser } from "./dataFetch";
const initialState: UsersState = {
  user: null, // Başlangıçta user null olarak tanımlanır
  userStatus: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
        state.error = action.error.message || "Failed to login";
      });
  },
});

export default userSlice.reducer;
