import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import LoginImage  from "../assets/login.svg"
import FormInput from "../components/FormInput";
import { loginUser } from "../redux/dataFetch";
import { setError } from "../redux/userSlice";
import AlertMessage from "../components/AlertMessage";
import { MdErrorOutline } from "react-icons/md";

type UserLogin = {
  email: string;
  password: string;
};

const Login = () => {
  const [formData, setFormData] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const { user, error, userStatus } = useAppSelector((state) => state.user);

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
    <div className="mt-12">
      <div className="flex p-3 max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1 items-center justify-center">
          <h2 className="text-4xl  font-bold   rounded-lg   py-1 ">
            Personal Debt Tracking
          </h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
            nobis.
          </p>
        </div>

        <div className="flex-1 ">
          <div className="flex items-center justify-center flex-col  mt-4">
            <img
              src={LoginImage}
              alt="register"
              className="rounded-full w-40 h-40  shadow-md bg-emerald-400 "
            />
            <h1 className="text-2xl font-semibold my-4">Login</h1>
          </div>

          <form className="flex flex-col gap-2 p-4  " onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <FormInput
                type={"email"}
                id="Email"
                name="email"
                placeholder={"email"}
                value={formData.email}
                handleChange={handleChange}
                styles="custom-input peer w-full "
              />

              <FormInput
                type={"password"}
                id="Password"
                name="password"
                placeholder={"password"}
                value={formData.password}
                handleChange={handleChange}
                styles="custom-input peer w-full"
              />
            </div>

            <button className="border border-emerald-400 text-gray-500 font-semibold hover:border-white hover:text-white hover:bg-emerald-500 duration-150 ease-in rounded-md p-2">
              {userStatus === "loading" ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="loading loading-infinity loading-xs"></span>
                  <span>Redirecting</span>
                </div>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>

          <div className="flex justify-between pr-4">
            <Link
              to="/reset-password"
              className=" text-xs text-blue-600 pl-4 underline hover:text-blue-700 "
            >
              Forget Password?
            </Link>
            <p className="text-xs text-slate-500">
              Do You Have An Account?{" "}
              <Link to="/register" className="text-blue-600 underline pr-2">
                Register
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
