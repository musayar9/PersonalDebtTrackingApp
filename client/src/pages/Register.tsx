import { Link } from "react-router-dom";
import RegisterSvg from "../assets/register.svg";
import { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import axios, { AxiosResponse } from "axios";
import AlertMessage from "../components/AlertMessage";
import { MdErrorOutline } from "react-icons/md";
import FormInput from "../components/FormInput";
type FormData = {
  name: string;
  surname: string;
  birthdate: string;
  username: string;
  email: string;
  password: string;
};

const Register = () => {
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);

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
        console.log("47");
        setError(true);
        console.log;
      }

      const data = await response.data;
      console.log("data", data);
      setInfoMsg(data.message);
      setLoading(false);
      return data;
    } catch (error) {
      setError(true);
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setErrMsg(error.response?.data.msg);
      } else {
        // console.log("An unexpected error occurred", setErrMsg);
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
  console.log(errMsg);
  return (
    <div className="">
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
              src={RegisterSvg}
              alt="register"
              className="rounded-full w-40 h-40  shadow-md bg-emerald-400 "
            />
            <h1 className="text-2xl font-semibold my-4">Register</h1>
          </div>

          <form className="flex flex-col gap-2 p-4  " onSubmit={handleSubmit}>
            <div className="flex flex-col justify-between md:flex-row gap-2 ">
              <FormInput
                type={"text"}
                id="Name"
                name="name"
                placeholder={"name"}
                value={formData.name}
                handleChange={handleChange}
                styles="custom-input peer w-full md:w-40"
              />

              <FormInput
                type={"text"}
                id="Surname"
                name="surname"
                placeholder={"surname"}
                value={formData.surname}
                handleChange={handleChange}
                styles="custom-input peer w-full md:w-40"
              />

              <FormInput
                type={"date"}
                id="Birthdate"
                name="birthdate"
                placeholder={"birthdate"}
                value={formData.birthdate}
                handleChange={handleChange}
                styles="custom-input peer w-full md:w-40 "
              />
            </div>

            <div className="flex flex-col justify-between md:flex-row gap-2 ">
              <FormInput
                type={"text"}
                id="Username"
                name="username"
                placeholder={"username"}
                value={formData.username}
                handleChange={handleChange}
                styles="custom-input peer w-full md:w-60"
              />

              <FormInput
                type={"email"}
                id="Email"
                name="email"
                placeholder={"email"}
                value={formData.email}
                handleChange={handleChange}
                styles="custom-input peer w-full md:w-60"
              />
            </div>

            <div className="flex flex-col gap-2">
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
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="text-xs  flex justify-end pr-4 gap-2">
            Have An Account?
            <Link
              to="/login"
              className="text-blue-600 underline hover:text-blue-700"
            >
            Login
            </Link>
          </div>

          {infoMsg && (
            <AlertMessage
              icon={<CiCircleInfo size={28} />}
              message={infoMsg}
              color={"bg-sky-500"}
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
    </div>
  );
};

export default Register;