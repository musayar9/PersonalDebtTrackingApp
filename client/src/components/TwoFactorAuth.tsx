import axios from "axios";
import React, { FormEvent, useRef, useState } from "react";
import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage";
import { FaCheck } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateUser } from "../redux/dataFetch";

const TwoFactorAuth = () => {
  const { user } = useAppSelector((state) => state.user);
  const [code, setCode] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch = useAppDispatch();
  const [infoMsg, setInfoMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const handleChange = (e: HTMLInputElement, index: number) => {
    if (isNaN(Number(e.value))) return;

    const newCode = [...code];
    newCode[index] = e.value;
    setCode(newCode);

    if (e.value !== "" && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0 && !e.currentTarget.value) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  const verificationCode = code.join("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.put(`/api/v1/auth/twoFAVerifyCode`, {
        verificationCode,
      });
      const data = await res.data;
      await dispatch(
        updateUser({ id: user?.user._id, formData: data.updateUser })
      );
      setInfoMsg(data.msg);

      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setErrMsg(error?.response?.data.msg);
      } else {
        setErrMsg("request failed");
      }
    }
    setTimeout(() => {
      setErrMsg("");
      setInfoMsg("");
    }, 3000);
  };

  return (
    <div className="max-w-xl mx-auto ">
      <div className=" flex flex-col items-center justify-center my-24 ">
        <h2 className="text-3xl font-semibold leading-relaxed">
          Two Factor Authentication
        </h2>

        <p className="p-4  text-sm ">
          The two-factor verification code has been sent to your e-mail address.
          Please check the e-mail address
        </p>

        <form className="flex flex-col  gap-4 p-4" onSubmit={handleSubmit}>
          <div className="flex justify-evenly space-x-4">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyUp={(e) => handleKeyUp(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-12 h-12 text-center text-lg font-bold border bg-base-200 border-gray-300 rounded-md focus:outline-none focus:border-emerald-600"
              />
            ))}
          </div>

          {errMsg && (
            <AlertMessage
              color="bg-red-500"
              message={errMsg}
              icon={<MdError />}
            />
          )}
          <button
            type="submit"
            className="bg-emerald-600 hover:opacity-80 text-gray-50 text-sm rounded-md py-2"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="loading loading-infinity loading-xs"></span>
                <span>Verifying...</span>
              </div>
            ) : (
              <span>Verify</span>
            )}
          </button>
        </form>
        {infoMsg && (
          <AlertMessage
            message={infoMsg}
            color="bg-emerald-500"
            icon={<FaCheck />}
          />
        )}
        <p className="p-4  text-xs  text-center text-slate-500">
          Remember to check your spam folder or unblock softwarebkm@outlook.com
          if you can not find the message.
        </p>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
