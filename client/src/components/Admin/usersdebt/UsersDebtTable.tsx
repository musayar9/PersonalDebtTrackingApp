import { Link } from "react-router-dom";
import { DebtData } from "../../../lib/types";
import { formatPercentage, formatPrice } from "../../../utils/functions";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const UsersDebtTable = ({ debt }: { debt: DebtData[] | null }) => {
  const validDebt = debt || [];
  console.log(validDebt);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const pageCount = Math.ceil(validDebt.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = debt?.slice(offset, offset + itemsPerPage);
  return (
    <div className="max-w-6xl mx-auto ps-4">
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
                    to={`/dashboard/debtDetail/${item.userId}/${item?._id}`}
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
      <div className="flex items-center justify-end">
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={
            "flex items-center text-xs  capitalize bg-slate-50 border border-slate-300 rounded-xl max-w-fit"
          }
          pageClassName={"p-2 border-l border-r border-slate-50"}
          previousClassName={
            "w-20 text-center hover:bg-slate-400  hover:p-2 hover:rounded-l-lg text-gray-700 font-semibold  hover:text-slate-50"
          }
          nextClassName={
            "w-20 text-center hover:bg-slate-400 hover:p-2 hover:rounded-r-lg text-gray-700 font-semibold hover:text-slate-50"
          }
          activeClassName={"text-slate-50 p-1 bg-slate-400"}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default UsersDebtTable;
