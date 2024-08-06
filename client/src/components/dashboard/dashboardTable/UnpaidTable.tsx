
import { useGetPaymentStatus } from '../../../utils/customHooks';
import DashboardTable from '../DashboardTable';

const UnpaidTable = () => {
const { groupDebt } = useGetPaymentStatus({ paymentStatus: "Unpaid" });
return (
  <>
    {groupDebt.length > 0 && (
      <DashboardTable status={"Unpaid"} groupDebt={groupDebt} />
    )}
  </>
);
}

export default UnpaidTable