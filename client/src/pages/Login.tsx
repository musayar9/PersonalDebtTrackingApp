import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import LoginImage from "../assets/login.svg";
import FormInput from "../components/FormInput";
import { loginUser } from "../redux/dataFetch";
import { setError } from "../redux/userSlice";
import AlertMessage from "../components/AlertMessage";
import { MdErrorOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";

type UserLogin = {
  email: string;
  password: string;
};

const Login = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const { user, error, userStatus } = useAppSelector((state) => state.user);
  const {theme} = useAppSelector((state)=>state.theme)

  const [errMsg, setErrMsg] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ formData }));
  };

  useEffect(() => {
    if (user && user?.response?.status !== 400) {
      if (user !== null) {
        if (user?.user?.isTwoFA) {
          navigate("/twoFactorAuth");
        } else {
          navigate("/");
        }
      }
    } else {
      dispatch(setError(true));
      let errorMsg = "";

      if (
        typeof user?.response?.data === "object" &&
        user.response?.data &&
        "msg" in user.response.data
      ) {
        errorMsg = (user?.response.data as { msg: string }).msg;
      }
      setErrMsg(errorMsg);
      setTimeout(() => {
        dispatch(setError(false));
      }, 3000);
    }
  }, [user]);

  return (
    <div className="mt-24">
      <div className="flex p-3 max-w-6xl mx-auto flex-col md:flex-row md:items-center gap-5 ">
        <div className="flex-1 items-center justify-center mt-24">
          <h2 className="text-4xl  font-bold   rounded-lg   py-1 ">
            {t("personal_debt_tracking")}
          </h2>
          <p className="my-4 leading-8 tracking-wider indent-6 hyphens-auto  ">
            {t("app_description")}
          </p>
        </div>

        <div className="flex-1 md:flex-none w-[500px]">
          <div className="flex items-center justify-center flex-col  mt-4">
            <img
              src={LoginImage}
              alt="register"
              className="rounded-full w-40 h-40  shadow-md bg-emerald-400 "
            />
            <h1 className="text-2xl font-semibold my-4">{t("login")}</h1>
          </div>

          <form className="flex flex-col gap-2 p-4  " onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <FormInput
                type={"email"}
                id="Email"
                name="email"
                placeholder={t("email")}
                value={formData.email}
                handleChange={handleChange}
                styles="custom-input peer w-full "
              />

              <FormInput
                type={"password"}
                id="Password"
                name="password"
                placeholder={t("password")}
                value={formData.password}
                handleChange={handleChange}
                styles="custom-input peer w-full"
              />
            </div>

            <button className="border border-emerald-400 text-gray-500 font-semibold hover:border-white hover:text-white hover:bg-emerald-500 duration-150 ease-in rounded-md p-2">
              {userStatus === "loading" ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="loading loading-infinity loading-xs"></span>
                  <span>{t("redirecting")}</span>
                </div>
              ) : (
                <span>{t("login")}</span>
              )}
            </button>
          </form>

          <div className="flex justify-between pr-4">
            <Link
              to="/reset-password"
              className={`text-xs pl-4 underline   ${
                theme === "light"
                  ? "text-blue-600  hover:text-blue-700"
                  : "text-blue-400  hover:text-blue-500"
              } `}
            >
              {t("forget_password")}
            </Link>
            <p className="text-xs space-x-2">
              <span>{t("I_don't_have_an_account_yet")}</span>
              <Link
                to="/register"
                className={` underline pr-2 ${
                  theme === "light"
                    ? "text-blue-600  hover:text-blue-700"
                    : "text-blue-400  hover:text-blue-500"
                }`}
              >
                {t("register")}
              </Link>
            </p>
          </div>

          {error && errMsg !== "" && (
            <AlertMessage
              icon={<MdErrorOutline size={28} />}
              message={errMsg}
              color={"bg-red-500"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
