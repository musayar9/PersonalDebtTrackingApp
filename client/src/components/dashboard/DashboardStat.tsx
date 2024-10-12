import { BsDroplet, BsDropletHalf, BsFillDropletFill } from "react-icons/bs";

import { useAppSelector } from "../../redux/hooks";
import { calculatePercentage } from "../../utils/functions";
import { DebtData } from "../../lib/types";
import { useTranslation } from "react-i18next";

const DashboardStat = ({ debt }: { debt: DebtData[] | null }) => {
  // const {debt} = useFetchUserDebt()
  const {t} = useTranslation()
  const { user } = useAppSelector((state) => state.user);
const {theme} = useAppSelector((state)=>state.theme)
  const totalDebt = debt?.length;
  const unpaidCount = debt?.filter((d) => d?.paymentStatus === "Unpaid").length;
  const partialPaidCount = debt?.filter(
    (d) => d.paymentStatus === "Partially Paid"
  ).length;
  const paidCount = debt?.filter((d) => d?.paymentStatus === "Paid")?.length;
  const unpaidPercentage = calculatePercentage({
    count: unpaidCount,
    total: totalDebt,
  });
  const partiallyPaidPercentage = calculatePercentage({
    count: partialPaidCount,
    total: totalDebt,
  });
  const fullyPaidPercentage = calculatePercentage({
    count: paidCount,
    total: totalDebt,
  });

  return (
    <>
      <div className="flex items-center justify-center  ">
        <div
          className={`stats shadow-md ${theme === "light" || "bg-base-200"}`}
        >
          <div className="stat">
            <div className="stat-figure">
              <BsDroplet className="text-red-600" size={24} />
            </div>
            <div className="stat-title text-red-500 font-semibold">
              {t("unpaid")}
            </div>
            <div className="stat-value text-red-600">
              {unpaidPercentage.toFixed(2)}%
            </div>
            <div className="stat-desc">
              {unpaidCount} {t("unpaid_debt")}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure ">
              <BsDropletHalf className="text-yellow-400" size={24} />
            </div>
            <div className="stat-title text-yellow-300 font-semibold">
              {t("partially_paid")}
            </div>
            <div className="stat-value text-yellow-300">
              {partiallyPaidPercentage.toFixed(2)}%
            </div>
            <div className="stat-desc">
              {partialPaidCount} {t("partially_paid_debt")}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure ">
              <BsFillDropletFill className="text-emerald-600" size={24} />
            </div>
            <div className="stat-title text-emerald-500 font-semibold">
              {t("paid")}
            </div>
            <div className="stat-value text-emerald-600">
              {fullyPaidPercentage.toFixed(2)}%
            </div>
            <div className="stat-desc">
              {paidCount} {t("paid_debt")}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar online z-0">
                <div className="w-16  rounded-full">
                  <img src={user?.user?.profilePicture} />
                </div>
              </div>
            </div>
            <div className="stat-value">{user?.user.username}</div>
            <div className="stat-title">{t("debts")}</div>
            <div className="stat-desc text-secondary">
              {debt?.length} {t("total_recorded_debt")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardStat;
