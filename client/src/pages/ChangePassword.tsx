import axios from "axios";
import  { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import { MdError } from "react-icons/md";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
const {t}= useTranslation()
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

        const data = await res.data;

        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.msg);
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
        setErrMsg(error.response?.data.msg);
      } else {
        setErrMsg(
          "Request failed. Please check your internet connection or try again later."
        );
      }
    }
  };

  useEffect(() => {
    if (errMsg || error) {
      setTimeout(() => {
        setErrMsg("");
        setError("");
      }, 3000);
    }
  }, [errMsg, error]);
  return (
    <div className="max-w-md mx-auto mt-24 p-4">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-3xl font-bold ">{t("password_reset")}</h3>
        <p className="text-[10px] my-2 text-center">
          {t("change_password_info")}
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
                <FaEye className="w-5 h-5 " />
              ) : (
                <IoMdEyeOff className="w-5 h-5 " />
              )}
            </button>
            <input
              type={newPasswordType ? "text" : "password"}
              id="newPassword"
              className="flex px-2.5 pb-2.5 pt-4 w-full  text-sm pr-10 
 bg-transparent rounded-md border-1 appearance-none 
 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              name="newPassword"
              value={password.newPassword}
              onChange={handleChangePassword}
              maxLength={12}
            />
          </div>

          <label
            htmlFor="email"
            className="absolute text-md duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-base-100
            px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            {t("new_password")}
          </label>

          <p className=" text-[10px] pl-1 ">
            {12 - password.newPassword.length} {t(`characters_remaining`)}
          </p>
        </div>

        <div className="relative">
          <div className="relative">
            <button
              type="button"
              onClick={() => setNewPasswordConfirmType(!newPasswordConfirmType)}
              className="absolute inset-y-0 end-0 flex items-center pr-3.5 pointer-events-auto"
            >
              {newPasswordConfirmType ? (
                <FaEye className="w-5 h-5 " />
              ) : (
                <IoMdEyeOff className="w-5 h-5 " />
              )}
            </button>
            <input
              type={newPasswordConfirmType ? "text" : "password"}
              id="newPassword"
              className="flex px-2.5 pb-2.5 pt-4 w-full  text-sm pr-10 
 bg-transparent rounded-md border-1 appearance-none 
 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              name="newPasswordConfirm"
              value={password.newPasswordConfirm}
              onChange={handleChangePassword}
              maxLength={12}
            />
          </div>

          <label
            htmlFor="password"
            className="absolute text-md duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-base-100
            px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            {t("new_password_repeat")}
          </label>
          <p className=" text-[10px] pl-1 ">
            {12 - password.newPasswordConfirm.length}{" "}
            {t(`characters_remaining`)}
          </p>
        </div>

        <button className="bg-emerald-600 hover:opacity-80 p-2 text-sm text-white rounded-md">
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="loading loading-infinity loading-xs"></span>
              <span className="text-sm">{t("change_password_status")}</span>
            </div>
          ) : (
            <p>{t("save")}</p>
          )}
        </button>
      </form>

      {error && (
        <AlertMessage message={error} icon={<MdError />} color="bg-red-600" />
      )}

      {errMsg && (
        <AlertMessage message={errMsg} icon={<MdError />} color="bg-red-600" />
      )}
    </div>
  );
};

export default ChangePassword;
