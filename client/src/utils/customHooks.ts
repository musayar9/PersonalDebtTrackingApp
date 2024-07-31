import { useState, useEffect } from "react";
import { DebtData } from "../lib/types";
import axios from "axios";
import { useAppSelector } from "../redux/hooks";

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




  export const useFetchUserDebt = () => {
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [debt, setDebt] = useState<DebtData[]>([]);

  useEffect(() => {
    // dispatch(getAllDebt());

    if (user) {
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

  return { debt, loading, errMsg, setDebt };
};

