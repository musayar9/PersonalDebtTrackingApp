import { Link } from "react-router-dom";
import DebtTable from "./DebtTable";

import ErrorMessage from "../pages/ErrorMessage";
import Loading from "../pages/Loading";

import { useFetchUserDebt } from "../utils/customHooks";
import { IoFileTraySharp } from "react-icons/io5";

const Debt: React.FC = () => {
  // const { debt } = useAppSelector((state) => state.debt);
  const { debt, loading, errMsg, setDebt } = useFetchUserDebt();

  if (loading) {
    return (
      <div className="flex items-center justify-between mx-auto max-w-4xl">
        <Loading />
      </div>
    );
  }

  if (errMsg) {
    return <ErrorMessage message={errMsg} />;
  }

  console.log(errMsg);
  return (
    <>
      {debt.length > 0 ? (
        <div className="w-full p-8">
          <div className="bg-[#f3f4f6] p-4 rounded-md shadow-sm flex items-center  justify-between">
            <h2 className="font-semibold text-2xl tracking-wider pl-4 text-slate-600">
              Debt Tracking Tables
            </h2>
            <Link
              className="bg-slate-200 hover:bg-slate-300 hover:text-gray-900 duration-150 ease-linear px-4 py-3 rounded-lg font-semibold text-gray-700"
              to="/dashboard?tab=debt/create_debt"
            >
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
        <div className="flex items-center justify-center flex-col mx-auto -mt-28 ">
          <IoFileTraySharp size={96} />
          <p className="text-xl text-gray-400 font-semibold">
            You have no registered debt
          </p>

          <Link
            className="bg-slate-200 my-4 hover:bg-slate-300 hover:text-gray-900 duration-150 ease-linear px-4 py-3 rounded-lg font-semibold text-gray-700"
            to="/dashboard?tab=debt/create_debt"
          >
            Create Debt
          </Link>
        </div>
      )}
    </>
  );
};

export default Debt;
