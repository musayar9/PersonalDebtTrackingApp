import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getAllDebt } from "../../../redux/debtFetch";
import Loading from "../../../pages/Loading";
import UsersDebtSearch from "./Filter";
import UsersDebtTable from "./UsersDebtTable";

const UsersDebts = () => {
  const { debt, debtStatus } = useAppSelector((state) => state.debt);
  const dispatch = useAppDispatch();
  console.log(debt);

  useEffect(() => {
    if (debtStatus) {
      dispatch(getAllDebt());
    }
  }, []);

  if (debtStatus === "loading") {
    return (
      <div className="flex items-center mx-auto h-[50vh]">
        <Loading />
      </div>
    );
  }
  
  
  return (
    <>
      {debt!.length > 0 ? (
        <div className="w-full p-8">
          <div className="border-b border-slate-100 p-4 ">
            <h2 className="font-semibold text-2xl pl-4 text-slate-600 capitalize">
              users' debts table
            </h2>
          </div>

         <UsersDebtSearch/>
         
         <UsersDebtTable debt={debt}/>
        </div>
      ) : (
        <>Not foun debt</>
      )}
    </>
  );
};

export default UsersDebts;
