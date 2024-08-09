import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../pages/Loading";
import ErrorMessage from "../../pages/ErrorMessage";
import UserDetailInfo from "./UserDetailInfo";
import { User } from "../../lib/types";
import UserDetailDebtInfo from "./UserDetailDebtInfo";

const UserDetail = () => {
  const { userId } = useParams();
  console.log(userId, "params");

  const [userDetail, setUserDetail] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserId = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/v1/auth/${userId}`);
        const data: User = await res.data;
        setLoading(false);
        setUserDetail(data);
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.msg);
        } else {
          setError("Request Failed");
        }
      }
    };

    getUserId();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  console.log(userDetail, "userDetail");
  return (
    <div className="max-w-6xl mx-auto my-8">
      <div className="grid gap-4 p-4  md:grid-cols-10">
        {/* <div className="md:col-span-3  shadow-md rounded-lg ">
          <div className="bg-emerald-400 p-10 rounded-b-none rounded-t-lg "></div>
          <div className=" flex flex-col items-center justify-center  -mt-12 ">
            {" "}
            <img
              className=" w-24 h-24 object-center    rounded-full   top-14 border-2  border-slate-50"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL89JpsflIH8zoQXLuPruQu4It8onem-Z0zA&s"
            />
            <h2 className="text-xl font-semibold  text-gray-600 mt-1">
              Alice12
            </h2>
          </div>

          <div className="p-4 space-y-4">
            <p className="flex items-center  gap-2 ">
              <FaUser className="text-gray-500" size={18} />
              <span className="text-gray-500 text-sm  ">Alice Clara</span>
            </p>
            <p className="flex items-center  gap-2 ">
              <FaBirthdayCake className="text-gray-500" size={18} />
              <span className="text-gray-500 text-sm  ">25 Aug 1996</span>
            </p>
            <p className="flex items-center  gap-2 ">
              <MdEmail className="text-gray-500" size={18} />
              <span className="text-gray-500 text-sm  ">
                aliceClara@gmail.com
              </span>
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-gray-500" size={18} />
              <span className="text-gray-500  text-sm ">5399132685</span>
            </p>

            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-500" size={18} />
              <span className="text-gray-500  text-sm ">
                Beylikdüzü İstanbul
              </span>
            </p>
            <div className="mt-8">
              <button className="btn btn-sm btn-circle mt-8 w-full text-rose-500 flex items-center">
                Delete
              </button>
            </div>
          </div>
        </div> */}
        <UserDetailInfo userDetail={userDetail} />

        <UserDetailDebtInfo userDetail={userDetail} />
      </div>
    </div>
  );
};

export default UserDetail;
