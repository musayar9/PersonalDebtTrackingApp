import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link, useLocation } from "react-router-dom";
import { RiMessage3Fill } from "react-icons/ri";
import { setDeleteInComingMessage } from "../../redux/messageSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { RecievedMessage } from "../../lib/types";

const MessageNotifications = () => {
  const { inComingMessage, recieverMessage } = useAppSelector(
    (state) => state.message
  );
  
  

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname !== "/chat" && inComingMessage?.length >= 0) {
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

  const messageGroup = inComingMessage?.reduce<
    Array<Record<string, RecievedMessage[]>>
  >((acc, person) => {
    const key = person?.senderName;

    // Önceden var olan grup var mı diye kontrol ediyoruz
    const group = acc.find((group) => group[key]);

    if (group) {
      // Eğer grup varsa, mevcut gruba ekliyoruz
      group[key].push(person);
    } else {
      // Eğer grup yoksa, yeni bir grup oluşturup diziye ekliyoruz
      acc.push({ [key]: [person] });
    }

    return acc;
  }, []);

  console.log(messageGroup); // ageGroup dizisinin uzunluğunu verir
  return (
    <div className="relative flex items-center">
      {inComingMessage?.length > 0 && (
        <div className="absolute flex items-center justify-center -top-2 right-0 w-5 h-5 text-xs bg-blue-500 text-white rounded-full p-1">
          <span>{inComingMessage?.length} </span>
        </div>
      )}

      <Link to="/chat" onClick={() => dispatch(setDeleteInComingMessage([]))}>
        <RiMessage3Fill className="text-gray-500" size={28} />
      </Link>
    </div>
  );
};

export default MessageNotifications;
