import React from "react";

import { FaCity, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const UserDetail = () => {
  return (
    <div className="max-w-6xl mx-auto my-8">
      <div className="grid gap-4 grid-cols-10">
        <div className="col-span-3  shadow-md rounded-lg ">
          <div className="bg-emerald-400 p-10 rounded-b-none rounded-t-lg "></div>
          <div className=" flex flex-col items-center justify-center  -mt-12 ">
            {" "}
            <img
              className=" w-24 h-24 object-center    rounded-full   top-14 border-2  border-slate-50"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL89JpsflIH8zoQXLuPruQu4It8onem-Z0zA&s"
            />
            <h2 className="text-xl font-semibold text-gray-600 mt-1">
              Alice Clara
            </h2>
          </div>

          <div className="p-4 space-y-2">
            <p className="flex items-center  gap-2 ">
              <MdEmail className="text-gray-500" size={20} />
              <span className="text-gray-500 text-semibold">
                aliceClara@gmail.com
              </span>
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-gray-500" size={20} />
              <span className="text-gray-500 text-semibold">5399132685</span>
            </p>
            <div className="mt-8">
              <button className="btn btn-sm btn-circle mt-8 w-full text-rose-500 flex items-center">
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-7 ">
          <div className="shadow-md">
            <div className="flex items-center  p-8">
              <h6 className="flex text-2xl font-semibold text-gray-600  items-center gap-2">
                <FaCity /> City :
              </h6>
              <p className="pl-2 mt-1 text-xl text-gray-500 font-semibold">İstanbul</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
