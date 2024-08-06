import { useGetPaymentStatus } from "../../../utils/customHooks";
import DashboardTable from "../DashboardTable";


const PartiallyPaid = () => {
  const { groupDebt } = useGetPaymentStatus({
    paymentStatus: "Partially Paid",
  });
  return (
    <>
      {groupDebt.length > 0 && (
        <DashboardTable status="Partially Paid" groupDebt={groupDebt} />
      )}
    </>
  );
};

export default PartiallyPaid;
