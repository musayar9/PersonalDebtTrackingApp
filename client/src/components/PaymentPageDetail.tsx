import { IoIosReturnLeft } from "react-icons/io";
import { Link } from "react-router-dom";
import useDebtData from "../utils/customHooks";

import { formatDateTwo, formatPrice } from "../utils/functions";

interface PaymentPageDetailProps {
  id: string | undefined;
  paymentId: string | undefined;
}

const PaymentPageDetail: React.FC<PaymentPageDetailProps> = ({
  id,
  paymentId,
}) => {
  const { debt, errMsg } = useDebtData({ id });
  const selectPayment = debt?.paymentPlan?.find((d) => d?._id === paymentId);
  console.log(selectPayment);
 
  console.log(debt);
  console.log(errMsg);
  return (
    <div className="my-4 ">
      <Link
        to={`/dashboard/debtDetail/${id}`}
        className="flex items-center gap-1 pl-4"
      >
        <IoIosReturnLeft className="bg-orange-500 hover:bg-orange-400 duration-150 ease-linear w-8 h-8 rounded-full p-2 text-slate-50" />
        <span className="text-orange-500 font-semibold">Detail Page</span>
      </Link>
      <div className="pl-4 my-4 flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-gray-500">
          Debt Payment For {formatDateTwo(selectPayment?.paymentDate)}
        </h2>
        <p className="text-xl text-orange-500 font-semibold">
          {" "}
          {debt?.description}
        </p>
        <p className="flex items-center gap-2 text-xl">
          <span className="text-gray-500">Lender: </span>
          <span className="text-orange-500 font-semibold capitalize">
            {debt?.lender}
          </span>
        </p>

        <p className="flex items-center gap-2 text-xl">
          <span className="text-gray-500">Installment: </span>
          <span className="text-orange-500 font-semibold capitalize">
            {debt?.installment}
          </span>
        </p>
        <p className="flex items-center gap-2 text-xl">
          <span className="text-gray-500  capitalize">
            monthly payment amount: 
          </span>
          <span className="text-orange-500 font-semibold capitalize">
            {formatPrice(selectPayment?.paymentAmount)}
          </span>
        </p>
        <p className="flex items-center gap-2 text-xl">
          <span className="text-gray-500 capitalize">
            total debt amount:{" "}
          </span>
          <span className="text-orange-500 font-semibold capitalize">
            {formatPrice(debt?.amount)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PaymentPageDetail;