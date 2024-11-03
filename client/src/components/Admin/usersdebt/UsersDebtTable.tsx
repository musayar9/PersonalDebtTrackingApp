import { Link } from "react-router-dom";
import { DebtData } from "../../../lib/types";
import { formatDateTwo, formatPercentage, formatPrice } from "../../../utils/functions";
import { usePagination } from "../../../utils/customHooks";
import CustomPagination from "../../CustomPagination";
import { useTranslation } from "react-i18next";

const UsersDebtTable = ({ debt }: { debt: DebtData[]  | undefined}) => {

const {t, i18n}=useTranslation()
const { currentItems, pageCount, handlePageClick, dataValue } = usePagination({
  data: debt,
  page: 8,
});

  return (
    <div className="max-w-6xl mx-auto ">
      <div className="overflow-x-auto my-8 rounded-lg">
        <table className="table table-xs">
          {/* head */}
          <thead className=" p-2 text-base-content rounded-lg">
            <tr>
              <th></th>
              <th> {t("lender")}</th>
              <th> {t("borrower")}</th>
              <th> {t("description")}</th>
              <th> {t("debt_amount")}</th>
              <th> {t("interest_rate")}</th>
              <th> {t("amount")}</th>
              <th> {t("payment_start")}</th>
              <th> {t("installment")}</th>
              <th> {t("payment_status")}</th>
              <th> {t("detail")}</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {currentItems?.map((item: DebtData, index: number) => (
              <tr key={item._id} className=" ">
                <th>{index + 1}</th>
                <td className=" flex flex-grow">{item.lender}</td>
                <td>{item.borrower}</td>
                <td className="text-ellipsis">{item.description}</td>
                <td>{formatPrice(item.debtAmount)}</td>
                <td>{formatPercentage(item.interestRate)}</td>
                <td>{formatPrice(item.amount)}</td>
                <td>
                  {formatDateTwo({
                    date: item.paymentStart,
                    language: i18n.language,
                  })}
                </td>
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
                    {item.paymentStatus === "Unpaid" ? (
                      <>{t("unpaid")}</>
                    ) : item?.paymentStatus === "Partially Paid" ? (
                      <>{t("partially_paid")}</>
                    ) : (
                      item.paymentStatus === "Paid" && <>{t("paid")}</>
                    )}
                  </p>
                </td>
                <td className="text-emerald-500 font-semibold hover:underline cursor-pointer">
                  <Link to={`/debts/debtDetail/${item.userId}/${item?._id}`}>
                    {t("detail")}
                  </Link>
                </td>
              </tr>
            ))}

            {/* row 2 */}
          </tbody>
        </table>
      </div>
      {dataValue?.length > 10 && (
        <CustomPagination
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      )}
    </div>
  );
};

export default UsersDebtTable;
