import { useEffect, useState } from "react";
import { ChatType, User } from "../../lib/types";
import axios from "axios";
import { FaTrashCan } from "react-icons/fa6";
import { useAppDispatch } from "../../redux/hooks.ts";
import { setChatErrorMessage } from "../../redux/messageSlice.ts";
import api from "../../utils/api.ts";
import { useTranslation } from "react-i18next";

interface ConversationProps {
  data: ChatType;
  currentUser: string | undefined;
  online: boolean;
  handleDeleteChat: (params: { chatId: string | undefined }) => Promise<void>;
  loading: boolean;
}

const Conversation = ({
  data,
  currentUser,
  online,
  handleDeleteChat,
  loading,
}: ConversationProps) => {
const {t}= useTranslation()
  const [userData, setUserData] = useState<User | null>(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);

    const getUserId = async () => {
      try {
        const res = await api.get(`/v1/auth/${userId}`);
        const data: User = await res.data;
        setUserData(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          dispatch(setChatErrorMessage(error.response?.data.msg));
        } else {
          dispatch(setChatErrorMessage("request failed"));
        }
      }
    };

    getUserId();
  }, [data, currentUser]);



  return (
    <>
      {loading && <p>loading....</p>}
      <div className="bg-base-200 group  hover:bg-base-300 transition-all cursor-pointer duration-100 ease-linear m-1 p-2 flex rounded-md  justify-between items-center ">
        <div className="relative flex flex-col md:flex-row gap-4 ">
          {online && (
            <div className="bg-emerald-500 rounded-full absolute left-8 w-3 h-3"></div>
          )}

          <img
            src={userData?.profilePicture}
            className="w-12 h-12 rounded-full "
            alt={"img"}
          />
          <div className="  flex  flex-col items-start justify-center  font-semibold ">
            <span className="hidden md:flex text-xs">
              {userData?.name} {userData?.surname}
            </span>
            <span
              className={`${
                online ? "text-emerald-500" : ""
              } text-sm font-normal flex `}
            >
              {online ?`${t("online")}` : `${t("offline")}`}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <button
            onClick={() => handleDeleteChat({ chatId: data?._id })}
            className="hidden md:flex ps-2 translate-x-8 duration-150 ease-in opacity-0 group-hover:opacity-80 group-hover:translate-x-0"
          >
            <FaTrashCan className="hover:text-red-600 " size={24} />
          </button>
        </div>
      </div>
      <hr className="my-4 w-full hidden md:flex"></hr>
    </>
  );
};

export default Conversation;
