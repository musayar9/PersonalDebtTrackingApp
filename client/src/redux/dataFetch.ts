import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse, CountryData, User } from "../lib/types";
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


interface UpdateUserArgs {
  id: string;
  formData:User
}

// export const updateUser: AsyncThunk<
// ApiResponse,

//   UpdateUserArgs,
//   Record<string, never>
// > = createAsyncThunk(
//   "user/updateUser",
//   async ({ id, formData }: UpdateUserArgs) => {
//     try {
//       const res = await axios.put(`/api/v1/auth/updateUser/${id}`, {
//         formData,
//       });
//       const data = await res.data;
//       console.log(data, "data");
//       return data;
//     } catch (error) {
//        console.error("Error updating user:", error);
//       return error
//     }
//   }
// );

export const updateUser = createAsyncThunk<
  ApiResponse,
  UpdateUserArgs,
  { rejectValue: string }
>(
  "user/updateUser",
  async ({ id, formData }: UpdateUserArgs, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/v1/auth/updateUser/${id}`, formData);
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