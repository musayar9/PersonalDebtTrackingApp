import { FaX } from "react-icons/fa6";
import { DebtData, User } from "../../lib/types";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatPrice } from "../../utils/functions";
import { Link } from "react-router-dom";

const UserDetailDebtInfo = ({ userDetail }: { userDetail: User | null }) => {
  const [debt, setDebt] = useState<DebtData[]>([]);

  useEffect(() => {
    if (userDetail?._id) {
      const getUserDebt = async () => {
        try {
          const res = await axios.get(`/api/v1/debt/${userDetail?._id}`);
          const data: DebtData[] = await res.data;
          setDebt(data);
          console.log(data, "user detail data");
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log(error.response?.data.msg);
          } else {
            console.log("request failed");
          }
        }
      };

      getUserDebt();
    }
  }, [userDetail?._id]);

  return (
    <div className="md:col-span-7 space-y-6">
      <div className="shadow-sm">
        <div className="flex  flex-col border rounded-lg gap-4 p-8">
          <h2 className="text-xl font-semibold text-gray-500">
            Account Status
          </h2>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="table  ">
              <thead className="bg-slate-50">
                <tr>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Status</th>
                  <th>Admin</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-slate-500">{userDetail?.email}</td>
                  <td>
                    <input
                      type="password"
                      maxLength={6}
                      value={"******"}
                      disabled
                      className="border border-none w-24 text-slate-500"
                    />
                  </td>
                  <td>
                    <span
                      className={`${
                        userDetail?.verifyAccount
                          ? "bg-emerald-300 text-emerald-600"
                          : "bg-red-300 text-red-600"
                      } font-semibold  px-6 py-1 text-sm  rounded-full`}
                    >
                      {userDetail ? "verified" : "unverified"}
                    </span>
                  </td>
                  <td>
                    {userDetail?.isAdmin ? (
                      <FaCheck className="text-emerald-500" />
                    ) : (
                      <FaX className="text-rose-600" />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="shadow-sm">
        <div className="flex  flex-col border rounded-lg gap-4 p-8">
          <h2 className="text-xl font-semibold text-gray-500">Debt Status</h2>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="table">
              <thead className="bg-slate-50">
                <tr>
                  <th>Lender</th>
                  <th>Borrower</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Installment</th>
                  <th>Status</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {debt.map((item) => (
                  <tr key={item?._id}>
                    <td className="text-slate-500">{item?.lender}</td>
                    <td className="text-slate-500">{item?.borrower}</td>
                    <td className="text-slate-500">{item?.description}</td>
                    <td className="text-slate-500">
                      {formatPrice(item?.amount)}
                    </td>
                    <td className="text-slate-500">{item?.installment}</td>
                    <td>
                      <p
                        className={`${
                          item.paymentStatus === "Unpaid"
                            ? "bg-rose-700"
                            : item?.paymentStatus === "Partially Paid"
                            ? "bg-yellow-400"
                            : item.paymentStatus === "Paid" && "bg-green-500"
                        }  } px-1 py-1.5 rounded-sm text-center text-white text-xs`}
                      >
                        {item.paymentStatus}
                      </p>
                    </td>

                    <td className="text-emerald-500 font-semibold hover:underline cursor-pointer">
                      <Link to={`/dashboard/debtDetail/${item?.userId}/${item?._id}`}>
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailDebtInfo;
