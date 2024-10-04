import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import { IoInformationOutline } from "react-icons/io5";
import { MdError } from "react-icons/md";
import FormInput from "../components/FormInput";

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
  const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
    setEmail(e.target.value)
  }

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
        <h2 className="text-3xl font-bold ">Password Reset</h2>
        <p className="mt-3 text-sm text-center text-slate-500 font-semibold">
          We need your email address so we can send you the password reset link.
        </p>
      </div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>


        <FormInput
          type="email"
          id="Email"
          name="email"
          placeholder="Enter Your Email"
          value={email}
          handleChange={handleChange}
          styles="custom-input peer w-full"
        />

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
        <p className="text-slate-500 text-xs p-1">
          Remember to check your spam folder or unblock softwarebkm@gmail.com
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
