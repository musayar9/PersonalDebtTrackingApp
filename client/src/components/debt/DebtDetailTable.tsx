import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ErrorMessage from "../../pages/ErrorMessage";
import { formatDateTwo, formatPrice } from "../../utils/functions";
import { useAppSelector } from "../../redux/hooks";
import Loading from "../../pages/Loading";
import api from "../../utils/api";


interface PaymentPlan {
  _id: string;
  paymentDate: string;
  paymentAmount: number;
  paymentStatus: boolean;
}

const DebtDetailTable = ({ id }: { id: string | undefined }) => {
  const { userId } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const [debt, setDebt] = useState<PaymentPlan[]>([]);
  const {theme} = useAppSelector((state)=>state.theme)

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchDebtId = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/v1/debt/paymentPlan/${id}`);

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
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (errMsg) {
    return <ErrorMessage message={errMsg} />;
  }

  return (
    <div className={`overflow-x-auto my-10 rounded-md ${theme === "light" ? "border border-slate-200":"bg-base-200"}`}>
      <table className="table ">
        <thead className="text-base-content">
          <tr>
            <th></th>
            <th>Debt Date</th>
            <th>Amount</th>
            <th>Status</th>

            {userId === user?.user._id && <th>Pay</th>}
          </tr>
        </thead>
        <tbody>
          {debt?.map((item: PaymentPlan, index: number) => (
            <tr key={item._id} className="">
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

              {userId === user?.user._id && (
                <td className=" font-semibold">
                  {item.paymentStatus ? (
                    <button
                      disabled={item.paymentStatus}
                      className="btn btn-xs text-blue-400 cursor-not-allowed"
                    >
                      Pay Debt
                    </button>
                  ) : (
                    <Link
                      className="text-blue-600 btn btn-xs "
                      to={`/debts/payment_debt/${id}/debt/${item._id}`}
                    >
                      Pay Debt
                    </Link>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DebtDetailTable;
