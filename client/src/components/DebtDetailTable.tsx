import React, { useState, useEffect } from "react";


import axios from "axios";
import { formatDateTwo, formatPrice } from "../utils/functions";
import { Link } from "react-router-dom";

interface PaymentPlan {
  _id: string;
  paymentDate: string;
  paymentAmount: number;
  paymentStatus: boolean;
}

const DebtDetailTable = ({ id }: { id: string | undefined }) => {
  //   const { id } = useParams();
  const [debt, setDebt] = useState<PaymentPlan[]>([]);

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  console.log("loading", loading);
  console.log("errmsg", errMsg);

  useEffect(() => {
    const fetchDebtId = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/debt/paymentPlan/${id}`);

        const data: PaymentPlan[] = await res.data;
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

  console.log(debt);
  return (
    <div className="overflow-x-auto my-10  border border-slate-200 rounded-md">
      <table className="table table-zebra">
        <thead className="bg-gray-50">
          <tr>
            <th></th>
            <th>Debt Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Pay</th>
          </tr>
        </thead>

        {debt?.map((item: PaymentPlan, index: number) => (
          <tr key={item._id} className="text-gray-500">
            <th>{index + 1}</th>
            <td>{formatDateTwo(item.paymentDate)}</td>
            <td>{formatPrice(item.paymentAmount)}</td>
            <td>
              {item.paymentStatus ? (
                <span className="text-emerald-600">Paid</span>
              ) : (
                <span className="text-red-600">Unpaid</span>
              )}
            </td>
            <td className=" font-semibold">
              {item.paymentStatus ? (
                <span className="text-blue-400 cursor-not-allowed">Pay Debt</span>
              ) : (
                <Link
                  className="text-blue-600"
                  to={`/dashboard/payment_debt/${id}/debt/${item._id}`}
                >
                  Pay Debt
                </Link>
              )}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default DebtDetailTable;
