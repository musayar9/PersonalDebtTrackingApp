import { Link } from "react-router-dom";
import RegisterSvg from "../assets/register.svg";
import { useState } from "react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);
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

          <form className="flex flex-col gap-2 p-4  ">
            <div className="flex flex-col justify-between md:flex-row gap-2 ">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="name"
                  className="block px-2.5 pb-2.5 pt-4 w-full md:w-40 text-sm placeholder:hidden
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  value={formData.name}
                  onChange={handleChange}
                />

                <label
                  htmlFor="name"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  placeholder="surname "
                  className="block px-2.5 pb-2.5 pt-4 w-full md:w-40  text-sm placeholder:hidden
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  value={formData.surname}
                  onChange={handleChange}
                />

                <label
                  htmlFor="Surname"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Surname
                </label>
              </div>
              <div className="relative">
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  placeholder="Date of Birth"
                  className="flex px-2.5 pb-2.5 pt-4 w-full md:w-40 text-sm placeholder:hidden
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  value={formData.birthdate}
                  onChange={handleChange}
                />

                <label
                  htmlFor="Date of Birth"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Birth Date
                </label>
              </div>
            </div>

            <div className="flex flex-col justify-between md:flex-row gap-2 ">
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="username"
                  className="block px-2.5 pb-2.5 pt-4 w-full md:w-60 text-sm placeholder:hidden
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  value={formData.username}
                  onChange={handleChange}
                />

                <label
                  htmlFor="username"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Username
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="email"
                  className="block px-2.5 pb-2.5 pt-4 w-full md:w-60 text-sm placeholder:hidden
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  value={formData.email}
                  onChange={handleChange}
                />

                <label
                  htmlFor="username"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Email
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="block px-2.5 pb-2.5 pt-4 w-full  text-sm placeholder:hidden
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  placeholder="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Password
                </label>
              </div>
            </div>

            <button className="border border-emerald-400 text-gray-500 font-semibold hover:border-white hover:text-white hover:bg-emerald-500 duration-150 ease-in rounded-md p-2">
              Register
            </button>
          </form>

          <div className="text-xs  flex justify-end pr-4 gap-2">
            Have An Account?
            <Link
              to="/login"
              className="text-blue-600 underline hover:text-blue-700"
            >
              Sing In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
