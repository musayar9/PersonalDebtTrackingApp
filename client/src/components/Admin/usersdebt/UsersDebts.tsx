import { useEffect, useState } from "react";
import UsersDebtSearch from "./Filter";
import UsersDebtTable from "./UsersDebtTable";
import { useLocation } from "react-router-dom";
import { DebtData, Filter } from "../../../lib/types";
import Loading from "../../../pages/Loading";
import api from "../../../utils/api";
import axios from "axios";
import ErrorMessage from "../../../pages/ErrorMessage";
import { useTranslation } from "react-i18next";

const UsersDebts = () => {
const {t}= useTranslation()
  const [debts, setDebts] = useState<DebtData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
  
    const getDebtAll = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/v1/debt/getDebt?${searchQuery}`);
        const data: DebtData[] = await res?.data?.debts;
        setLoading(false);
   
        setDebts(data);
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.msg);
        } else {
          setError("Request Failed");
        }
      }
    };
    getDebtAll();
  }, [location.search]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      {debts!.length > 0 ? (
        <div className="w-full p-8">
          <div className="border-b p-4 ">
            <h2 className="font-semibold text-2xl pl-4 capitalize">
            {t("all_debts")}
            </h2>
          </div>

          <UsersDebtSearch filter={filter} setFilter={setFilter} />

          <UsersDebtTable debt={debts} />
        </div>
      ) : (
        <>Not found debt</>
      )}
    </>
  );
};

export default UsersDebts;
