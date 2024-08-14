import React, { useEffect, useRef, useState } from "react";
// import { useAppSelector } from "../../redux/hooks";
// import InputEmoji from "react-input-emoji";
import moment from "moment";
import "moment/locale/tr";
import {
  ChatType,
  Messages,
  RecievedMessage,
  SendMessage,
  User,
} from "../../lib/types";
import axios from "axios";
import { nanoid } from "nanoid";
import { FaPaperPlane } from "react-icons/fa";

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
  // const { user } = useAppSelector((state) => state.user);

  const [messages, setMessages] = useState<Messages[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  console.log(chat, "chat");


  const [userData, setUserData] = useState<User | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser && chat) {
      const userId = chat?.members.find((id) => id !== currentUser);

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

  // const handleChange = (message:string) => {

  
  //   setNewMessage(message);
  // };

  console.log(error);


  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = {
      _id: nanoid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      senderId: currentUser,
      text: newMessage,
      chatId: chat?._id,
      __v: 0,
    };

    const receiverId: string | undefined = chat?.members.find(
      (id) => id !== currentUser
    );
    // send message tı socket serve
    setSendMessage({ ...message, receiverId });
   

    // send message to database

    try {
      const res = await axios.post("/api/v1/message", message);
      const data = await res.data;
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data.msg);
      } else {
        setError("Request failed");
      }
    }
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // reveive message from parent component

  useEffect(() => {
    console.log("message arrived", receivedMessage);
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
                      ? " bg-gradient-to-r from-cyan-500 to-blue-500 rounded-tl-[1rem] rounded-tr-[1rem] rounded-br-none rounded-bl-[1rem] self-end"
                      : "bg-gradient-to-r from-orange-500 to-yellow-400 rounded-tl-[1rem] rounded-tr-[1rem] rounded-br-[1rem] rounded-bl-none"
                  }  text-white p-2  max-w-96 w-fit flex flex-col gap-2`}
                >
                  <span>{message?.text}</span>
                  <span className="text-[10px] text-white self-end">
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

            <form
              onSubmit={handleSend}
              className="flex items-center space-x-2 gap-2 w-full"
            >
              {/* <InputEmoji
                value={newMessage}
                onChange={handleChange}
                shouldReturn={false}
                shouldConvertEmojiToImage={false}
              /> */}
              <input 
              className="border border-gray-200 p-2 rounded-full focus:outline-none w-full"
              value={newMessage} name="newMessage" onChange={(e)=>setNewMessage(e.target.value)}/>
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
        <span>Tap on a chat to start conversation...</span>
      )}
    </div>
  );
};

export default ChatBox;
