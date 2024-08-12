import React from "react";
import { useAppSelector } from "../../redux/hooks";
import InputEmoji from "react-input-emoji";
const ChatBox = () => {
  const { user } = useAppSelector((state) => state.user);
    const handleChange = ()=>{
    }

  return (
    <div className="bg-[rgba(234, 36, 36, 0.64)] rounded-2xl grid  grid-rows-[14vh_60vh_13vh]">
      <>
        <div className="pt-4 px-4 pb-0 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <img
                className="w-12 h-12 rounded-full"
                src={user?.user.profilePicture}
                alt={user?.user.username}
              />
              <div className="flex  flex-col items-start justify-center text-md font-semibold text-gray-600">
                <span>{user?.user.username}</span>
              </div>
            </div>
          </div>

          <hr className="w-[95%] border border-slate-100 mt-5"></hr>
        </div>

        <div className="flex flex-col gap-2 p-6 overflow-scroll ">
          <>
            <div className="custom-gradient text-white p-2 rounded-tl-[1rem] rounded-tr-[1rem] rounded-br-[1rem] rounded-bl-none max-w-96 w-fit flex flex-col gap-2">
              <span>Hello</span>
              <span className="text-xs text-white self-end">
                {new Date().toDateString()}
              </span>
            </div>
          </>
        </div>
        {/**chat sender */}
        <div className="bg-white flex items-center justify-between h-14 gap-4 p-2 rounded-2xl self-end">
          <div className="bg-gray-200 rounded-md flex items-center justify-center font-bold cursor-pointer h-[70%] px-4">
          
            +{" "}
          </div>
          <InputEmoji value="Hello" onChange={handleChange} />
          <div className="flex items-center justify-center text-white border-none rounded-lg custom-gradient h-[70%] px-4 ">
            send{" "}
          </div>
          <input type="file" name="" id="" className="hidden" />
        </div>
      </>
    </div>
  );
};

export default ChatBox;
