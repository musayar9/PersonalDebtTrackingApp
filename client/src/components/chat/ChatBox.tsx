import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import InputEmoji from "react-input-emoji";
import moment from "moment";
import "moment/locale/tr";
import { Chat, Messages, User } from "../../lib/types";
import axios from "axios";

interface ChatBoxProps {
  chat: Chat | null;
  currentUser: string | undefined;
  receivedMessage: null;
  setSendMessage: React.Dispatch<React.SetStateAction<null>>;
}

const ChatBox = ({
  chat,
  currentUser,
  receivedMessage,
  setSendMessage,
}: ChatBoxProps) => {
  const { user } = useAppSelector((state) => state.user);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  console.log(chat, "chat");

  const [userData, setUserData] = useState<User | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && chat) {
      const userId = chat?.members.find((id) => id !== user?.user._id);

      const getUserId = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`/api/v1/auth/${userId}`);
          const data = await res.data;
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
    }
  }, [chat, currentUser]);

  console.log("loading", loading);
  console.log(userData, "USERdATA");

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/api/v1/message/${chat?._id}`);
        const data = await res.data;
        setMessages(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.msg);
        } else {
          setError("request failed");
        }
      }
    };

    if (chat !== null) getMessages();
  }, [chat]);

  const handleChange = (message) => {
    setNewMessage(message);
  };
  console.log(messages, "mess");
  console.log(error);

  const scroll = useRef<HTMLDivElement | null>(null);
  const imageRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  return (
    <div className="bg-[rgba(234, 36, 36, 0.64)] rounded-2xl grid  grid-rows-[14vh_60vh_13vh]">
      {chat ? (
        <>
          <div className="pt-4 px-4 pb-0 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <img
                  className="w-12 h-12 rounded-full"
                  src={userData?.profilePicture}
                  alt={userData?.username}
                />
                <div className="flex  flex-col items-start justify-center text-md font-semibold text-gray-600">
                  <span>{userData?.username}</span>
                </div>
              </div>
            </div>

            <hr className="w-[95%] border border-slate-100 mt-5"></hr>
          </div>

          <div className="flex flex-col gap-2 p-6 overflow-scroll ">
            <>
              {messages?.map((message) => (
                <div
                  ref={scroll}
                  key={message?._id}
                  className={`${
                    message?.senderId === currentUser
                      ? "own rounded-tl-[1rem] rounded-tr-[1rem] rounded-br-none rounded-bl-[1rem] self-end"
                      : "custom-gradient rounded-tl-[1rem] rounded-tr-[1rem] rounded-br-[1rem] rounded-bl-none"
                  }  text-white p-2  max-w-96 w-fit flex flex-col gap-2`}
                >
                  <span>{message?.text}</span>
                  <span className="text-xs text-white self-end">
                    {moment(message.createdAt).fromNow()}
                  </span>
                </div>
              ))}
            </>
          </div>
          {/**chat sender */}
          <div className="bg-white flex items-center justify-between h-14 gap-4 p-2 rounded-2xl self-end">
            <div
              onClick={() => imageRef?.current?.click()}
              className="bg-gray-200 rounded-md flex items-center justify-center font-bold cursor-pointer h-[70%] px-4"
            >
              +{" "}
            </div>
            <InputEmoji
              value={newMessage}
              onChange={handleChange}
              shouldReturn={true}
              shouldConvertEmojiToImage={true}
            />
            <div className="flex items-center justify-center text-white border-none rounded-lg custom-gradient h-[70%] px-4 ">
              send{" "}
            </div>
            <input
              ref={imageRef}
              type="file"
              name=""
              id=""
              className="hidden"
            />
          </div>
        </>
      ) : (
        <span>Tap on a chat to start conversation...</span>
      )}
    </div>
  );
};

export default ChatBox;
