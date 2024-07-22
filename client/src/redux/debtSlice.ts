import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DebtData, DebtState } from "../lib/types";
import { getAllDebt } from "./debtFetch";

const initialState: DebtState = {
  debt: [],
  debtStatus: "idle",
  error: null,
};

const debtSlice = createSlice({
  name: "debt",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllDebt.pending, (state) => {
        state.debtStatus = "loading";
      })
      .addCase(
        getAllDebt.fulfilled,
        (state, action: PayloadAction<DebtData[]>) => {
          state.debtStatus = "succeeded";
          state.debt = action.payload;
        }
      )
      .addCase(getAllDebt.rejected, (state, action) => {
        state.debtStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export default debtSlice.reducer;
