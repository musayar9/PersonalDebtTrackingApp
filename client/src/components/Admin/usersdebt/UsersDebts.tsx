import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getAllDebt } from "../../../redux/debtFetch";
import Loading from "../../../pages/Loading";
import UsersDebtSearch from "./Filter";
import UsersDebtTable from "./UsersDebtTable";
import { useLocation, useNavigate } from "react-router-dom";

// interface Filter {
//   lender: string;
//   borrower: string;
//   paymentStatus: string;
// }
const UsersDebts = () => {
  const { debt, debtStatus } = useAppSelector((state) => state.debt);
  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState({
    lender: "",
    borrower: "",
    paymentStatus: "",
  });

  console.log(debt);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const lender = urlParams.get("lender");
    const borrower = urlParams.get("borrower");
    const paymentStatus = urlParams.get("paymentStatus");
    
    console.log(lender, borrower, paymentStatus)
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

          <UsersDebtSearch />

          <UsersDebtTable debt={debt} />
        </div>
      ) : (
        <>Not foun debt</>
      )}
    </>
  );
};

export default UsersDebts;
