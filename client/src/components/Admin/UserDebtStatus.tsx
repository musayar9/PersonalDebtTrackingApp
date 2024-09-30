import { Link } from "react-router-dom";
import { DebtData } from "../../lib/types";
import { formatPrice } from "../../utils/functions";
import { IoFileTraySharp } from "react-icons/io5";
import { usePagination } from "../../utils/customHooks";
import CustomPagination from "../CustomPagination";

const UserDebtStatus = ({ debt }: { debt: DebtData[] | undefined }) => {


const {currentItems, pageCount, handlePageClick, dataValue} = usePagination({data:debt, page:4})

  return (
    <div className="shadow-sm">
      <div className="flex  flex-col border rounded-lg gap-4 p-8">
        <h2 className="text-xl font-semibold ">Debt Status</h2>

        {dataValue?.length > 0 ? (
          <>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="table">
                <thead className="">
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
                  {currentItems?.map((item) => (
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
                        <Link
                          to={`/debts/debtDetail/${item?.userId}/${item?._id}`}
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {dataValue.length > 4 && (
              <CustomPagination pageCount={pageCount} handlePageClick={handlePageClick}/>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center flex-col mx-auto  ">
            <IoFileTraySharp size={56} />
            <p className="text-xl text-gray-400 font-semibold">
              There is no debt record yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDebtStatus;
