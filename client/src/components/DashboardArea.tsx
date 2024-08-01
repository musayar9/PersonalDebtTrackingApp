import Loading from "../pages/Loading";
import { useAppSelector } from "../redux/hooks";

import { useFetchUserDebt, useGetPaymentStatus } from "../utils/customHooks";
import DashboardStat from "./DashboardStat";
import DebtPaymentChart from "./DebtPaymentChart";
import PaidTable from "./PaidTable";
import PartiallyPaid from "./PartiallyPaid";
import UnpaidTable from "./UnpaidTable";
const DashboardArea = () => {
  const {user} = useAppSelector((state)=>state.user)
  const { debt, loading } = useFetchUserDebt();
  const {groupDebt} = useGetPaymentStatus({paymentStatus:"Paid"})
  console.log("grouğDebt", groupDebt)






if(loading){
  return <div className="flex items-center justify-center mx-auto">
  <Loading/>
  </div>
}

  return (
    <>
      {user !== null && debt !== null ? (
        <div className="max-w-6xl mx-auto my-4">
          <DashboardStat />
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4 p-4">
            <UnpaidTable />
            <PartiallyPaid />
            <PaidTable />
            <DebtPaymentChart />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center my-8 ">
          <p className="text-sem text-gray-500">You have no registered debt</p>
        </div>
      )}
    </>
  );
};

export default DashboardArea;
