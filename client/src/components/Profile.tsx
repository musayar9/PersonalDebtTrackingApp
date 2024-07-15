import React from 'react'
import { useAppSelector } from '../redux/hooks';

const Profile = () => {
const {user} = useAppSelector((state)=>state.user)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative my-8">
        <div className="w-full">
          <div className="flex items-center justify-center">
            <input
              type="file"
            
              hidden
              accept="image/*"
          
            />
            <img
              className="border border-zinc-200 shadow-md p-1 rounded-full h-28 w-28 self-center object-cover"
              src={user?.user.profilePicture}
      
              alt="profile"
            />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Profile