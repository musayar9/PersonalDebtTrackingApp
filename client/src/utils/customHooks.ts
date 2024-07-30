import { useState, useEffect } from "react";
import { DebtData } from "../lib/types";
import axios from "axios";

const useDebtData = ({id}:{id:string| undefined}) => {
  const [debt, setDebt] = useState<DebtData>();
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

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

  return { debt, loading, errMsg };
};

export default useDebtData;
