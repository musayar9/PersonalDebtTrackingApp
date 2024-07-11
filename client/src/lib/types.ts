export interface User {
  _id: string;
  name: string;
  surname: string;
  username: string;
  birthdate: string;
  email: string;
  profilePicture: string;
  verifyAccount: boolean;
  verified: boolean;
  isAdmin: boolean;
  createdAt: string; 
  updatedAt: string;
  __v: number;
}

export type RegisterUser = {
  message: string;
  data: User;
};


export interface ApiResponse {
  user: User;
  message: string;
}


export interface UsersState {
  user: ApiResponse | null;
  userStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}