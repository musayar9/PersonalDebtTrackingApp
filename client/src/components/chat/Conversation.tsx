import React, { useEffect, useState } from "react";
import { Chat, User } from "../../lib/types";
import axios from "axios";

interface ConversationProps {
  data: Chat;
  currentUser: string | undefined;
}

const Conversation = ({ data, currentUser }: ConversationProps) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);

    const getUserId = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/v1/auth/${userId}`);
        const data: User = await res.data;
        setLoading(false);
        setUserData(data);
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
  
  console.log(loading)
  console.log(error);

  return (
    <>
      <div className="bg-slate-50 hover:bg-slate-200 transition-all cursor-pointer duration-100 ease-linear m-1 p-2 flex rounded-md  justify-between items-center ">
        <div className="relative flex gap-4">
          <div className="bg-emerald-500 rounded-full absolute left-8 w-3 h-3"></div>
          <img src={userData?.profilePicture} className="w-12 h-12 rounded-full" />
          <div className="flex  flex-col items-start justify-center text-md font-semibold text-gray-600">
            <span>{userData?.name} {userData?.surname}</span>
            <span className="text-sm font-normal text-gray-500">Online</span>
          </div>
        </div>
      </div>
   <hr className="my-4 w-full "></hr>
    </>
  );
};

export default Conversation;
