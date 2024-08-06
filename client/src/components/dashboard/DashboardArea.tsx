import { useFetchUserDebt, useGetPaymentStatus } from "../../utils/customHooks";
import { IoFileTraySharp } from "react-icons/io5";
import DashboardStat from "./DashboardStat";
import PieChartPaidDebt from "./pieChart/PieChartPaidDebt";
import PieChartPartialDebt from "./pieChart/PieChartPartialDebt";
import PieChartUnpaidDebt from "./pieChart/PieChartUnpaidDebt";
import Loading from "../../pages/Loading";
import UnpaidTable from "./dashboardTable/UnpaidTable";
import PartiallyPaid from "./dashboardTable/PartiallyPaid";
import PaidTable from "./dashboardTable/PaidTable";
import DebtPaymentChart from "./DebtPaymentChart";

const DashboardArea = () => {
  const { debt, loading } = useFetchUserDebt();
  const { groupDebt } = useGetPaymentStatus({ paymentStatus: "Paid" });

  if (loading) {
    return (
      <div className="flex items-center justify-center mx-auto">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {debt.length || groupDebt.length > 0 ? (
        <div className="max-w-6xl mx-auto my-4">
          <DashboardStat />

          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-3 p-2">
              <PieChartPaidDebt />
              <PieChartPartialDebt />
              <PieChartUnpaidDebt />
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
