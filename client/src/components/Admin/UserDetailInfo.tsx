
import { FaBirthdayCake, FaMapMarkedAlt, FaMapMarkerAlt, FaPhoneAlt, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { User } from '../../lib/types';
import { formatDateTwo } from '../../utils/functions';

const UserDetailInfo= ({userDetail}:{userDetail:User | null}) => {
  return (
    <div className="md:col-span-3  shadow-md rounded-lg ">
      <div className="bg-emerald-400 p-10 rounded-b-none rounded-t-lg "></div>
      <div className=" flex flex-col items-center justify-center  -mt-12 ">
        {" "}
        <img
          className=" w-24 h-24 object-center    rounded-full   top-14 border-2  border-slate-50"
          src={userDetail?.profilePicture} alt={userDetail?.username}
        />
        <h2 className="text-xl font-semibold  text-gray-600 mt-1">
          {userDetail?.username}
        </h2>
      </div>

      <div className="p-4 space-y-4">
        <p className="flex items-center  gap-2 ">
          <FaUser className="text-gray-500" size={18} />
          <span className="text-gray-500 text-sm  ">
            {userDetail?.name} {userDetail?.surname}
          </span>
        </p>
        <p className="flex items-center  gap-2 ">
          <FaBirthdayCake className="text-gray-500" size={18} />
          <span className="text-gray-500 text-sm  ">
            {formatDateTwo(userDetail?.birthdate)}
          </span>
        </p>
        <p className="flex items-center  gap-2 ">
          <MdEmail className="text-gray-500" size={18} />
          <span className="text-gray-500 text-sm  ">{userDetail?.email}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaPhoneAlt className="text-gray-500" size={18} />
          <span className="text-gray-500  text-sm ">{userDetail?.phone}</span>
        </p>

        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-gray-500" size={18} />
          <span className="text-gray-500  text-sm ">
            {userDetail?.district}, {userDetail?.city}
          </span>
        </p>

        <p className="flex items-center gap-2">
          <FaMapMarkedAlt className="text-gray-500" size={18} />
          <span className="text-gray-500  text-sm ">{userDetail?.address}</span>
        </p>
        <div className="mt-8">
          <button className="btn btn-sm btn-circle mt-8 w-full text-rose-500 flex items-center">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetailInfo