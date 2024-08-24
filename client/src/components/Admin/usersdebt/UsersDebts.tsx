import {  useEffect, useState } from "react";

import UsersDebtSearch from "./Filter";
import UsersDebtTable from "./UsersDebtTable";
import { useLocation } from "react-router-dom";
import { DebtData, Filter } from "../../../lib/types";
import axios from "axios";

const UsersDebts = () => {

  const [debts, setDebts ] = useState<DebtData[] |undefined | null>([])


  const [filter, setFilter] = useState<Filter>({
    lender: "",
    borrower: "",
    paymentStatus: "",
  });

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
    
        try {
          const res = await axios.get(`/api/v1/debt/getDebt?${searchQuery}`);
          const data:DebtData[] = await res?.data?.debts;
          console.log("dataaa", data);
          setDebts(data)
        } catch (error) {
          console.log(error);
        }
      
    };
    getDebtAll();


  }, [location.search]);



  return (
    <>
      {debts!.length > 0 ? (
        <div className="w-full p-8">
          <div className="border-b border-slate-100 p-4 ">
            <h2 className="font-semibold text-2xl pl-4 text-slate-600 capitalize">
              users' debts table
            </h2>
          </div>

          <UsersDebtSearch filter={filter} setFilter={setFilter} />

          <UsersDebtTable debt={debts} />
        </div>
      ) : (
        <>Not foun debt</>
      )}
    </>
  );
};

export default UsersDebts;
