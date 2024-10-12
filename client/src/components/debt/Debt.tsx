import { Link } from "react-router-dom";
import { IoFileTraySharp } from "react-icons/io5";
import { useFetchUserDebt } from "../../utils/customHooks";
import Loading from "../../pages/Loading";
import ErrorMessage from "../../pages/ErrorMessage";
import DebtTable from "./DebtTable";
import { useTranslation } from "react-i18next";

const Debt: React.FC = () => {
  const { t } = useTranslation();
  const { debt, loading, errMsg, setDebt } = useFetchUserDebt();

  if (loading) {
    return <Loading />;
  }

  if (errMsg) {
    return <ErrorMessage message={errMsg} />;
  }

  return (
    <>
      {debt.length > 0 ? (
        <div className="w-full p-8">
          <div className="border-b border-[#dfe1e6eb] p-4   flex items-center  justify-between">
            <h2 className="font-semibold text-xl tracking-wider pl-4  ">
              {t("debt_track_table")}
            </h2>
            <Link className="btn btn-sm" to="/create_debt">
              {t("create_debt")}
            </Link>
          </div>

          <div className="mx-auto max-w-8xl">
            <>
              <DebtTable debt={debt} setDebt={setDebt} />
            </>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col mx-auto mt-28 ">
          <IoFileTraySharp size={96} />
          <p className="text-xl text-gray-400 font-semibold">
            {t("no_registered_debt")}
          </p>

          <Link className="btn btn-md" to="/create_debt">
            {t("create_debt")}
          </Link>
        </div>
      )}
    </>
  );
};

export default Debt;
