import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import "moment/locale/tr";
import { ChatType, RecievedMessage, SendMessage, User } from "../../lib/types";
import axios from "axios";
import { nanoid } from "nanoid";
import { FaPaperPlane } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "moment-timezone";
import { BiSolidMessageDetail } from "react-icons/bi";
import { setChatErrorMessage } from "../../redux/messageSlice";
import api from "../../utils/api";
import { useTranslation } from "react-i18next";

interface ChatBoxProps {
  chat: ChatType | null;
  currentUser: string | undefined;
  receivedMessage: RecievedMessage | null;
  setSendMessage: React.Dispatch<React.SetStateAction<SendMessage | null>>;
}

const ChatBox = ({
  chat,
  currentUser,
  receivedMessage,
  setSendMessage,
}: ChatBoxProps) => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.user);
  const [messages, setMessages] = useState<RecievedMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (currentUser && chat) {
      const userId = chat?.members.find((id) => id !== currentUser);

      const getUserId = async () => {
        try {
          setLoading(true);
          const res = await api.get(`/v1/auth/${userId}`);
          const data = await res.data;
          setLoading(false);
          setUserData(data);
        } catch (error) {
          setLoading(false);
          if (axios.isAxiosError(error)) {
            dispatch(setChatErrorMessage(error.response?.data.msg));
          } else {
            dispatch(setChatErrorMessage("Request Failed"));
          }
        }
      };
      getUserId();
    }
  }, [chat, currentUser]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await api.get(`/v1/message/${chat?._id}`);
        const data = await res.data;
        setMessages(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          dispatch(setChatErrorMessage(error.response?.data.msg));
        } else {
          dispatch(setChatErrorMessage("Request Failed"));
        }
      }
    };

    if (chat !== null) getMessages();
  }, [chat]);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = {
      _id: nanoid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      senderId: currentUser,
      profilePicture: user?.user?.profilePicture,
      senderName: user?.user.name + " " + user?.user.surname,
      text: newMessage,
      chatId: chat?._id,
      __v: 0,
    };

    const receiverId: string | undefined = chat?.members.find(
      (id) => id !== currentUser
    );

    setSendMessage({ ...message, receiverId });

    try {
      const res = await api.post("/v1/message", message);
      const data = await res.data;

      setMessages([...messages, data]);

      setNewMessage("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setChatErrorMessage(error.response?.data.msg));
      } else {
        dispatch(setChatErrorMessage("Request Failed"));
      }
    }
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (receivedMessage !== null && receivedMessage?.chatId === chat?._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

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
                <div className="flex  flex-col items-start justify-center text-md font-semibold ">
                  <span>{userData?.username}</span>
                </div>
              </div>
              {loading && <>loading...</>}
            </div>

            <hr className="w-[95%] border  mt-5"></hr>
          </div>

          <div className="flex flex-col gap-2 p-6 overflow-scroll ">
            <>
              {messages?.map((message, index) => (
                <div
                  ref={scroll}
                  key={index}
                  className={`${
                    message?.senderId === currentUser
                      ? " bg-gradient-to-r from-cyan-500 to-blue-500 rounded-tl-[1rem] rounded-tr-[1rem] rounded-br-none rounded-bl-[1rem] self-end"
                      : "bg-gradient-to-r from-orange-500 to-yellow-400 rounded-tl-[1rem] rounded-tr-[1rem] rounded-br-[1rem] rounded-bl-none"
                  }  text-white p-2  max-w-96 w-fit flex flex-col gap-2`}
                >
                  <span className="text-xs p-1">{message?.text}</span>
                  <span className="text-[10px] text-white self-end">
                    {moment(message.createdAt)
                      .tz("Europe/Istanbul")
                      .format("HH:mm")}
                  </span>
                </div>
              ))}
            </>
          </div>
          {/**chat sender */}
          <div className="bg-base-300 flex items-center justify-between h-14 gap-4 p-2 rounded-2xl self-end">
            <div
              onClick={() => imageRef?.current?.click()}
              className="bg-base-100 rounded-md flex items-center justify-center font-bold cursor-pointer h-[70%] px-4"
            >
              +{" "}
            </div>

            <form
              onSubmit={handleSend}
              className="flex items-center space-x-2 gap-2 w-full"
            >
              <input
                className="border bg-base-100 p-2 rounded-full focus:outline-none w-full"
                value={newMessage}
                name="newMessage"
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                className="flex items-center justify-center text-white border-none rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 h-[70%] -ml-2 p-2 "
                type="submit"
              >
                <FaPaperPlane />
              </button>
            </form>

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
        <div className={"flex flex-col items-center justify-center  h-[50vh]"}>
          <BiSolidMessageDetail size={64} className={"text-slate-400"} />
          <span
            className={
              "text-2xl font-semibold text-slate-500 tracking-widest text-center"
            }
          >
            {t("chat_warning")}
          </span>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
