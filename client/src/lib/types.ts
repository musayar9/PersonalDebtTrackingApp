export interface User {
  _id: string;
  name: string;
  surname: string;
  username: string;
  birthdate: string; // ISO tarih formatında olduğundan string olarak tanımlanmıştır
  email: string;
  profilePicture: string;
  verifyAccount: boolean;
  verified: boolean;
  isAdmin: boolean;
  createdAt: string; // ISO tarih formatında olduğundan string olarak tanımlanmıştır
  updatedAt: string; // ISO tarih formatında olduğundan string olarak tanımlanmıştır
  __v: number;
}

export interface ApiResponse {
  user: User;
  message: string;
}


export interface UsersState {
  user: ApiResponse | null;
  userStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}