import { Link } from "react-router-dom";
import { DebtData } from "../../lib/types";
import { formatPrice } from "../../utils/functions";
import { IoFileTraySharp } from "react-icons/io5";
import { usePagination } from "../../utils/customHooks";
import CustomPagination from "../CustomPagination";
import { useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";

const UserDebtStatus = ({ debt }: { debt: DebtData[] | undefined }) => {
const {t}= useTranslation()
const {theme} = useAppSelector((state)=>state.theme)
const {currentItems, pageCount, handlePageClick, dataValue} = usePagination({data:debt, page:4})

  return (
    <div className="shadow-sm">
      <div
        className={`flex  flex-col  rounded-lg gap-4 p-8 ${
          theme === "light" ? "border" : "bg-base-200"
        }`}
      >
        <h2 className="text-lg font-semibold ">{t("debt_status")}</h2>

        {dataValue?.length > 0 ? (
          <>
            <div
              className={`overflow-x-auto rounded-lg ${
                theme === "light" ? " border border-slate-200" : " bg-base-300"
              }`}
            >
              <table className="table">
                <thead
                  className={`${
                    theme === "light" ? "bg-slate-50" : "text-base-content"
                  }`}
                >
                  <tr>
                    <th>{t("lender")}</th>
                    <th>{t("borrower")}</th>
                    <th>{t("description")}</th>
                    <th>{t("amount")}</th>
                    <th>{t("installment")}</th>
                    <th>{t("status")}</th>
                    <th>{t("detail")}</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((item) => (
                    <tr key={item?._id}>
                      <td className="">{item?.lender}</td>
                      <td className="">{item?.borrower}</td>
                      <td className="">{item?.description}</td>
                      <td className="">{formatPrice(item?.amount)}</td>
                      <td className="">{item?.installment}</td>
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
                        <Link
                          to={`/debts/debtDetail/${item?.userId}/${item?._id}`}
                        >
                       {t("detail")}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {dataValue.length > 4 && (
              <CustomPagination
                pageCount={pageCount}
                handlePageClick={handlePageClick}
              />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center flex-col mx-auto  ">
            <IoFileTraySharp size={56} />
            <p className="text-xl text-gray-400 font-semibold">
             {t("no_registered_debt")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDebtStatus;
