import { useGetPaymentStatus } from "../utils/customHooks";
import DashboardTable from "./DashboardTable";

const PartiallyPaid = () => {
  const { groupDebt } = useGetPaymentStatus({
    paymentStatus: "Partially Paid",
  });
  return <DashboardTable status="Partially Paid" groupDebt={groupDebt} />;
};

export default PartiallyPaid;
