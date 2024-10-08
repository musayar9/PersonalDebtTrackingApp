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
import { useTranslation } from "react-i18next";


const DashboardArea = () => {
  const { t, i18n } = useTranslation();
  const { debt, loading } = useFetchUserDebt();
  const { groupDebt } = useGetPaymentStatus({ paymentStatus: "Paid" });

const clickHandle = async(lang:string)=>{
 await  i18n.changeLanguage(lang)

}
console.log(i18n, "18n")

  if (loading) {
    return <Loading />;
  }

  return (
    <div className=" max-w-6xl mx-auto flex mt-14">
      <div className="w-72 h-24 border border-slate-500">
        <p className="text-white">aktif dil {i18n.language}</p>
        <p>{t("welcome")}</p>

        <div>
          <button className="btn btn-primary" onClick={() => clickHandle("tr")}>tr</button>
          <button className="btn btn-red" onClick={() => clickHandle("en")}>en</button>
        </div>
      </div>

      {debt.length > 0 || groupDebt.length > 0 ? (
        <div className=" my-4 ">
          <DashboardStat debt={debt} />

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
        <div className=" flex items-center justify-center mx-auto  flex-col mt-28">
          <IoFileTraySharp size={96} />
          <p className="text-xl text-gray-400 font-semibold">
            You have no registered debt
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardArea;
