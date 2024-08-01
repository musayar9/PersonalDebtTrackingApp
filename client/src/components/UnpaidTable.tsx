
import { useGetPaymentStatus } from '../utils/customHooks';
import DashboardTable from './DashboardTable';

const UnpaidTable = () => {
const { groupDebt } = useGetPaymentStatus({ paymentStatus: "Unpaid" });
return (
  <DashboardTable status={"Unpaid"} groupDebt={groupDebt} />
);
}

export default UnpaidTable