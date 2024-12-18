import { Dropdown, DropdownHeader } from "flowbite-react";

import axios from "axios";
import { useEffect, useState } from "react";

import { IoFileTraySharp } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { UpcomingDebt } from "../../lib/types";
import { formatDateTwo, formatPrice } from "../../utils/functions";

import { setChatErrorMessage } from "../../redux/messageSlice";
import { FaRegBell } from "react-icons/fa";
import api from "../../utils/api";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const { t, i18n } = useTranslation();
  console.log(i18n, "i18n notification");

  const { user } = useAppSelector((state) => state?.user);
  const [upcomingDebt, setUpcomingDebt] = useState<UpcomingDebt[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const upcomingDebt = async () => {
      try {
        const res = await api.get(`/v1/debt/upcomingDebt/${user?.user._id}`);
        const data: UpcomingDebt[] = await res.data;

        setUpcomingDebt(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          dispatch(setChatErrorMessage(error?.response?.statusText));
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
        className={`w-72 rounded-xl  shadow-sm bg-base-100`}
        arrowIcon={false}
        inline
        label={<FaRegBell className=" z-100" size={28} />}
      >
        <DropdownHeader className="flex items-center justify-between rounded-lg">
          <span className="block text-sm font-semibold text-gray-500">
            {t("upcoming_debts")}
          </span>
          <span className="block truncate text-sm font-medium text-gray-500">
            {formatDateTwo({
              date: new Date().toDateString(),
              language: i18n.language,
            })}
          </span>
        </DropdownHeader>
        <div className=" p-2 space-y-2 border-b ">
          {upcomingDebt?.length > 0 ? (
            <>
              {upcomingDebt?.map((item, index) => (
                <div key={index} className="w-full flex flex-col  border-b ">
                  <div className="flex items-center justify-between ">
                    <p className="text-xs italic text-yellow-400">
                      {t("lender")} - {item?.lender}
                    </p>
                    <p className="text-xs italic  text-yellow-400">
                      {formatDateTwo({
                        date: item?.paymentDate,
                        language: i18n.language,
                      })}
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
                {t("upcoming_debts_warning")}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center mt-1 mb-2">
          <p className="text-xs text-gray-400 ">{t("upcoming_debts_info")}</p>
        </div>
      </Dropdown>
    </div>
  );
};

export default Notifications;
