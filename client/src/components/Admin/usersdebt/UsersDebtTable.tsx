import { Link } from "react-router-dom";
import { DebtData } from "../../../lib/types";
import { formatPercentage, formatPrice } from "../../../utils/functions";
import { usePagination } from "../../../utils/customHooks";
import CustomPagination from "../../CustomPagination";

const UsersDebtTable = ({ debt }: { debt: DebtData[]  | undefined}) => {


const { currentItems, pageCount, handlePageClick, dataValue } = usePagination({
  data: debt,
  page: 8,
});

  return (
    <div className="max-w-6xl mx-auto ">
      <div className="overflow-x-auto my-8 rounded-lg">
        <table className="table table-sm">
          {/* head */}
          <thead className=" p-2 bg-slate-50 rounded-lg">
            <tr>
              <th></th>
              <th>Lender</th>
              <th>Borrower</th>
              <th>Description</th>
              <th>Debt Amount</th>
              <th>Interest Rate</th>
              <th>Amount</th>
              <th>Payment Start</th>
              <th>Installment</th>
              <th>Payment Status</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {currentItems?.map((item: DebtData, index: number) => (
              <tr key={item._id} className=" text-gray-500">
                <th>{index + 1}</th>
                <td className=" flex flex-grow">{item.lender}</td>
                <td>{item.borrower}</td>
                <td className="text-ellipsis">{item.description}</td>
                <td>{formatPrice(item.debtAmount)}</td>
                <td>{formatPercentage(item.interestRate)}</td>
                <td>{formatPrice(item.amount)}</td>
                <td>{new Date(item.paymentStart).toLocaleDateString()}</td>
                <td>{item.installment}</td>
                <td>
                  <p
                    className={`${
                      item.paymentStatus === "Unpaid"
                        ? "bg-rose-700"
                        : item?.paymentStatus === "Partially Paid"
                        ? "bg-yellow-400"
                        : item.paymentStatus === "Paid" && "bg-green-500"
                    }  } px-1 py-1.5 rounded-md text-center text-white text-xs`}
                  >
                    {item.paymentStatus}
                  </p>
                </td>
                <td className="text-emerald-500 font-semibold hover:underline cursor-pointer">
                  <Link
                    to={`/debts/debtDetail/${item.userId}/${item?._id}`}
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}

            {/* row 2 */}
          </tbody>
        </table>
      </div>
      {dataValue?.length > 10 && (
       <CustomPagination pageCount={pageCount} handlePageClick={handlePageClick}/>
      )}
    </div>
  );
};

export default UsersDebtTable;
