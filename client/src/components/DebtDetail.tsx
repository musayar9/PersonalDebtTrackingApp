import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DebtData } from "../lib/types";
import DebtDetailTable from "./DebtDetailTable";
import DebtDetailItem from "./DebtDetailItem";

const DebtDetail = () => {
  const { id } = useParams();
  const [debt, setDebt] = useState<DebtData>();
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  console.log("loading", loading);
  console.log("errmsg", errMsg);

  useEffect(() => {
    const fetchDebtId = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/debt/getDebt/${id}`);
        const data: DebtData = await res.data;
        setDebt(data);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrMsg(error.response?.data.msg);
        } else {
          setErrMsg("Request failed");
        }
      }
    };

    fetchDebtId();
  }, []);

console.log(debt)
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="border-b border-slate-400 m-4 pb-2">
        <h2 className="text-xl font-semibold text-gray-500">
        {debt && debt.description}
        </h2>
      </div>
      
      
      
      <div className="mt-8 grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8">
      <DebtDetailTable id={id}/>
      </div>
      <div className="lg:col-span-4 lg:pl-4">
      <DebtDetailItem id={id}/>
      </div>
      
      
      </div>
    </div>
  );
};

export default DebtDetail;
