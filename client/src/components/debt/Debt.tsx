import { Link } from "react-router-dom";
import { IoFileTraySharp } from "react-icons/io5";
import { useFetchUserDebt } from "../../utils/customHooks";
import Loading from "../../pages/Loading";
import ErrorMessage from "../../pages/ErrorMessage";
import DebtTable from "./DebtTable";
import { useEffect, useState } from "react";

const Debt: React.FC = () => {
  // const { debt } = useAppSelector((state) => state.debt);
  const { debt, loading, errMsg, setDebt } = useFetchUserDebt();
  console.log(localStorage.getItem("token"));

  const [token, setToken] = useState<string | undefined>(undefined);
console.log(document.cookie)
  useEffect(() => {
    const getTokenFromCookies = (): string | undefined => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; token=`);
      if (parts.length === 2) {
        const lastPart = parts.pop();
        if (lastPart !== undefined) {
          return lastPart.split(";").shift();
        }
      }
      return undefined; // Token bulunamazsa undefined döner
    };

    setToken(getTokenFromCookies());
  }, []);


  console.log(token);

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
          <div className="border-b border-[#dfe1e6eb] p-4 rounded-md  flex items-center  justify-between">
            <h2 className="font-semibold text-2xl tracking-wider pl-4 text-slate-600">
              Debt Tracking Tables
            </h2>
            <Link className="btn btn-sm" to="/debts/create_debt">
              Create Debt
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
            You have no registered debt
          </p>

          <Link className="btn btn-md" to="/debts/create_debt">
            Create Debt
          </Link>
        </div>
      )}
    </>
  );
};

export default Debt;
