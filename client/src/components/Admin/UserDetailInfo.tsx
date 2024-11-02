import {
  FaBirthdayCake,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { User } from "../../lib/types";
import { formatDateTwo } from "../../utils/functions";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../pages/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCurrentChatData } from "../../redux/messageSlice";
import Loading from "../../pages/Loading";
import api from "../../utils/api";
import { useTranslation } from "react-i18next";

const UserDetailInfo = ({ userDetail }: { userDetail: User | null }) => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.user);
  const { currentChatData } = useAppSelector((state) => state.message);
  const { theme } = useAppSelector((state) => state.theme);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [findChat, setFindChat] = useState(null);
  const dispatch = useAppDispatch();
  const handleDeleteUser = async ({ id }: { id: string | undefined }) => {
    try {
      const res = await api.delete(`/v1/auth/${id}`);
      const data = await res.data;
      navigate("/dashboard?tab=users");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrMsg(error.response?.data.msg);
      } else {
        setErrMsg("Request failed");
      }
    }
  };

  useEffect(() => {
    if (user && userDetail) {
      const findChat = async () => {
        try {
          const res = await api.get(
            `/v1/chat/find/${user?.user?._id}/${userDetail?._id}`
          );
          const data = await res.data;
          setFindChat(data);
          dispatch(setCurrentChatData(data));
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setErrMsg(error.response?.data.msg);
          } else {
            setErrMsg("Request failed");
          }
        }
      };

      findChat();
    }
  }, [user, userDetail, dispatch]);

  if (errMsg) {
    return <ErrorMessage message={errMsg} />;
  }

  const chat = {
    senderId: user?.user._id,
    receiverId: userDetail?._id,
  };
  const sendMessage = async () => {
    try {
      setLoading(false);
      const res = await api.post("/v1/chat", chat);
      const data = await res.data;
      if (findChat === null) {
        dispatch(setCurrentChatData(data));
      }
      setLoading(true);
      navigate("/chat");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrMsg(error.response?.data.msg);
      } else {
        setErrMsg("Request Failed");
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="md:col-span-3  ">
      <div
        className={`shadow-md rounded-lg  ${theme === "dark" && "bg-base-200"}`}
      >
        <div className="bg-emerald-400 p-10 rounded-b-none rounded-t-lg "></div>
        <div className=" flex flex-col items-center justify-center  -mt-12 ">
          {" "}
          <img
            className=" w-24 h-24 object-center    rounded-full   top-14 border-2  border-slate-50"
            src={userDetail?.profilePicture}
            alt={userDetail?.username}
          />
          <h2 className="text-xl font-semibold   mt-1">
            {userDetail?.username}
          </h2>
        </div>

        <div className="p-4 space-y-4">
          <p className="flex items-center  gap-2 ">
            <FaUser className="text-gray-500" size={18} />
            <span className="text-gray-500 text-sm  ">
              {userDetail?.name} {userDetail?.surname}
            </span>
          </p>
          <p className="flex items-center  gap-2 ">
            <FaBirthdayCake className="text-gray-500" size={18} />
            <span className="text-gray-500 text-sm  ">
              {formatDateTwo(userDetail?.birthdate)}
            </span>
          </p>
          <p className="flex items-center  gap-2 ">
            <MdEmail className="text-gray-500" size={18} />
            <span className="text-gray-500 text-sm  ">{userDetail?.email}</span>
          </p>
          <p className="flex items-center gap-2">
            {userDetail?.phone && (
              <>
                <FaPhoneAlt className="text-gray-500" size={18} />
                <span className="text-gray-500  text-sm ">
                  {userDetail?.phone}
                </span>
              </>
            )}
          </p>

          <p className="flex items-center gap-2">
            {userDetail?.city && userDetail?.district && (
              <>
                <FaMapMarkerAlt className="text-gray-500" size={18} />
                <span className="text-gray-500  text-sm ">
                  {userDetail?.district}, {userDetail?.city}
                </span>
              </>
            )}
          </p>

          <p className="flex items-center gap-2">
            {userDetail?.address && (
              <>
                <FaMapMarkedAlt className="text-gray-500" size={18} />
                <span className="text-gray-500  text-sm ">
                  {userDetail?.address}
                </span>
              </>
            )}
          </p>
          {user?.user._id !== userDetail?._id && (
            <div className="mt-8">
              {currentChatData === null ? (
                <button
                  onClick={sendMessage}
                  className={` btn btn-sm btn-circle mt-8 w-full text-emerald-500 flex items-center bg-base-300`}
                >
                  {t("send_message")}
                </button>
              ) : (
                <Link
                  className="
               btn btn-sm btn-circle mt-8 w-full text-emerald-500 flex items-center bg-base-300"
                  to={`/chat`}
                >
                  {t("send_message")}
                </Link>
              )}
            </div>
          )}
          {user?.user?.isAdmin && (
            <div className="mt-2">
              <button
                disabled={userDetail?.isAdmin}
                onClick={() => handleDeleteUser({ id: userDetail?._id })}
                className={` btn btn-sm btn-circle mt-2 w-full text-rose-500 flex items-center bg-base-300`}
              >
                {t("delete")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailInfo;
