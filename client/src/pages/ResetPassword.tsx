import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import { IoInformationOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (errMsg) {
        setErrMsg("");
      }
    }, 3000);
  }, [errMsg]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`/api/v1/resetPassword`, { email });
      const data = await res.data;
      setLoading(false);
      setMessage(data.message);
      console.log(data);
    } catch (error) {
      setLoading(false);
      
      if (axios.isAxiosError(error)) {
        setErrMsg(
          error.response?.data.msg || "An error occurred. Please try again."
        );
      } else {
       setErrMsg(
         "Request failed. Please check your internet connection or try again later."
       );
      }
    }
  };

  return (
    <div className="mx-auto max-w-lg mt-24 gap-4 p-4">
      {message && (
        <AlertMessage
          message={message}
          color="bg-[#007bff]"
          icon={<IoInformationOutline className="text-lg" />}
        />
      )}

      <div className="flex flex-col items-center my-8">
        <h2 className="text-3xl font-bold text-slate-700">Password Reset</h2>
        <p className="mt-3 text-sm text-center text-slate-600">
          We need your email address so we can send you the password reset link.
        </p>
      </div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            id="otp"
            className="block px-2.5 pb-2.5 pt-4 w-full  text-sm placeholder:hidden
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Enter Your Email
          </label>
        </div>

        <button
          type="submit"
          className="bg-emerald-600 hover:opacity-80 text-gray-50 text-sm rounded-md py-2"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="loading loading-infinity loading-xs"></span>
              <span>Sending Email</span>
            </div>
          ) : (
            <p>Send Email</p>
          )}
        </button>
      </form>

      <Link to="/login">
        <button className="bg-slate-600 my-4 w-full hover:opacity-80 text-gray-50 rounded-md text-sm py-2">
          Return Login
        </button>
      </Link>

      <div className="text-center">
        <p className="text-slate-600 text-xs p-1">
          Remember to check your spam folder or unblock softwarebkm@outlook.com
          if you can not find the message.
        </p>
      </div>

      {errMsg && (
        <AlertMessage message={errMsg} icon={<MdError />} color="bg-red-600" />
      )}
    </div>
  );
};

export default ResetPassword;
