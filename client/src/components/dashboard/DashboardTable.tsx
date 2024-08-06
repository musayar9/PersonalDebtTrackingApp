import { DebtData } from "../../lib/types";
import { formatPrice } from "../../utils/functions";


interface DashboardTableProps{
status:string;
groupDebt: DebtData[]
}


const DashboardTable:React.FC<DashboardTableProps> = ({groupDebt, status}) => {
  
return (
  <div className={`border  overflow-x-auto p-2 h-max rounded-md`}>
    <div className="flex justify-end p-2.5">
      <span
        className={`${
          status === "Unpaid"
            ? "bg-rose-700"
            : status === "Partially Paid"
            ? "bg-yellow-400"
            : status === "Paid" && "bg-green-500"
        }   px-1 py-1.5 rounded-sm text-center text-white text-xs`}
      >
        {status}
      </span>
    </div>

    <table className="table table-zebra   table-xs p-4 ">
      {/* head */}
      <thead>
        <tr>
          <th></th>
          <th>Lender</th>
          <th>Borrower</th>
          <th>Description </th>
          <th>Amount</th>
          <th>Installment</th>
        </tr>
      </thead>
      <tbody className="">
        {/* row 1 */}

        {groupDebt?.map((item, index) => (
          <tr className="text-xs" key={item._id}>
            <th className="text-xs">{index + 1}</th>
            <td className="text-xs">{item?.lender}</td>
            <td className="text-xs">{item.borrower}</td>
            <td className="text-xs">{item.description}</td>
            <td className="text-xs">{formatPrice(item.amount)}</td>
            <td className="text-xs">{item.installment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default DashboardTable