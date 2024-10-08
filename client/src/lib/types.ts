export interface User {
  _id?: string;
  name: string;
  surname: string;
  username: string;
  birthdate: string;
  email: string;
  profilePicture?: string;
  verifyAccount?: boolean;
  isTwoFA?: boolean;
  isTwoFAVerify?:boolean;
  isAdmin?: boolean;
  address: string;
  phone: string;
  city: string;
  district: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export type RegisterUser = {
  message: string;
  data: User;
};

export interface ApiResponse {
  user: User;
  message: string;
  token:"string"
  response?: {
    status: number;
    data?: unknown; // Gelen verinin türüne göre uygun şekilde tanımlayın
  };
}

export interface UsersState {
  user: ApiResponse | null;
  userStatus: "idle" | "loading" | "succeeded" | "failed";
  userUpdateStatus: "idle" | "loading" | "succeeded" | "failed";
  userDeleteStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | boolean;
  token:string
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
  _id: string;
}

// debt types

export interface PaymentPlan {
  _id?: string;
  paymentDate: string;
  paymentAmount: number;
  paymentStatus: boolean;
}

export interface CreateDebt {
  lender: string;
  borrower: string;
  debtAmount: number;
  interestRate: number;
  amount: number;
  paymentStart: string;
  installment: number;
  description?: string | undefined;

  paymentPlan: PaymentPlan[];
}

export interface DebtData {
  _id?: string;
  userId?: string;
  lender: string;
  borrower: string;
  debtAmount: number;
  interestRate: number;
  amount: number;
  paymentStart: Date | string;
  installment: number;
  description?: string;
  paymentStatus?: string;
  paymentPlan: PaymentPlan[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
  __v?: number;
}

export interface DebtResponse {
  status: DebtData;
  message: string;
}

export interface UpdateDebt {
  updateDebt: DebtData;
  message: string;
}
export interface DebtState {
  debt: DebtData[] | null;
  debtStatus: "idle" | "succeeded" | "loading" | "failed";
  error: null | string;
}

export interface UpcomingDebt {
  lender: string;
  borrower: string;
  paymentAmount: number;
  paymentDate: string | Date;
  description: string;
}

export interface ChatType {
  members: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Messages {
  _id: string;
  text: string;
  senderId: string;
  chatId: string;
  createdAt: string;
  updatedAt: string;
  receiverId?: string;

  __v: number;
}

export interface SendMessage {
  senderId: string | undefined;
  text: string;
  chatId: string | undefined;
  receiverId?: string;
}

export interface RecievedMessage {
  _id: string;
  text: string;
  senderId: string | undefined;
  chatId: string;
  createdAt: string;
  updatedAt: string;
  receiverId?: string;
  profilePicture: string;
  senderName: string;
  __v?: number;
}

export interface OnlineUsers {
  userId: string;
  socketId: string;
}
export interface ComingMessages {
  senderId: string | undefined;
  receiverId: string | undefined;
  receiverUser: string | undefined;
  senderName: string;
  message: string;
  msgDate: string;
  profilePicture: string;
}

export interface MessageGroup {
  [senderName: string]: RecievedMessage[];
}

export interface OnlineUsers {
  socketId: string;
  userId: string;
}
export interface MessageState {
  recieverMessage: RecievedMessage | null;
  inComingMessage: RecievedMessage[];
  messageGroup: MessageGroup[] | null;
  allChats: ChatType[] | null;
  currentChatData: ChatType | null;
  chatloading: boolean;
  chatError: string;
}

export interface Filter {
  lender: string | null;
  borrower: string | null;
  paymentStatus: string | null;
}
