import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Link } from 'react-router-dom';
import { RiMessage3Fill } from 'react-icons/ri';
import { deleteMessage } from '../../redux/messageSlice';

const MessageNotifications = () => {
const {recieverMessage} = useAppSelector((state)=>state.message)
const dispatch =useAppDispatch()
  console.log(recieverMessage.length)
  return (
    <div className="relative flex items-center">
      {recieverMessage.length > 0 && (
        <div className="absolute flex items-center justify-center -top-2 right-0 w-5 h-5 text-xs bg-blue-500 text-white rounded-full p-1">
          <span>{recieverMessage?.length} </span>
        </div>
      )}

      <Link to="/chat" onClick={()=>dispatch(deleteMessage(""))}>
      
        <RiMessage3Fill className="text-gray-500" size={28} />
      </Link>
    </div>
  );
}

export default MessageNotifications