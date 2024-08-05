import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";

import { FaBell } from "react-icons/fa6";

import { useAppSelector } from "../redux/hooks";
import axios from "axios";
import { useEffect, useState } from "react";
import {formatDateTwo, formatPrice} from "../utils/functions";
const Notifications = () => {
  const { user } = useAppSelector((state) => state.user);
   const [upcomingDebt, setUpcomingDebt] =useState()

  useEffect(() => {
    const upcomingDebt = async () => {
      try {
        const res = await axios.get(
          `/api/v1/debt/upcomingDebt/${user?.user._id}`
        );
        const data = await res.data;
        console.log(data, "upcoming");
        setUpcomingDebt(data)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
        } else {
          console.log("request failed");
        }
      }
    };

    upcomingDebt();
  }, []);
  return (
    <div className="relative flex items-center">
      <div className="absolute flex items-center justify-center -top-2 right-0 w-5 h-5 text-xs bg-blue-500 text-white rounded-full p-1">
        <span>{upcomingDebt?.length}</span>
      </div>
      <Dropdown
        className="w-72"
        arrowIcon={false}
        inline
        label={<FaBell className="text-gray-500 z-100" size={28} />}
      >
        <DropdownHeader className="flex items-center justify-between rounded-lg">
          <span className="block text-sm font-bold">Upcoming Debts</span>
          <span className="block truncate text-sm font-medium">
            {formatDateTwo(new Date().toLocaleDateString())}
          </span>
        </DropdownHeader>
        <DropdownItem className="">
          {upcomingDebt.map((item, index)=>(
              <div key={index} className="w-full ">
                <div className="flex items-center justify-between ">
                  <p className="text-xs italic text-slate-400">{item?.lender}</p>
                  <p className="text-xs italic  text-slate-400">{formatDateTwo(item?.paymentDate)}</p>

                </div>
                <div className="flex items-center justify-between my-1 px-2">

                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-xs text-gray-600">{formatPrice(item.paymentAmount)}</p>
                </div>

                < DropdownDivider className="border border-gray-200"/>
              </div>

          ))}
        </DropdownItem>


        <div  className="flex items-center justify-center -mt-1 mb-2">
          <p className="text-xs text-gray-400 ">Upcoming debts are listed here.</p>

        </div>
      </Dropdown>
    </div>
  );
};

export default Notifications;
