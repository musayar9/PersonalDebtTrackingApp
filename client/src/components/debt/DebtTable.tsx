import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { DebtData } from "../../lib/types";
import { formatPercentage, formatPrice } from "../../utils/functions";
import api from "../../utils/api";
import { usePagination } from "../../utils/customHooks";

import CustomPagination from "../CustomPagination";
interface DebtTableProps {
  debt: DebtData[];
  setDebt: React.Dispatch<React.SetStateAction<DebtData[]>>;
}

const DebtTable = ({ debt, setDebt }: DebtTableProps) => {

  const [showModal, setShowModal] = useState(false);
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
      setShowModal(false);

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
        setShowModal(false);
      }, 3000);
    }
  };

  return (
    <div className="overflow-x-auto my-8 ">
      <div>
        {" "}
        <table className="table table-sm ">
          {/* head */}
          <thead className="text-base-content  p-2">
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
                    }  } px-1 py-1.5 rounded-md text-center text-white text-xs`}
                  >
                    {item.paymentStatus}
                  </p>
                </td>
                <td
                  onClick={() => {
                    setShowModal(true);
                    setDebtId(item?._id);
                  }}
                  className="text-red-500 font-semibold hover:underline cursor-pointer"
                >
                  Delete
                </td>
                <td className="text-blue-600 font-semibold hover:underline cursor-pointer">
                  <Link to={`/debts/updateDebt/${item?._id}`}>Edit</Link>
                </td>
                <td className="text-emerald-500 font-semibold hover:underline cursor-pointer">
                  <Link to={`/debts/debtDetail/${item.userId}/${item?._id}`}>
                    Detail
                  </Link>
                </td>
              </tr>
            ))}

            {/* row 2 */}
          </tbody>
        </table>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
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
      </Modal>

      {dataValue.length > 4 && (
      
        <CustomPagination pageCount={pageCount} handlePageClick={handlePageClick}/>
      )}
    </div>
  );
};

export default DebtTable;
