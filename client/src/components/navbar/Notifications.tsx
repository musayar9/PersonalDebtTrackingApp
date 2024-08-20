import {
  Dropdown,
  DropdownHeader,
} from "flowbite-react";
import { FaBell } from "react-icons/fa6";

import axios from "axios";
import { useEffect, useState } from "react";

import {IoFileTraySharp} from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UpcomingDebt } from "../../lib/types";
import { formatDateTwo, formatPrice } from "../../utils/functions";

import { setChatErrorMessage } from "../../redux/messageSlice";

const Notifications = () => {
  const { user } = useAppSelector((state) => state?.user);
   const [upcomingDebt, setUpcomingDebt] =useState<UpcomingDebt[]>([])
  const dispatch = useAppDispatch()
  useEffect(() => {
    const upcomingDebt = async () => {
      try {
        const res = await axios.get(
          `/api/v1/debt/upcomingDebt/${user?.user._id}`
        );
        const data:UpcomingDebt[] = await res.data;

        setUpcomingDebt(data)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          dispatch(setChatErrorMessage(error?.response?.statusText)) 
        } else {
      dispatch(setChatErrorMessage("Request Failed")); 
        }
      }
    };

    upcomingDebt();
  }, [user]);


// if (errMsg){
//   return <ErrorMessage message={errMsg}/>
// }
  return (
    <div className="relative flex items-center">
      {upcomingDebt?.length > 0 && (
        <div className="absolute flex items-center justify-center -top-2 right-0 w-5 h-5 text-xs bg-blue-500 text-white rounded-full p-1">
          <span>{upcomingDebt?.length} </span>
        </div>
      )}

      <Dropdown
        className="w-72 rounded-xl border shadow-sm"
        arrowIcon={false}
        inline
        label={<FaBell className="text-gray-500 z-100" size={28} />}
      >
        <DropdownHeader className="flex items-center justify-between rounded-lg">
          <span className="block text-sm font-bold text-slate-600">
            Upcoming Debts
          </span>
          <span className="block truncate text-sm font-medium">
            {formatDateTwo(new Date().toDateString())}
          </span>
        </DropdownHeader>
        <div className=" p-2 space-y-2 border-b border-gray-200">
          {upcomingDebt?.length > 0 ? (
            <>
              {upcomingDebt?.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col  border-b border-slate-200"
                >
                  <div className="flex items-center justify-between ">
                    <p className="text-xs italic text-yellow-400">
                      Lender - {item?.lender}
                    </p>
                    <p className="text-xs italic  text-yellow-400">
                      {formatDateTwo(item?.paymentDate)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between my-1 px-2">
                    <p className="text-xs text-gray-500"> {item.description}</p>
                    <p className="text-xs text-gray-600 font-semibold">
                      {formatPrice(item.paymentAmount)}
                    </p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex items-center justify-center flex-col p-2">
              <IoFileTraySharp size={28} className="text-gray-400" />
              <p className="text-xs font-semibold text-gray-400">
                You do not have any upcoming debts yet.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center mt-1 mb-2">
          <p className="text-xs text-gray-400 ">
            Upcoming debts are listed here.
          </p>
        </div>
      </Dropdown>
    </div>
  );
};

export default Notifications;
