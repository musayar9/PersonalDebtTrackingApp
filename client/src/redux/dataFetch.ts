import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "../lib/types";
import axios from "axios";

interface LoginInterface {
  email: string;
  password: string;
}

export const loginUser: AsyncThunk<
  ApiResponse,
  { formData: LoginInterface },
  Record<string, never>
> = createAsyncThunk(
  "user/login",
  async ({ formData }: { formData: LoginInterface }) => {
    try {
      const res = await axios.post("/api/v1/auth/login", formData);
      const data = await res.data;
      return data;
    } catch (error) {

      return error // Hata durumunda exception fırlatılır
    }
  }
);
