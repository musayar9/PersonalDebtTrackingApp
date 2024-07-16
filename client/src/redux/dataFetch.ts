import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse, CountryData } from "../lib/types";
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
      return error; // Hata durumunda exception fırlatılır
    }
  }
);

export const signOut: AsyncThunk<
  {message:string},
  { id: string },
  Record<string, never>
> = createAsyncThunk("user/signOut", async ({ id }: { id: string }) => {
  try {
    const res = await axios.get(`/api/v1/auth/signOut/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    return error;
  }
});


export const fetchCountries = async():Promise<CountryData[]>=>{
  try {
    const res = await axios.get("/api/v1/countries")
    const data:CountryData[]=  await res.data
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}