import React, { useEffect, useState } from 'react'
import { DebtData } from '../lib/types';
import axios from 'axios';

const DebtDetailItem = () => {
  const [debt, setDebt] = useState<DebtData>();
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  console.log("loading", loading);
  console.log("errmsg", errMsg);
  console.log(debt)

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
  return (
    <div>DebtDetailItem</div>
  )
}

export default DebtDetailItem