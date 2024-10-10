import { Link } from "react-router-dom";

import { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import axios, { AxiosResponse } from "axios";
import AlertMessage from "../components/AlertMessage";
import { MdErrorOutline } from "react-icons/md";
import FormInput from "../components/FormInput";
import VerifyUserModal from "../components/VerifyUserModal";
import { User } from "../lib/types";
import { IoIosWarning } from "react-icons/io";
import CheckPasswordCriteria from "../components/CheckPasswordCriteria";
import RegisterImage from "../assets/register.svg";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../redux/hooks";
type FormData = {
  name: string;
  surname: string;
  birthdate: string;
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const { t } = useTranslation();
const {theme} = useAppSelector((state)=>state.theme)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    birthdate: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [infoMsg, setInfoMsg] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<User | null>(null);
  const [warningMsg, setWarningMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const response: AxiosResponse = await axios.post(
        "/api/v1/auth/register",
        {
          headers: { "Content-Type": "application/json" },
          formData,
        }
      );

      if (response.status !== 201) {
        setErrMsg(response.data.msg);

        setError(true);
      }

      const data = await response.data;

      setInfoMsg(data.message);
      setData(data.status);
      setShowModal(true);
      setLoading(false);
      return data;
    } catch (error) {
      setError(true);
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setErrMsg(error.response?.data.msg);
      } else {
        setErrMsg("Request failed");
      }

      if (error) {
        setTimeout(() => {
          setError(false);
          setErrMsg("");
        }, 3000);
      }
    }
  };

  return (
    <div className="mt-20">
      <div className="flex p-3 max-w-6xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1 items-center justify-center">
          <h2 className="text-4xl  font-bold   rounded-lg   py-1 ">
            {t("personal_debt_tracking")}
          </h2>
          <p className="my-4 leading-8 tracking-wider indent-6 hyphens-auto   ">
            {t("app_description")}
          </p>
        </div>

        <div className="flex-1 ">
          <div className="flex items-center justify-center flex-col  mt-4">
            <img
              src={RegisterImage}
              alt="register"
              className="rounded-full w-40 h-40  shadow-md bg-emerald-400 "
            />
            <h1 className="text-2xl font-semibold my-4">{t("register")}</h1>
          </div>

          <form className="flex flex-col gap-2 p-4  " onSubmit={handleSubmit}>
            <div className="flex flex-col justify-between md:flex-row gap-2 ">
              <FormInput
                type={"text"}
                id="Name"
                name="name"
                placeholder={t("name")}
                value={formData.name}
                handleChange={handleChange}
                styles="custom-input peer w-full md:w-40"
              />

              <FormInput
                type={"text"}
                id="Surname"
                name="surname"
                placeholder={t("surname")}
                value={formData.surname}
                handleChange={handleChange}
                styles="custom-input peer w-full md:w-40"
              />

              <FormInput
                type={"date"}
                id="Birthdate"
                name="birthdate"
                placeholder={t("birthdate")}
                value={formData.birthdate}
                handleChange={handleChange}
                styles="custom-input peer w-full md:w-40 "
              />
            </div>

            <div className="flex flex-col justify-between md:flex-row gap-1 ">
              <FormInput
                type={"text"}
                id="Username"
                name="username"
                placeholder={t("username")}
                value={formData.username}
                handleChange={handleChange}
                styles="custom-input peer w-full md:w-64"
              />

              <FormInput
                type={"email"}
                id="Email"
                name="email"
                placeholder={t("email")}
                value={formData.email}
                handleChange={handleChange}
                styles="custom-input peer w-full md:w-64"
              />
            </div>

            <div className="flex flex-col gap-2">
              <FormInput
                type={"password"}
                id="Password"
                name="password"
                placeholder={t("password")}
                value={formData.password}
                handleChange={handleChange}
                styles="custom-input peer w-full"
              />

              <CheckPasswordCriteria password={formData.password} />
            </div>

            <button className="border border-emerald-400  font-semibold hover:border-white hover:text-white hover:bg-emerald-500 duration-150 ease-in rounded-md p-2">
              {loading ? <>{t("registering")}</> : <>{t("register")}</>}
            </button>
          </form>

          <div className="text-xs  flex justify-end pr-4 gap-2">
            {t("I_have_an_account")}
            <Link
              to="/login"
              className={` underline   ${
                theme === "light"
                  ? "text-blue-600  hover:text-blue-700"
                  : "text-blue-400  hover:text-blue-500"
              } `}
            >
              {t("login")}
            </Link>
          </div>

          {infoMsg && (
            <AlertMessage
              icon={<CiCircleInfo size={28} />}
              message={infoMsg}
              color={"bg-sky-500"}
            />
          )}

          {warningMsg && (
            <AlertMessage
              message={warningMsg}
              color="bg-orange-500"
              icon={<IoIosWarning />}
            />
          )}

          {error && (
            <AlertMessage
              icon={<MdErrorOutline size={28} />}
              message={errMsg}
              color={"bg-red-500"}
            />
          )}
        </div>
      </div>

      <VerifyUserModal
        showModal={showModal}
        setShowModal={setShowModal}
        setInfoMsg={setInfoMsg}
        data={data}
        setWarningMsg={setWarningMsg}
      />
    </div>
  );
};

export default Register;
