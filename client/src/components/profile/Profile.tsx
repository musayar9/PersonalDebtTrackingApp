import { useEffect, useRef, useState } from "react";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CiCircleInfo } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { formattedDate } from "../../utils/functions";
import { app } from "../../utils/firebase";
import { deleteUser, updateUser } from "../../redux/dataFetch";
import Loading from "../../pages/Loading";
import ProfileBreadcrumps from "./ProfileBreadcrumps";
import FormInput from "../FormInput";
import FormTextArea from "../FormTextArea";
import CountryDropDown from "../CountryDropDown";
import AlertMessage from "../AlertMessage";
import { MdErrorOutline } from "react-icons/md";
const Profile: React.FC = () => {
  const { user, error, userUpdateStatus, userStatus } = useAppSelector(
    (state) => state.user
  );
  // const [countries, setCountries] = useState<Country[]>([]);
  const dispatch = useAppDispatch();
  const birthDateFormat = formattedDate(user?.user?.birthdate);
  const [formData, setFormData] = useState({
    name: user?.user?.name || "",
    surname: user?.user?.surname || "",
    username: user?.user?.username || "",
    email: user?.user?.email || "",
    birthdate: birthDateFormat || "",
    address: user?.user?.address || "",
    phone: user?.user?.phone || "",
    city: user?.user?.city || "",
    district: user?.user?.district || "",
    profilePicture: user?.user?.profilePicture || "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState<string | undefined>("");
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = async (image: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image?.name;
    const storageRef = ref(storage, fileName);
    const uploadImage = uploadBytesResumable(storageRef, image);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const loading = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(loading));
      },
      (error) => {
        setImageError(true), setErrorMessage(error.message);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user?.user?._id) {
      await dispatch(updateUser({ id: user?.user?._id, formData }));
      if (userUpdateStatus === "succeeded") {
        setShowSuccessMsg(user?.message);
      } else if (userUpdateStatus === "failed") {
        setIsError(true);
      }

      setTimeout(() => {
        setShowSuccessMsg("");
        setIsError(false);
      }, 3000);
    } else {
      setErrorMessage("User ID is not available");
    }
  };

  if (userStatus === "loading") {
    return <Loading />;
  }

  const handleDeleteUser = async () => {
    if (user?.user?._id) {
      await dispatch(deleteUser({ id: user?.user?._id }));
      navigate("/login");
    } else {
      setErrorMessage("User ID is not available");
    }
  };
  console.log(errorMessage);
  return (
    <div className="w-full  p-8">
      <ProfileBreadcrumps />

      <div className="flex items-center flex-col justify-center mx-auto max-w-6xl ">
        <div className="relative my-8 ">
          <div className="w-full">
            <div className="flex  flex-col items-center justify-center">
              <input
                type="file"
                hidden
                accept="image/*"
                ref={imageRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
              />
              <img
                className="border border-zinc-200 shadow-md p-1 rounded-full h-28 w-28 self-center object-cover"
                src={formData.profilePicture}
                onClick={() => imageRef.current?.click()}
                alt="profile"
              />

              <p className="text-sm self-center mt-3">
                {imageError ? (
                  <span className="text-red-700">
                    Error uploading image (file size must be less than 2 MB)
                  </span>
                ) : imagePercent > 0 && imagePercent < 100 ? (
                  <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
                ) : imagePercent === 100 ? (
                  <span className="text-green-700">
                    Image uploaded successfully
                  </span>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
        </div>

        <div>
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

            <div className="flex flex-col justify-between md:flex-row gap-2 ">
              <FormInput
                type={"text"}
                id="City"
                name="city"
                placeholder={"city"}
                value={formData.city}
                handleChange={handleChange}
                styles="custom-input peer w-full md:w-60"
              />

              <FormInput
                type={"text"}
                id="District"
                name="district"
                placeholder={"district"}
                value={formData.district}
                handleChange={handleChange}
                styles="custom-input peer w-full md:w-60"
              />
            </div>

            <div className="flex     flex-col   ">
              <FormTextArea
                id="address"
                styles="flex px-2.5 pt-8  text-sm w-full
 bg-transparent rounded-md border-1 border-gray-300 appearance-none 
 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                placeholder="Address "
                name="address"
                value={formData.address}
                handleChange={handleChange}
                rows={2}
              />
            </div>

            <div className="flex items-center">
              <CountryDropDown />

              <div className="w-full ">
                <FormInput
                  type={"text"}
                  id="Phone Number"
                  placeholder="Phone Number"
                  value={formData.phone}
                  name="phone"
                  styles={
                    "block p-2.5 w-full bg-base-100 z-20 text-sm rounded-e-lg border-s-0 border-1 border-gray-300   focus:outline-none focus:ring-0 focus:border-emerald-600"
                  }
                  handleChange={handleChange}
                />
              </div>
            </div>

            <button className="border border-emerald-400 font-semibold hover:border-white hover:text-white hover:bg-emerald-500 duration-150 ease-in rounded-md p-2">
              {userUpdateStatus === "loading" ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="loading loading-infinity loading-xs"></span>
                  <span>Updateting</span>
                </div>
              ) : (
                <span>Update Profile</span>
              )}
            </button>
          </form>

          <div className="flex justify-end pr-4">
            <button
              onClick={handleDeleteUser}
              className=" text-red-600 hover:underline "
            >
              Delete Account
            </button>
          </div>

          {showSuccessMsg && (
            <AlertMessage
              icon={<CiCircleInfo size={28} />}
              message={showSuccessMsg}
              color={"bg-emerald-500"}
            />
          )}

          {isError && error && (
            <AlertMessage
              icon={<MdErrorOutline size={28} />}
              message={error}
              color={"bg-red-500"}
            />
          )}

          {errorMessage && (
            <AlertMessage
              icon={<MdErrorOutline size={28} />}
              message={errorMessage}
              color="bg-red-500"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
