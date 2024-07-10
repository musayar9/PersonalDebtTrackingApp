export type User = {
  birthdate: string;
  createdAt: string;
  email: string;
  isAdmin: boolean;
  name: string;
  password: string;
  profilePicture: string;
  surname: string;
  updatedAt: string;
  username: string;
  verified: false;
  verifyAccount: false;
  __v: 0;
  _id: string;
};

export type RegisterUser= {
  message: string;
  data: User;
};
