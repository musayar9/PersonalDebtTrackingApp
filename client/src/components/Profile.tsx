import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import ProfileBreadcrumps from "./ProfileBreadcrumps";
import FormInput from "./FormInput";
import { formattedDate } from "../utils/functions";
import FormTextArea from "./FormTextArea";
import { Country } from "../lib/types";


const Profile = () => {
  const { user } = useAppSelector((state) => state.user);
  const [countries, setCountries] = useState<Country[]>([]);
  const birthDateFormat = formattedDate(user?.user.birthdate);
  const [formData, setFormData] = useState({
    name: user?.user.name || "",
    surname: user?.user.surname || "",
    username: user?.user.username || "",
    email: user?.user.email || "",
    birthdate: birthDateFormat || "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Ülke verileri alınamadı.');
        }
        const data = await response.json();
        const filteredCountries = data.filter((c:Country) =>
          ['Turkey', 'United States', 'United Kingdom', 'France', 'Germany', 'Canada', 'Brazil', 'Australia', 'Japan', 'China'].includes(c.name.common)
        );
        setCountries(filteredCountries);
      } catch (error) {
        console.error('Hata:', error);
      }
    };

    fetchCountries();
  }, []); 

  console.log(countries);

  return (
    <div className="w-full border p-8">
      <ProfileBreadcrumps />

      <div className="flex items-center flex-col justify-center mx-auto max-w-6xl ">
        <div className="relative my-8 ">
          <div className="w-full">
            <div className="flex items-center justify-center">
              <input type="file" hidden accept="image/*" />
              <img
                className="border border-zinc-200 shadow-md p-1 rounded-full h-28 w-28 self-center object-cover"
                src={user?.user.profilePicture}
                alt="profile"
              />
          
            </div>
          </div>
        </div>

        <div>
          <form className="flex flex-col gap-2 p-4  ">
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

            <div className="flex     flex-col   ">
              <FormTextArea
                id="address"
                styles="flex px-2.5 pt-8  text-sm w-full
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                placeholder="Address "
                name="address"
                value={formData.address}
                handleChange={handleChange}
                rows={2}
              />
              {/* <div className="relative">
                <textarea
                  id="address"
                  className="flex px-2.5 pt-8  text-sm w-full
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  placeholder="Address "
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                ></textarea>
                <label
                  htmlFor="description"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Address
                </label>
              </div> */}
            </div>

            <button className="border border-emerald-400 text-gray-500 font-semibold hover:border-white hover:text-white hover:bg-emerald-500 duration-150 ease-in rounded-md p-2">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
