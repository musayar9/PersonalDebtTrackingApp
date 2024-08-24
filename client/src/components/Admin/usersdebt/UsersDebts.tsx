import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getAllDebt } from "../../../redux/debtFetch";
import Loading from "../../../pages/Loading";
import UsersDebtSearch from "./Filter";
import UsersDebtTable from "./UsersDebtTable";
import { useLocation, useNavigate } from "react-router-dom";
import { Filter } from "../../../lib/types";
import axios from "axios";

const UsersDebts = () => {
  const { debt, debtStatus } = useAppSelector((state) => state.debt);

  const dispatch = useAppDispatch();

  const [filter, setFilter] = useState<Filter>({
    lender: "",
    borrower: "",
    paymentStatus: "",
  });

  console.log(debt);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const lenderFromUrl = urlParams.get("lender");
    const borrowerFromUrl = urlParams.get("borrower");
    const paymentStatusFromUrl = urlParams.get("paymentStatus");

    if (lenderFromUrl || borrowerFromUrl || paymentStatusFromUrl) {
      setFilter({
        ...filter,
        lender: lenderFromUrl,
        borrower: borrowerFromUrl,
        paymentStatus: paymentStatusFromUrl,
      });
    }
    const searchQuery = urlParams.toString();
    console.log("searchQuery", searchQuery);
    const getDebtAll = async () => {
      if (searchQuery) {
        try {
          const res = await axios.get(`/api/v1/debt/getDebt?${searchQuery}`);
          const data = await res.data;
          console.log("dataaa", data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getDebtAll();

    if (debtStatus) {
      dispatch(getAllDebt());
    }
  }, [location.search]);
  console.log(filter, "filter");

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

          <UsersDebtSearch filter={filter} setFilter={setFilter} />

          <UsersDebtTable debt={debt} />
        </div>
      ) : (
        <>Not foun debt</>
      )}
    </>
  );
};

export default UsersDebts;
