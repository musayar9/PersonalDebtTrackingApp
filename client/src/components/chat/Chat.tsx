import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { useAppSelector } from "../../redux/hooks";
import axios from "axios";
import Conversation from "./Conversation";
import ChatBox from "./ChatBox";
// import { Chat } from "../../lib/types";
import { io, Socket } from "socket.io-client";

const Chat = () => {
  const { user } = useAppSelector((state) => state.user);
  const socket = useRef<Socket | null>(null);
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  
    useEffect(() => {
    if(user){
    
       const getChats = async () => {
         try {
           const res = await axios.get(`/api/v1/chat/${user?.user._id}`);
           const data = await res.data;
           setChats(data);
         } catch (error) {
           if (axios.isAxiosError(error)) {
             console.log(error.response?.data.msg);
           } else {
             console.log("request failed");
           }
         }
       };
       getChats();
    }
    
   
    }, []);
  
    useEffect(() => {
      socket.current = io("ws://localhost:8800");
      socket.current?.emit("new-user-add", user?.user?._id);
      socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
        console.log("oni", onlineUsers);
      });
    }, [user]);

  console.log(chats, "chatd");

  // const checkOnlineStatus = (chat:Chat)=>{
  //     const chatMember = chat.members.find((member)=>member !== user?.user._id);

  // }


  
  console.log("online", onlineUsers)
  return (
    <div>
      <div className="bg-slate-200 relative p-4 grid grid-cols-[22%_auto] gap-4">
        {/* Left-side-chat */}
        <div className="flex flex-col gap-4 bg-white p-8 rounded-lg">
          <div className=" flex flex-col rounded-2xl  min-h-[80vh] gap-4 bg-[rgba(255, 255, 255, 0.64)]">
            <h2 className="text-2xl text-gray-600">Chats</h2>

            {/* Chat-list */}
            <div className=" flex flex-col gap-2">
              {/* Example conversation item */}
              {chats?.map((chat) => (
                <div onClick={() => setCurrentChat(chat)}>
                  <Conversation data={chat} currentUser={user?.user?._id} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right-side-chat */}
        <div className=" flex flex-col p-2 gap-4 bg-white rounded-lg">
          {/* Chat-container */}

          <ChatBox
            chat={currentChat}
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
