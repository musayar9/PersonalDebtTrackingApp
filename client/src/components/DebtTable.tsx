import { DebtData } from "../lib/types";
import { formatPercentage, formatPrice } from "../utils/functions";

const DebtTable = ({ debt }: { debt: DebtData[] }) => {
  return (
    <div className="overflow-x-auto my-8 rounded-md">
      <table className="table table-zebra bg-slate-100">
        {/* head */}
        <thead className="bg-slate-50 p-2">
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
            <th>Delete</th>
            <th>Edit</th>
            <th>Pay</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {debt?.map((item: DebtData, index: number) => (
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
              <td
               
              >
              
              <p  className={`${
                  item.paymentStatus === "Unpaid"
                    ? "bg-red-600"
                    : item?.paymentStatus === "Partially Paid"
                    ? "bg-yellow-400"
                    : item.paymentStatus === "Paid" && "bg-green-500"
                }  } px-2 py-2 rounded-sm text-center text-white text-xs` }>
              
                {item.paymentStatus}
              </p>
              </td>
              <td className="text-red-600 font-semibold hover:underline cursor-pointer">
                Delete
              </td>
              <td className="text-blue-600 font-semibold hover:underline cursor-pointer">
                Edit
              </td>
              <td className="text-emerald-500 font-semibold hover:underline cursor-pointer">
                Pay Debt
              </td>
            </tr>
          ))}

          {/* row 2 */}
        </tbody>
      </table>
    </div>
  );
};

export default DebtTable;
