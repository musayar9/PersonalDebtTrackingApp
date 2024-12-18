import { useTranslation } from "react-i18next";
import { DebtData } from "../../lib/types";
import { useAppSelector } from "../../redux/hooks";
import { formatPrice } from "../../utils/functions";


interface DashboardTableProps{
status:string;
groupDebt: DebtData[]
}


const DashboardTable:React.FC<DashboardTableProps> = ({groupDebt, status}) => {
  const {theme} = useAppSelector((state)=>state.theme)
  const {t} = useTranslation()
return (
  <div
    className={`  overflow-x-auto p-2 h-max rounded-md ${
      theme !== "dark" ? "border" : "bg-base-200"
    } `}
  >
    <div className="flex justify-end p-2.5">
      <span
        className={`${
          status === `${t("unpaid")}`
            ? "bg-rose-700"
            : status === `${t("partially_paid")}`
            ? "bg-yellow-400"
            : status === `${t("paid")}` && "bg-green-500"
        }   px-1 py-1.5 rounded-sm text-center text-white text-xs`}
      >
        {status}
      </span>
    </div>

    <table className="table table-xs p-4 ">
      {/* head */}
      <thead className={`${theme === "light" || "text-base-content"}`}>
        <tr>
          <th></th>
          <th>{t("lender")}</th>
          <th>{t("borrower")}</th>
          <th>{t("description")} </th>
          <th>{t("amount")}</th>
          <th>{t("installment")}</th>
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