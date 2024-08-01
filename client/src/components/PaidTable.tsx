import { useGetPaymentStatus } from "../utils/customHooks";
import DashboardTable from "./DashboardTable";

const PaidTable = () => {
  const { groupDebt } = useGetPaymentStatus({ paymentStatus: "Paid" });
  return <DashboardTable status={"Paid"} groupDebt={groupDebt} />;
};

export default PaidTable;
