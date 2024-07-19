// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "authotp-jwt.firebaseapp.com",
  projectId: "authotp-jwt",
  storageBucket: "authotp-jwt.appspot.com",
  messagingSenderId: "309539870865",
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
