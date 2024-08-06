import React, { useEffect, useState } from "react";

import axios from "axios";

import ErrorMessage from "../../pages/ErrorMessage";
import { DebtData } from "../../lib/types";
import { formatDateTwo, formatPercentage, formatPrice } from "../../utils/functions";

import { Audio } from "react-loader-spinner";

const DebtDetailItem = ({ id }: { id: string | undefined }) => {
  const [debt, setDebt] = useState<DebtData>();
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");



  useEffect(() => {
    const fetchDebtId = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/debt/getDebt/${id}`);
        const data: DebtData = await res.data;
        setDebt(data);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrMsg(error.response?.data.msg);
        } else {
          setErrMsg("Request failed");
        }
      }
    };

    fetchDebtId();
  }, []);
  
  if(loading){
    return (
      <div className="ml-4 hidden">
        <Audio
          height="75"
          width="75"
          color="#4fa94d"
          ariaLabel="audio-loading"
          wrapperStyle={{}}
          wrapperClass="wrapper-class"
          visible={true}
        />
      </div>
    ); 
  }
  
  if (errMsg) {
    return <ErrorMessage message={errMsg} />;
  }
  
  return (
    <div>
      <div className="border my-10 border-slate-200 rounded-md  ">
        <div className="grid grid-cols-1 gap-4 p-3">
          <p className="text-gray-500 flex items-center justify-between text-xs border-b p-2 border-neutral-300">
            <span>Payment Status:</span>
            <span
              className={`${
                debt?.paymentStatus === "Unpaid"
                  ? "bg-rose-700"
                  : debt?.paymentStatus === "Partially Paid"
                  ? "bg-yellow-400"
                  : debt?.paymentStatus === "Paid" && "bg-green-500"
              }  } px-1 py-1.5 rounded-sm text-center text-white text-xs`}
            >
              {debt?.paymentStatus}
            </span>
          </p>
          <p className="text-gray-500 flex items-center justify-between text-xs border-b p-2 border-neutral-300">
            <span>Lender:</span>
            <span className="font-semibold">{debt?.lender}</span>
          </p>
          <p className="text-gray-500 flex items-center justify-between text-xs border-b p-2 border-neutral-300">
            <span>Borrower:</span>
            <span className="font-semibold">{debt?.borrower}</span>
          </p>
          <p className="text-gray-500 flex items-center justify-between text-xs border-b p-2 border-neutral-300">
            <span>Debt Amount:</span>
            <span className="font-semibold">
              {formatPrice(debt?.debtAmount)}
            </span>
          </p>

          <p className="text-gray-500 flex items-center justify-between text-xs border-b p-2 border-neutral-300">
            <span>Interest Rate:</span>
            <span className="font-semibold">
              {formatPercentage(debt?.interestRate)}
            </span>
          </p>

          <p className="text-gray-500 flex items-center justify-between text-xs border-b p-2 border-neutral-300">
            <span>Amount:</span>
            <span className="font-semibold">{formatPrice(debt?.amount)}</span>
          </p>

          <p className="text-gray-500 flex items-center justify-between text-xs border-b p-2 border-neutral-300">
            <span>Interest Rate:</span>
            <span className="font-semibold">
              {formatDateTwo(debt?.paymentStart)}
            </span>
          </p>

          <p className="text-gray-500 flex items-center justify-between text-xs border-b p-2 border-neutral-300">
            <span>Installment:</span>
            <span className="font-semibold">{debt?.installment}</span>
          </p>

          <p className="text-gray-500 flex items-center justify-between text-xs border-b p-2 border-neutral-300">
            <span>Description:</span>
            <span className="font-semibold">{debt?.description}</span>
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default DebtDetailItem;
