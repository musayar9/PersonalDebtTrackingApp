import { useGetPaymentStatus } from "../../../utils/customHooks";
import DashboardTable from "../DashboardTable";

const PaidTable = () => {
  const { groupDebt } = useGetPaymentStatus({ paymentStatus: "Paid" });
  return (
    <>
      {groupDebt.length > 0 && (
        <DashboardTable status={"Paid"} groupDebt={groupDebt} />
      )}
    </>
  );
};

export default PaidTable;
