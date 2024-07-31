import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { useFetchUserDebt } from "../utils/customHooks";
import { calculatePercentage } from "../utils/functions";

const DashboardArea = () => {
  const { user } = useAppSelector((state) => state.user);
  const { debt } = useFetchUserDebt();
  console.log(debt);
  const totalDebt = debt.length
  const unpaidCount = debt.filter((d)=>d.paymentStatus==="Unpaid").length  
  const partialPaidCount = debt.filter((d) => d.paymentStatus === "Partially Paid").length;  
  const paidCount = debt.filter((d) => d.paymentStatus === "Paid").length;  
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

  console.log(unpaidCount, partialPaidCount, paidCount)
  return (
    <div className="max-w-6xl mx-auto my-4">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-red-500">Unpaid</div>
          <div className="stat-value text-red-600">
            {unpaidPercentage.toFixed(2)}%
          </div>
          <div className="stat-desc">{unpaidCount} debt</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-yellow-500">Partially Paid</div>
          <div className="stat-value text-yellow-400">
            {partiallyPaidPercentage.toFixed(2)}%
          </div>
          <div className="stat-desc">{partialPaidCount} partially paid</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-emerald-500"> Paid</div>
          <div className="stat-value text-emerald-400">
            {fullyPaidPercentage.toFixed(2)}%
          </div>
          <div className="stat-desc">{paidCount} partially paid</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src={user?.user?.profilePicture} />
              </div>
            </div>
          </div>
          <div className="stat-value">{user?.user.username}</div>
          <div className="stat-title">Debt</div>
          <div className="stat-desc text-secondary">
            {debt.length} Total recorded debt
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardArea;
