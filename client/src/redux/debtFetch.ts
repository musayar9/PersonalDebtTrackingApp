import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CreateDebt, DebtData, DebtResponse } from "../lib/types";

export const getAllDebt = createAsyncThunk<DebtData[], void,  {rejectValue:string}>(
  "debt/getAllDebt",
  async (_,{ rejectWithValue }) => {
    try {
    const res = await axios.get("/api/v1/debt")
    return res.data as DebtData[];
    
    
    } catch (error:unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);




// export const createDebt = createAsyncThunk<
//   DebtResponse,
//   CreateDebt,
//   { rejectValue: string }
// >("debt/createDebt", async ({ formData }:CreateDebt, { rejectWithValue }) => {
//   try {
//     const res = await axios.post(`/api/v1/debt`, formData);
    
//     return res.data
//   } catch (error:unknown) {
//    if (axios.isAxiosError(error) && error.response) {
//      return rejectWithValue(error.response.data.error);
//    } else {
//      return rejectWithValue("An unknown error occurred");
//    }
//   }
// });