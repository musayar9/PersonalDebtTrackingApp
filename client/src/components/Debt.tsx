import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";

import { Link } from "react-router-dom";
import DebtTable from "./DebtTable";
import axios from "axios";
import ErrorMessage from "../pages/ErrorMessage";
import Loading from "../pages/Loading";
import { DebtData } from "../lib/types";


const Debt:React.FC = () => {
  // const { debt } = useAppSelector((state) => state.debt);
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [debt, setDebt] = useState<DebtData[]>([]);

  useEffect(() => {
    // dispatch(getAllDebt());
    
    if(user){
        const fetchData = async () => {
          try {
            setLoading(true);
            const res = await axios.get(`/api/v1/debt/${user?.user._id}`);
            const data = await res.data;
            setDebt(data);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.log(error);
            if (axios.isAxiosError(error)) {
              setErrMsg(error.response?.data.msg);
            } else {
              setErrMsg("Request Failed");
            }
          }
        };
        fetchData();
    }


  }, [user]);

  console.log(debt);

  if (loading) {
    return (
    <div className="flex items-center justify-between mx-auto max-w-4xl" >
    
      <Loading/>
    </div>
    );
  }

  if (errMsg) {
    return <ErrorMessage message={errMsg} />;
  }

  console.log(errMsg);
  return (
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
        {debt ? (
          <>
            <DebtTable debt={debt} setDebt= {setDebt}/>
          </>
        ) : (
          <div>
            <p>Henuz borç kaydınız bulunmamaktadır</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Debt;
