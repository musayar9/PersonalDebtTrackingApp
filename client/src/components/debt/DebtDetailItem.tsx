import { DebtData } from "../../lib/types";
import { useAppSelector } from "../../redux/hooks";
import { formatDateTwo, formatPercentage, formatPrice } from "../../utils/functions";
import {useTranslation} from "react-i18next";
const DebtDetailItem = ({debt}:{debt:DebtData | undefined}) => {
const {t,i18n } = useTranslation();
  const {theme} = useAppSelector((state)=>state.theme)
  return (
    <div>
      <div className={`my-10  rounded-md ${theme==="light" ?"border border-slate-200":"bg-base-200"} `}>
        <div className="grid grid-cols-1 gap-4 p-3">
          <p className=" flex items-center justify-between text-xs border-b p-2 border-neutral-300">
            <span>{t("payment_status")}</span>
            <span
              className={`${
                debt?.paymentStatus === "Unpaid"
                  ? "bg-rose-700"
                  : debt?.paymentStatus === "Partially Paid"
                  ? "bg-yellow-400"
                  : debt?.paymentStatus === "Paid" && "bg-green-500"
              }  } px-1 py-1.5 rounded-sm text-center text-white text-xs`}
            >
              {debt?.paymentStatus==="Unpaid" ? `${t("unpaid")}` : debt?.paymentStatus === "Partially Paid" ? `${t("partially_paid")}` : debt?.paymentStatus === "Paid" && `${t("paid")}`}
            </span>
          </p>
          <p className="  flex items-center justify-between text-xs border-b p-2 border-neutral-300">
            <span>{t("lender")}</span>
            <span className="font-semibold">{debt?.lender}</span>
          </p>
          <p className="  flex items-center justify-between text-xs border-b p-2 border-neutral-300">
            <span>{t("borrower")}</span>
            <span className="font-semibold">{debt?.borrower}</span>
          </p>
          <p className="  flex items-center justify-between text-xs border-b p-2 border-neutral-300">
            <span>{t("debt_amount")}</span>
            <span className="font-semibold">
              {formatPrice(debt?.debtAmount)}
            </span>
          </p>

          <p className="  flex items-center justify-between text-xs border-b p-2 border-neutral-300">
            <span>{t("interest_rate")}</span>
            <span className="font-semibold">
              {formatPercentage(debt?.interestRate)}
            </span>
          </p>

          <p className="  flex items-center justify-between text-xs border-b p-2 border-neutral-300">
            <span>{t("amount")}</span>
            <span className="font-semibold">{formatPrice(debt?.amount)}</span>
          </p>

          <p className="  flex items-center justify-between text-xs border-b p-2 border-neutral-300">
            <span>{t("payment_start")}</span>
            <span className="font-semibold">
              {formatDateTwo({date:debt?.paymentStart, language:i18n.language})}
            </span>
          </p>

          <p className="  flex items-center justify-between text-xs border-b p-2 border-neutral-300">
            <span>{t("installment")}</span>
            <span className="font-semibold">{debt?.installment}</span>
          </p>

          <p className="  flex items-center justify-between text-xs border-b p-2 border-neutral-300">
            <span>{t("description")}</span>
            <span className="font-semibold">{debt?.description}</span>
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default DebtDetailItem;
