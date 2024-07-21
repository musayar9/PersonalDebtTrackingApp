import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DebtData } from "../lib/types";

export const getAllDebt = createAsyncThunk<DebtData, void,  {rejectValue:string}>(
  "debt/getAllDebt",
  async (_,{ rejectWithValue }) => {
    try {
    const res = await axios.get("/api/v1/debt")
    return res.data;
    
    
    } catch (error:unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

