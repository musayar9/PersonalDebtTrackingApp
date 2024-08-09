
import { FaBirthdayCake, FaMapMarkerAlt, FaPhoneAlt, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const UserDetailInfo = () => {
  return (
    <div className="md:col-span-3  shadow-md rounded-lg ">
      <div className="bg-emerald-400 p-10 rounded-b-none rounded-t-lg "></div>
      <div className=" flex flex-col items-center justify-center  -mt-12 ">
        {" "}
        <img
          className=" w-24 h-24 object-center    rounded-full   top-14 border-2  border-slate-50"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL89JpsflIH8zoQXLuPruQu4It8onem-Z0zA&s"
        />
        <h2 className="text-xl font-semibold  text-gray-600 mt-1">Alice12</h2>
      </div>

      <div className="p-4 space-y-4">
        <p className="flex items-center  gap-2 ">
          <FaUser className="text-gray-500" size={18} />
          <span className="text-gray-500 text-sm  ">Alice Clara</span>
        </p>
        <p className="flex items-center  gap-2 ">
          <FaBirthdayCake className="text-gray-500" size={18} />
          <span className="text-gray-500 text-sm  ">25 Aug 1996</span>
        </p>
        <p className="flex items-center  gap-2 ">
          <MdEmail className="text-gray-500" size={18} />
          <span className="text-gray-500 text-sm  ">aliceClara@gmail.com</span>
        </p>
        <p className="flex items-center gap-2">
          <FaPhoneAlt className="text-gray-500" size={18} />
          <span className="text-gray-500  text-sm ">5399132685</span>
        </p>

        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-gray-500" size={18} />
          <span className="text-gray-500  text-sm ">Beylikdüzü İstanbul</span>
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