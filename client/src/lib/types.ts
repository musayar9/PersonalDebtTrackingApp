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
  response?: {
    status: number;
    data?: unknown; // Gelen verinin türüne göre uygun şekilde tanımlayın
  };
}


export interface UsersState {
  user: ApiResponse | null;
  userStatus: "idle" | "loading" | "succeeded" | "failed";
  error: boolean | null

}

export interface Country {
  name: {
    common: string;
  };
  cca2: string;
  idd: {
    root: string;
    suffixes: string[];
  };
}



export interface CountryData {
  country: string;
  phoneCode: string;
  iso: string;
  flag: string;
  _id:string;
}

