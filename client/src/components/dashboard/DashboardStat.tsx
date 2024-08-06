

import { BsDroplet, BsDropletHalf, BsFillDropletFill } from 'react-icons/bs';
import { useFetchUserDebt } from '../../utils/customHooks';
import { useAppSelector } from '../../redux/hooks';
import { calculatePercentage } from '../../utils/functions';

const DashboardStat = () => {
  const {debt} = useFetchUserDebt()
const {user} = useAppSelector((state)=>state.user);

  const totalDebt = debt?.length;
  const unpaidCount = debt?.filter((d) => d.paymentStatus === "Unpaid").length;
  const partialPaidCount = debt.filter(
    (d) => d.paymentStatus === "Partially Paid"
  ).length;
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

  return (
    <>
      {debt?.length > 0}
      <div className="flex items-center justify-center">
        <div className="stats shadow ">
          <div className="stat">
            <div className="stat-figure">
              <BsDroplet className="text-red-600" size={24} />
            </div>
            <div className="stat-title text-red-500 font-semibold">Unpaid</div>
            <div className="stat-value text-red-600">
              {unpaidPercentage.toFixed(2)}%
            </div>
            <div className="stat-desc">{unpaidCount} debt</div>
          </div>

          <div className="stat">
            <div className="stat-figure ">
              <BsDropletHalf className="text-yellow-400" size={24} />
            </div>
            <div className="stat-title text-yellow-300 font-semibold">
              Partially Paid
            </div>
            <div className="stat-value text-yellow-300">
              {partiallyPaidPercentage.toFixed(2)}%
            </div>
            <div className="stat-desc">{partialPaidCount} partially paid</div>
          </div>

          <div className="stat">
            <div className="stat-figure ">
              <BsFillDropletFill className="text-emerald-600" size={24} />
            </div>
            <div className="stat-title text-emerald-500 font-semibold">
              {" "}
              Paid
            </div>
            <div className="stat-value text-emerald-600">
              {fullyPaidPercentage.toFixed(2)}%
            </div>
            <div className="stat-desc">{paidCount} partially paid</div>
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
            <div className="stat-title">Debt</div>
            <div className="stat-desc text-secondary">
              {debt.length} Total recorded debt
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardStat