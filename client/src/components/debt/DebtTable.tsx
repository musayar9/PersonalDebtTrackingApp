import axios from "axios";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { DebtData } from "../../lib/types";
import { formatPercentage, formatPrice } from "../../utils/functions";
import api from "../../utils/api";
import { usePagination } from "../../utils/customHooks";

import CustomPagination from "../CustomPagination";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
interface DebtTableProps {
  debt: DebtData[];
  setDebt: React.Dispatch<React.SetStateAction<DebtData[]>>;
}

const DebtTable = ({ debt, setDebt }: DebtTableProps) => {
const {t} = useTranslation()
  // const [showModal, setShowModal] = useState(false);
  const [debtId, setDebtId] = useState<string | undefined>("");
  const [errMsg, setErrMsg] = useState("");
  
  
const { currentItems, pageCount, handlePageClick, dataValue } = usePagination({
  data: debt,
  page: 5,
});
  
  
  const handleDeleteDebt = async () => {
    try {
      const res = await api.delete(
        `/v1/debt/${debtId}`
      );
      const data = await res.data;

      const deleteDebt = debt.filter((d) => d._id !== debtId);

      setDebt(deleteDebt);
      // setShowModal(false);
      toast.success(data.message)
      setErrMsg("");
      return data
    } catch (error) {
 
      if (axios.isAxiosError(error)) {
        setErrMsg(error.response?.data.msg);
      } else {
        setErrMsg("request failed");
      }

      setTimeout(() => {
        setErrMsg("");
        // setShowModal(false);
      }, 3000);
    }
  };

  return (
    <div className="overflow-x-auto my-8 ">
      <div>
        {" "}
        <table className="table table-xs ">
          {/* head */}
          <thead className="text-base-content  p-2">
            <tr>
              <th></th>
              <th>{t("lender")}</th>
              <th>{t("borrower")}</th>
              <th>{t("description")}</th>
              <th>{t("debt_amount")}</th>
              <th>{t("interest_rate")}</th>
              <th>{t("amount")}</th>
              <th>{t("payment_start")}</th>
              <th>{t("installment")}</th>
              <th>{t("payment_status")}</th>
              <th>{t("delete")}</th>
              <th>{t("edit")}</th>
              <th>{t("payment")}</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {currentItems?.map((item: DebtData, index: number) => (
              <tr key={item._id} className=" ">
                <th>{index + 1}</th>
                <td className="">{item.lender}</td>
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
                    }  } px-1 py-1.5 rounded-md text-center text-white text-[11px]`}
                  >
                    {item.paymentStatus === "Unpaid"
                      ? `${t("unpaid")}`
                      : item?.paymentStatus === "Partially Paid"
                      ? `${t("partially_paid")}`
                      : item.paymentStatus === "Paid" && `${t("paid")}`}
                  </p>
                </td>
                <td
                  // onClick={() => {
                  //   setShowModal(true);
                  //   setDebtId(item?._id);
                  // }}
                  className="text-red-500 font-semibold hover:underline cursor-pointer"
                >
                  <a
                    href="#my_modal_8"
                    className=""
                    onClick={() => setDebtId(item?._id)}
                  >
                    {t("delete")}
                  </a>
                </td>
                <td className="text-blue-600 font-semibold hover:underline cursor-pointer">
                  <Link to={`/debts/updateDebt/${item?._id}`}>{t("edit")}</Link>
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
      {/* 
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
        className="bg-base-300"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-200 mx-auto" />

            {errMsg !== "" ? (
              <p className="text-red-600 text-md font-semibold">{errMsg}</p>
            ) : (
              <>
                <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400 ">
                  Are you sure you want to delete this post?
                </h3>

                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleDeleteDebt}>
                    Yes I'm sure
                  </Button>
                  <Button color="gray" onClick={() => setShowModal(false)}>
                    No Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal> */}

      {/* Put this part before </body> tag */}
      <div className="modal" role="dialog" id="my_modal_8">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            {" "}
            <HiOutlineExclamationCircle className="h-14 w-14 text-base-300 mx-auto" />
          </h3>

          {errMsg !== "" ? (
            <p className="text-red-600 text-md font-semibold">{errMsg}</p>
          ) : (
            <>
              <h4 className="py-4 text-center">
                {" "}
                Are you sure you want to delete this post?
              </h4>
              <div className="modal-action flex justify-between">
                <a href="#" className="btn " onClick={handleDeleteDebt}>
                  Yes I'm sure
                </a>
                <a href="#" className="btn">
                  No Cancel
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      {dataValue.length > 4 && (
        <CustomPagination
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      )}
    </div>
  );
};

export default DebtTable;
