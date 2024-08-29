import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import { MdError } from "react-icons/md";

const ChangePassword = () => {
  const { userId, token } = useParams();

  const [newPasswordType, setNewPasswordType] = useState(false);
  const [newPasswordConfirmType, setNewPasswordConfirmType] = useState(false);
  const [password, setPassword] = useState({
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPassword = async () => {
      try {
        const res = await axios.get(
          `/api/v1/resetPassword/${userId}/token/${token}`
        );

        const data = res.data;
        console.log("data", data);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.msg  || "An error occurred. Please try again.");
        } else {
          setError(
            "Request failed. Please check your internet connection or try again later."
          );
        }
      }
    };

    fetchPassword();
  }, [userId, token]);

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmitPassword = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.put(
        `/api/v1/resetPassword/${userId}/token/${token}`,
        {
          newPassword: password.newPassword,
          newPasswordConfirm: password.newPasswordConfirm,
        }
      );

      const data = res.data;
      setLoading(false);
      navigate("/login");
      return data;
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
setErrMsg(error.response?.data.msg || "An error occurred. Please try again.");
      } else {
         setErrMsg(
           "Request failed. Please check your internet connection or try again later."
         );
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-4">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-3xl font-bold text-slate-700">Reset Password</h3>
        <p className="text-sm text-slate-600">
          Password must be contain at least 8 characters
        </p>
      </div>
      <form
        className="flex gap-4 flex-col flex-1 my-4"
        onSubmit={handleSubmitPassword}
      >
        <div className="relative">
          <div className="relative">
            <button
              type="button"
              onClick={() => setNewPasswordType(!newPasswordType)}
              className="absolute inset-y-0 end-0 flex items-center pr-3.5 pointer-events-auto"
            >
              {newPasswordType ? (
                <FaEye className="w-5 h-5 text-gray-800 dark:text-gray-400" />
              ) : (
                <IoMdEyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
            <input
              type={newPasswordType ? "text" : "password"}
              id="newPassword"
              className="flex px-2.5 pb-2.5 pt-4 w-full  text-sm pr-10
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              name="newPassword"
              value={password.newPassword}
              onChange={handleChangePassword}
            />
          </div>

          <label
            htmlFor="email"
            className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            New Password
          </label>
        </div>

        <div className="relative">
          <div className="relative">
            <button
              type="button"
              onClick={() => setNewPasswordConfirmType(!newPasswordConfirmType)}
              className="absolute inset-y-0 end-0 flex items-center pr-3.5 pointer-events-auto"
            >
              {newPasswordConfirmType ? (
                <FaEye className="w-5 h-5 text-gray-800 dark:text-gray-400" />
              ) : (
                <IoMdEyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
            <input
              type={newPasswordConfirmType ? "text" : "password"}
              id="newPassword"
              className="flex px-2.5 pb-2.5 pt-4 w-full  text-sm pr-10
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              name="newPasswordConfirm"
              value={password.newPasswordConfirm}
              onChange={handleChangePassword}
            />
          </div>

          <label
            htmlFor="email"
            className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            New Password Confirm
          </label>
        </div>

        <button className="bg-emerald-600 hover:opacity-80 p-2 text-sm text-white rounded-md">
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="loading loading-infinity loading-xs"></span>
              <span className="text-sm">password is being changed</span>
            </div>
          ) : (
            <p>Change Password</p>
          )}
        </button>
      </form>

      {error && (
        <AlertMessage message={errMsg} icon={<MdError />} color="bg-red-600" />
      )}
    </div>
  );
};

export default ChangePassword;
