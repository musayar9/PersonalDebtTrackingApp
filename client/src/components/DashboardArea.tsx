import Loading from "../pages/Loading";


import { useFetchUserDebt, useGetPaymentStatus } from "../utils/customHooks";
import DashboardStat from "./DashboardStat";
import DebtPaymentChart from "./DebtPaymentChart";
import PaidTable from "./PaidTable";
import PartiallyPaid from "./PartiallyPaid";
import PieChartDebt from "./PieChartPaidDebt";
import PieChartPartialDebt from "./PieChartPartialDebt";
import PieChartUnpaidDebt from "./PieChartUnpaidDebt";
import UnpaidTable from "./UnpaidTable";
import { IoFileTraySharp } from "react-icons/io5";
import UpcomingDebts from "./UpcomingDebts";
const DashboardArea = () => {

  const { debt, loading } = useFetchUserDebt();
  const {groupDebt} = useGetPaymentStatus({paymentStatus:"Paid"})
  console.log("grouğDebt", groupDebt)
console.log(debt)





if(loading){
  return <div className="flex items-center justify-center mx-auto">
  <Loading/>
  </div>
}

  return (
    <>
      {debt.length || groupDebt.length > 0 ? (
        <div className="max-w-6xl mx-auto my-4">
          <DashboardStat />
          <UpcomingDebts/>

          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-3 p-2">
            <PieChartDebt/>
            <PieChartPartialDebt/>
            <PieChartUnpaidDebt/>
            
            </div>
            <div className="lg:col-span-5">
              <div className=" gap-6 p-4 space-y-4">
                <UnpaidTable />
                <PartiallyPaid />
                <PaidTable />
              </div>
            </div>
            <div className="-pl-4 lg:col-span-3 my-4">
              <DebtPaymentChart />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col mx-auto -mt-28 ">
          <IoFileTraySharp size={96} />
          <p className="text-xl text-gray-400 font-semibold">
            You have no registered debt
          </p>
        </div>
      )}
    </>
  );
};

export default DashboardArea;
