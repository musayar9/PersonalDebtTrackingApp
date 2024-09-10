import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse, CountryData, User } from "../lib/types";
import axios from "axios";
import api from "../utils/api";

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
      const res = await api.post(
        "/v1/auth/login",
        formData
      );
      const data = await res.data;
      return data;
    } catch (error) {
      return error; // Hata durumunda exception fırlatılır
    }
  }
);

export const signOut: AsyncThunk<
  { message: string },
  { id: string | undefined },
  Record<string, never>
> = createAsyncThunk(
  "user/signOut",
  async ({ id }: { id: string | undefined }) => {
    try {
      const res = await api.get(`/v1/auth/signOut/${id}`);
      const data = await res.data;
      return data;
    } catch (error) {
      return error;
    }
  }
);

interface UpdateUserArgs {
  id: string | undefined; 
  formData: User;
}

export const updateUser = createAsyncThunk<
  ApiResponse,
  UpdateUserArgs,
  { rejectValue: string }
>(
  "user/updateUser",
  async ({ id, formData }: UpdateUserArgs, { rejectWithValue }) => {
    try {
      const res = await api.put(`/v1/auth/updateUser/${id}`, formData);
      return res.data;
    } catch (error: unknown) {
      console.error("Error updating user:", error);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const deleteUser = createAsyncThunk<
  { message: string },
  { id: string },
  { rejectValue: string }
>("user/deleteUser", async ({ id }: { id: string }, { rejectWithValue }) => {
  try {
    const res = await api.delete(`/v1/auth/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.msg);
    } else {
      return rejectWithValue("Reject Failed");
    }
  }
});

export const fetchCountries = async () => {
  try {
    const res = await api.get("/v1/countries");
    const data: CountryData[] = await res.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      return "request failed";
    }
  }
};
