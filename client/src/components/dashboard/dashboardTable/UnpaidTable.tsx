
import { useTranslation } from 'react-i18next';
import { useGetPaymentStatus } from '../../../utils/customHooks';
import DashboardTable from '../DashboardTable';

const UnpaidTable = () => {
const { groupDebt } = useGetPaymentStatus({ paymentStatus: "Unpaid" });
const {t} = useTranslation()
return (
  <>
    {groupDebt.length > 0 && (
      <DashboardTable status={`${t("unpaid")}`} groupDebt={groupDebt} />
    )}
  </>
);
}

export default UnpaidTable