
import { Link } from 'react-router-dom'
import { FaCircleCheck } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
const Success = () => {
const {t}= useTranslation()
  return (
    <div className="max-w-sm mx-auto   my-24">
      <div className="flex flex-col gap-2 items-center justify-center border shadow-sm  p-4 rounded-md">
        <FaCircleCheck size={96} className="text-emerald-500" />
        <h2 className="text-2xl font-semibold text-emerald-500">{t("success")}</h2>
        <p className="text-sm text-gray-500">{t("payment_success_message")}</p>
        <Link className="btn " to="/debts">
          {t("return_debts_page")}
        </Link>
      </div>
    </div>
  );
}

export default Success