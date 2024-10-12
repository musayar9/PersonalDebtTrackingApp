import { useTranslation } from "react-i18next";
import { useGetPaymentStatus } from "../../../utils/customHooks";
import DashboardTable from "../DashboardTable";

const PaidTable = () => {
  const { groupDebt } = useGetPaymentStatus({ paymentStatus: "Paid" });
  const {t} = useTranslation()
  return (
    <>
      {groupDebt.length > 0 && (
        <DashboardTable status={`${t("paid")}`} groupDebt={groupDebt} />
      )}
    </>
  );
};

export default PaidTable;
