import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiMessage3Fill, RiMessage3Line } from "react-icons/ri";

import toast from "react-hot-toast";
import { useEffect, } from "react";
import { Dropdown, DropdownHeader } from "flowbite-react";
import { formatDateTwo } from "../../utils/functions";
import { ChatType, RecievedMessage } from "../../lib/types";
import moment from "moment";
import {
  deleteMessage,
  setAllChats,
  setChatErrorMessage,
  setCurrentChatData,
  setDeleteInComingMessage,
} from "../../redux/messageSlice";
import axios from "axios";
// import ErrorMessage from "../../pages/ErrorMessage";

const MessageNotifications = () => {
  const { user } = useAppSelector((state) => state.user);
  const { inComingMessage, recieverMessage, messageGroup, allChats } =
    useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();



  useEffect(() => {
    if (recieverMessage) {
      const findChat = async () => {
        try {
          const res = await axios.get(
            `/api/v1/chat/find/${recieverMessage.senderId}/${recieverMessage?.receiverId}`
          );
          const data = await res.data;

          dispatch(setCurrentChatData(data));
        } catch (error) {
         if (axios.isAxiosError(error)) {
           dispatch(setChatErrorMessage(error.response?.data.msg));
         } else {
           dispatch(setChatErrorMessage("Request Failed"));
         }
        }
      };

      findChat();
    }
  }, [recieverMessage]);

  useEffect(() => {
    if (user) {
      const getChats = async () => {
        try {
          const res = await axios.get(`/api/v1/chat/${user?.user._id}`);
          const data = await res.data;

          dispatch(setAllChats(data));
          //  navigate("/chat");
        } catch (error) {
         if (axios.isAxiosError(error)) {
           dispatch(setChatErrorMessage(error.response?.data.msg));
         } else {
           dispatch(setChatErrorMessage("Request Failed"));
         }
        }
      };
      getChats();
    }
  }, [user]);


  const sendMessage = async (senderId: string | undefined) => {
    if (allChats) {
      // Dizideki her bir chat için `members` özelliğini kontrol et
      const isChat: ChatType | undefined = allChats.find((chat) =>
        chat.members.includes(senderId || "")
      );

      if (isChat) {
        navigate("/chat");
        dispatch(setCurrentChatData(isChat))
        dispatch(setDeleteInComingMessage([]));
        dispatch(deleteMessage(null));
      }
    }
  };

  const { pathname } = useLocation();
  useEffect(() => {
    if (
      pathname !== "/chat" &&
      inComingMessage?.length >= 0 &&
      recieverMessage !== null
    ) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src={recieverMessage?.profilePicture}
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {recieverMessage?.senderName}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {recieverMessage?.text}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
    }
  }, [recieverMessage]);

  interface MessageGroupMap {
    name: string;
    data: RecievedMessage[] | null;
  }

  const messageGroupMap: MessageGroupMap[] =
    messageGroup?.map((item) => {
      const [name, data] = Object.entries(item)[0];
      return {
        name: name,
        data: data,
      };
    }) || [];




  return (
    <div className="relative flex items-center">
      {inComingMessage.length === 0 && (
        <Link to="/chat" onClick={() => dispatch(setCurrentChatData(null))}>
          <RiMessage3Line className="text-slate-600 z-100 italic" size={28} />{" "}        </Link>
      )}
      {inComingMessage?.length > 0 && (
        <>
          <div className="absolute flex items-center justify-center -top-2 right-0 w-5 h-5 text-xs bg-blue-500 text-white rounded-full p-1">
            <span>{inComingMessage?.length} </span>
          </div>
        </>
      )}

      {inComingMessage.length !== 0 && messageGroup?.length !== 0 && (
        <Dropdown
          className="w-96  rounded-xl border shadow-sm"
          arrowIcon={false}
          inline
          label={<RiMessage3Fill className="text-gray-500 z-100" size={28} />}
        >
          <DropdownHeader className="flex items-center justify-between rounded-lg">
            <span className="block text-sm font-bold text-slate-600">
              InComingMessages
            </span>
            <span className="block truncate text-sm font-medium">
              {formatDateTwo(new Date().toDateString())}
            </span>
          </DropdownHeader>
          <div className=" p-2 space-y-2 border-b border-gray-200">
            {messageGroupMap?.length > 0 ? (
              <>
                {messageGroupMap?.map((item, index) => (
                  <div
                    onClick={() => {
                      if (item.data && item.data[0]) {
                        sendMessage(item.data[0].senderId);
                      } else {
                        // Eğer item.data null ise yapılacak işlemler
                        dispatch(
                          setChatErrorMessage(
                            "item.data is null or item.data[0] does not exist"
                          )
                        );
                      }
                    }}
                    key={index}
                    className="flex items-center justify-between gap-2 p-2 border-b border-slate-200 hover:bg-yellow-100 rounded-md hover:cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      {item.data && item.data.length > 0 ? (
                        <img
                          className="w-12 h-12 rounded-full"
                          src={item.data[0].profilePicture}
                          alt={`Profile picture of ${item.name}`}
                        />
                      ) : (
                        <img src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" /> // veya alternatif bir içerik
                      )}
                      <div className="flex flex-col items-start justify-center">
                        <p className="text-md text-slate-600 font-semibold">
                          {" "}
                          {item.name}
                        </p>
                        <p className="text-sm  italic font-semibold text-slate-400">
                          {item.data?.length} new message
                        </p>
                      </div>
                    </div>
                    <p>
                      {" "}
                      {item.data && item.data.length > 0 && (
                        <p className="text-sm text-slate-500">
                          {moment(
                            item?.data[item?.data.length - 1].createdAt
                          ).fromNow()}
                        </p>
                      )}
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <p className="capitalize text-center text-gray-500 font-semibold">
                you don't have any new messages
              </p>
            )}
          </div>

          {/* <div className="flex items-center  mt-1 mb-2">
            <Link
              className="flex items-center p-2 gap-1 font-semibold group duration-150 ease-in"
              to="/chat"
              onClick={() => {
                dispatch(setDeleteInComingMessage([]));
                dispatch(deleteMessage([]));
                dispatch(setCurrentChatData(null));
              }}
            >
              <RiMessage3Fill
                className="text-gray-500 group-hover:text-blue-600"
                size={28}
              />

              <span className="group-hover:text-blue-600">
                Show All Messages
              </span>
            </Link>
          </div> */}
        </Dropdown>
      )}
    </div>
  );
};

export default MessageNotifications;
