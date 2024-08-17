import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ErrorMessage from "../../pages/ErrorMessage";
import { formatDateTwo, formatPrice } from "../../utils/functions";
import { Audio } from "react-loader-spinner";
import { useAppSelector } from "../../redux/hooks";
// import { useAppSelector } from "../../redux/hooks";

interface PaymentPlan {
  _id: string;
  paymentDate: string;
  paymentAmount: number;
  paymentStatus: boolean;
}

const DebtDetailTable = ({ id }: { id: string | undefined }) => {
    const { userId } = useParams();
  const {user} = useAppSelector((state)=>state.user)
  const [debt, setDebt] = useState<PaymentPlan[]>([]);

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  


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
  }, [id]);

   if (loading) {
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
    <div className="overflow-x-auto my-10  border border-slate-200 rounded-md">
      <table className="table ">
        <thead className="bg-gray-50">
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
                      to={`/dashboard/payment_debt/${id}/debt/${item._id}`}
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
