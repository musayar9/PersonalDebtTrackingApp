import { useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import axios from "axios";
import Conversation from "./Conversation";
import ChatBox from "./ChatBox";
// import { Chat } from "../../lib/types";
import { io, Socket } from "socket.io-client";
import {
  ChatType,
  OnlineUsers,
  RecievedMessage,
  SendMessage,
} from "../../lib/types";
import { addMessage, setCurrentChatData } from "../../redux/messageSlice";
import ErrorMessage from "../../pages/ErrorMessage";
import api from "../../utils/api";
import { useTranslation } from "react-i18next";

const Chat = () => {
const {t}= useTranslation()
  const { user } = useAppSelector((state) => state?.user);
  const { currentChatData } = useAppSelector((state) => state.message);

  const dispatch = useAppDispatch();
  const socket = useRef<Socket | null>(null);
  const [chats, setChats] = useState<ChatType[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUsers[] | null>([]);
  const [errMsg, setErrMsg] = useState<string | undefined>("");
  const [sendMessage, setSendMessage] = useState<SendMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [receivedMessage, setReceivedMessage] =
    useState<RecievedMessage | null>(null);

  useEffect(() => {
    if (user) {
      const getChats = async () => {
        try {
          const res = await api.get(`/v1/chat/${user?.user._id}`);
          const data = await res.data;
          setChats(data);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setErrMsg(error.response?.data.msg);
          } else {
            setErrMsg("request failed");
          }
        }
      };
      getChats();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      socket.current = io("ws://localhost:8800");
      socket.current?.emit("new-user-add", user?.user._id);
      socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [user]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current?.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current?.on("recieve-message", (data) => {
      setReceivedMessage(data);
      dispatch(addMessage(data));
    });
  });

  const checkOnlineStatus = (chat: ChatType) => {
    const chatMember = chat?.members.find(
      (member: string) => member !== user?.user._id
    );
    const online = onlineUsers?.find((user) => user?.userId === chatMember);
    return online ? true : false;
  };

  if (errMsg) {
    return <ErrorMessage message={errMsg} />;
  }

  const handleDeleteChat = async ({
    chatId,
  }: {
    chatId: string | undefined;
  }) => {
    try {
      setLoading(true);
      const res = await api.delete(`/v1/chat/${chatId}`);
      const data = await res.data;

      const deleteChat = chats.filter((d) => d?._id !== chatId);
      setChats(deleteChat);
      setLoading(false);
      dispatch(setCurrentChatData(null));
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrMsg(error.response?.statusText);
      } else {
        setErrMsg("Request Failed");
      }
    }
  };

  return (
    <div className="bg-base-300 ">
      <div className=" relative mt-16  p-4 grid md:grid-cols-[22%_auto] gap-4">
        {/* Left-side-chat */}
        <div className="flex flex-col  gap-4 bg-base-100 p-4 md:p-8 rounded-lg">
          <div className=" flex flex-col rounded-2xl p-2 md:min-h-[80vh] gap-4 ">
            <h2 className="text-3xl font-semibold tracking-widest ">{t("chats")}</h2>

            {/* Chat-list */}
            <div className=" flex  md:flex-col gap-2 h-96 overflow-y-auto overflow-x-hidden">
              {/* Example conversation item */}
              {chats?.map((chat, index) => (
                <div
                  key={index}
                  onClick={() => dispatch(setCurrentChatData(chat))}
                >
                  <Conversation
                    data={chat}
                    currentUser={user?.user?._id}
                    online={checkOnlineStatus(chat)}
                    handleDeleteChat={handleDeleteChat}
                    loading={loading}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right-side-chat */}
        <div className=" flex flex-col p-2 gap-4 bg-base-100 rounded-lg">
          {/* Chat-container */}

          <ChatBox
            chat={currentChatData}
            currentUser={user?.user._id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        </div>

        {/* Responsive styling for screen widths <= 768px */}
        <style>
          {`
          @media screen and (max-width: 768px) {
            .Chat {
              grid-template-columns: 16% auto;
            }
            .follower.conversation > div > .name {
              display: none;
            }
          }
        `}
        </style>
      </div>
    </div>
  );
};

export default Chat;
