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
      <div className="bg-slate-200 p-3 flex rounded-md  justify-between items-center ">
        <div className="relative flex gap-4">
          <div className="bg-emerald-600 rounded-full absolute left-10 w-4 h-4"></div>
          <img src={userData?.profilePicture} className="w-14 h-14 rounded-full" />
          <div className="flex  flex-col items-start justify-center text-lg font-semibold text-gray-600">
            <span>{userData?.name}</span>
            <span>{userData?.surname}</span>
          </div>
        </div>
      </div>
   
    </>
  );
};

export default Conversation;
