import React, { useState } from "react";

import { HiEye } from "react-icons/hi";
import axios from "axios";
import { MdErrorOutline } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ProfileBreadcrumps from "./ProfileBreadcrumps";
import AlertMessage from "../AlertMessage";
import api from "../../utils/api";
import { ToggleSwitch } from "flowbite-react";
import { updateUser } from "../../redux/dataFetch";
import toast from "react-hot-toast";

interface PasswordData {
  currentPassword: string;
  newPassword: string;
}

const ProfileChangePassword: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);

  const [verifyStatus, setVerifyStatus] = useState<boolean>(
    !!user?.user?.isTwoFA
  );

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

      const res = await api.patch(
        `/v1/auth/changePassword/${user?.user._id}`,
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
      setLoading(false);
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
  console.log(passMsg);
  const dispatch = useAppDispatch();
  const handleToggleChange = async () => {
    try {
      const updatedStatus = !verifyStatus;
      setVerifyStatus(updatedStatus);

      // API isteği ile iki faktörlü kimlik doğrulama durumunu güncelleme
      const res = await api.put("/v1/auth/controllerTwoFA", {
        verifyStatus: updatedStatus,
      });
      const data = await res.data;

      await dispatch(
        updateUser({ id: user?.user?._id, formData: data.updateUser })
      );

      toast.success(data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full p-8">
      <ProfileBreadcrumps />

      <div className="mx-auto max-w-lg mt-12">
        <div className="flex flex-col items-center my-8">
          <h2 className="text-2xl font-bold ">Change Password</h2>
          <p className="text-xs my-2 text-center">
            The password must be <b>8 to 12 characters long</b>, and it must
            contain at least <b>one uppercase letter</b>,{" "}
            <b>one lowercase letter</b>, <b>one special character</b>, and{" "}
            <b>one number</b>.
          </p>
        </div>

        <form
          className="flex items-center justify-center flex-col"
          onSubmit={handleSubmit}
        >
          <label className="form-control w-full max-w-md">
            <div className="label">
              <span className="label-text  font-semibold">
                Current Password
              </span>
            </div>

            <div className="relative">
              <button
                type="button"
                className="absolute  right-4 top-3"
                onClick={() => setCurrPassShow(!currPassShow)}
              >
                <HiEye size={24} className=" hidden" />
                <span className="">
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
              <span className="label-text font-semibold">
                New Password
              </span>
            </div>

            <div className="relative ">
              <button
                type="button"
                className="absolute  right-4 top-3"
                onClick={() => setNewPassShow(!newPassShow)}
              >
                <span className="">
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
            className=" w-full max-w-md my-4  text-xs border border-emerald-400 font-semibold hover:border-white hover:text-white hover:bg-emerald-500 duration-150 ease-linear rounded-md p-2.5"
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

        <p className=" text-xs flex items-center justify-center text-center w-full p-4">
          For your security, choose a password that does not include your name,
          surname and date of birth.
        </p>

        <div className="border rounded-md p-4 m-5">
          <div className="flex items-center justify-between">
            <h2 className=" font-semibold text-xl">
              Two Factor Authentication
            </h2>
            <ToggleSwitch
              checked={verifyStatus}
              onChange={handleToggleChange}
            />
          </div>

          <p className=" text-xs w-80 leading-relaxed my-2">
            When you enable the two-step verification method, you log in with
            the verification code sent to your registered e-mail in addition to
            your personal passwords.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileChangePassword;
