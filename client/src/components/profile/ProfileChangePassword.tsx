import React, { useState } from "react";

import { HiEye } from "react-icons/hi";
import axios from "axios";
import { MdErrorOutline } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { useAppSelector } from "../../redux/hooks";
import ProfileBreadcrumps from "./ProfileBreadcrumps";
import AlertMessage from "../AlertMessage";

interface PasswordData {
  currentPassword: string;
  newPassword: string;
}

const ProfileChangePassword: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [passMsg, setPassMsg] = useState("");
  const [passMsgErr, setPassMsgErr] = useState(false);
  const [currPassShow, setCurrPassShow] = useState(false);
  const [newPassShow, setNewPassShow] = useState(false);

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.patch(
        `/api/v1/auth/changePassword/${user?.user._id}`,
        formData
      );
      const data = await res.data;

      setLoading(false);
      setSuccess(data.message);

      setTimeout(() => {
        setSuccess("");
      }, 3000);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setPassMsg(error.response.data.message);
        setPassMsgErr(true);
      } else {
        setPassMsg("An unknown error occurred");
        setPassMsgErr(true);
      }

      setTimeout(() => {
        setPassMsg("");
        setPassMsgErr(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full p-8">
      <ProfileBreadcrumps />

      <div className="mx-auto max-w-lg mt-12">
        <div className="flex flex-col items-center my-8">
          <h2 className="text-3xl font-bold text-slate-700">Change Password</h2>
          <p className="mt-3 text-sm text-center text-slate-600">
            Your password must consist of at least 8 characters.
          </p>
        </div>

        <form
          className="flex items-center justify-center flex-col"
          onSubmit={handleSubmit}
        >
          <label className="form-control w-full max-w-md">
            <div className="label">
              <span className="label-text text-slate-500 text-semibold">
                Current Password
              </span>
            </div>

            <div className="relative">
              <button
                type="button"
                className="absolute  right-4 top-3"
                onClick={() => setCurrPassShow(!currPassShow)}
              >
                <HiEye size={24} className="text-slate-500 hidden" />
                <span className="text-slate-500">
                  {" "}
                  {currPassShow ? "Hide" : "Show"}
                </span>
              </button>
              <input
                type={currPassShow ? "text" : "password"}
                name="currentPassword"
                placeholder="Current Password"
                value={formData.currentPassword}
                className={` input  w-full max-w-md ${
                  passMsgErr
                    ? "input-error border-red-600"
                    : " border-2 border-gray-300 focus:border-emerald-600"
                }   `}
                onChange={handleChangePassword}
              />
            </div>
          </label>

          <label className="form-control w-full max-w-md">
            <div className="label">
              <span className="label-text text-slate-500 text-semibold">
                New Password
              </span>
            </div>

            <div className="relative ">
              <button
                type="button"
                className="absolute  right-4 top-3"
                onClick={() => setNewPassShow(!newPassShow)}
              >
                <span className="text-slate-500">
                  {newPassShow
                    ? // <HiEye size={24} className="text-slate-500" />
                      "Hide"
                    : // <HiEyeOff size={24} className="text-slate-500" />
                      "Show"}
                </span>
              </button>
              <input
                type={newPassShow ? "text" : "password"}
                placeholder="New Password"
                name="newPassword"
                value={formData.newPassword}
                className={`input w-full max-w-md ${
                  passMsgErr
                    ? "input-error border-red-600"
                    : " border-2 border-gray-300 focus:border-emerald-600 "
                }  `}
                onChange={handleChangePassword}
              />
            </div>
          </label>

          <button
            type="submit"
            className=" w-full max-w-md my-4  text-xs border border-emerald-400 text-gray-500 font-semibold hover:border-white hover:text-white hover:bg-emerald-500 duration-150 ease-linear rounded-md p-2.5"
          >
            {loading ? (
              <p className="flex gap-2 items-center justify-center">
                <span className="loading loading-spinner"></span>
                <span>Password is updating</span>
              </p>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
        <div>
          {passMsgErr && (
            <AlertMessage
              message={passMsg}
              color={"bg-red-500"}
              icon={<MdErrorOutline size={28} />}
            />
          )}
          {success && (
            <AlertMessage
              message={success}
              color={"bg-green-500"}
              icon={<AiFillLike size={28} />}
            />
          )}
        </div>

        <p className=" text-xs flex items-center justify-center text-center text-slate-600 w-full p-4">
          For your security, choose a password that does not include your name,
          surname and date of birth.
        </p>
      </div>
    </div>
  );
};

export default ProfileChangePassword;
