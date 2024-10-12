import { useTranslation } from "react-i18next";
import { useGetPaymentStatus } from "../../../utils/customHooks";
import DashboardTable from "../DashboardTable";


const PartiallyPaid = () => {
  const { groupDebt } = useGetPaymentStatus({
    paymentStatus: "Partially Paid",
  });
  const {t} = useTranslation()
  return (
    <>
      {groupDebt.length > 0 && (
        <DashboardTable status={`${t("partially_paid")}`} groupDebt={groupDebt} />
      )}
    </>
  );
};

export default PartiallyPaid;
