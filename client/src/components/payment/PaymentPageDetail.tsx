import { IoIosReturnLeft } from "react-icons/io";
import { Link } from "react-router-dom";
import useDebtData from "../../utils/customHooks";
import { formatDateTwo, formatPrice } from "../../utils/functions";
import { useAppSelector } from "../../redux/hooks";


interface PaymentPageDetailProps {
  id: string | undefined;
  paymentId: string | undefined;
}

const PaymentPageDetail: React.FC<PaymentPageDetailProps> = ({
  id,
  paymentId,
}) => {
const {user} = useAppSelector((state)=>state.user)
  const { debt} = useDebtData({ id });
  const selectPayment = debt?.paymentPlan?.find((d) => d?._id === paymentId);

  return (
    <div className="my-4 ">
      <Link
        to={`/debts/debtDetail/${user?.user._id}/${id}`}
        className="flex items-center gap-1 pl-4"
      >
        <IoIosReturnLeft className="bg-orange-500 hover:bg-orange-400 duration-150 ease-linear w-8 h-8 rounded-full p-2 text-slate-50" />
        <span className="text-orange-500 font-semibold">Detail Page</span>
      </Link>
      <div className="pl-4 my-4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold mb-2">Payment Summary</h2>
        <h4 className="text-md text-end font-semibold ">
          Debt Payment For {formatDateTwo(selectPayment?.paymentDate)}
        </h4>
        <p className="text-md text-end text-orange-500 font-semibold">
          {" "}
          {debt?.description}
        </p>
        <p className="flex items-center gap-2 text-md justify-between">
          <span className="  text-sm font-semibold">Lender </span>
          <span className="text-orange-500 font-semibold capitalize">
            {debt?.lender}
          </span>
        </p>

        <p className="flex items-center gap-2 text-md justify-between">
          <span className="  text-sm font-semibold">Installment </span>
          <span className="text-orange-500 font-semibold capitalize">
            {debt?.installment}
          </span>
        </p>
        <p className="flex items-center gap-2 text-md justify-between">
          <span className="  text-sm font-semibold  capitalize">
            monthly payment amount
            
          </span>
          <span className="text-orange-500 font-semibold capitalize">
            {formatPrice(selectPayment?.paymentAmount)}
          </span>
        </p>
        <p className="flex items-center gap-2 text-md capitalize font-semibold  justify-between border-t-2 border-slate-300 my-2">
          <span className="  mt-2">total debt amount </span>
          <span className="text-orange-500  ">
            {formatPrice(debt?.amount)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PaymentPageDetail;
