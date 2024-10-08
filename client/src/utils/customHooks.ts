import { useState, useEffect } from "react";
import { DebtData, User } from "../lib/types";
import axios from "axios";
import { useAppSelector } from "../redux/hooks";
import api from "./api";

const useDebtData = ({ id }: { id: string | undefined }) => {
  const [debt, setDebt] = useState<DebtData>();
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchDebtId = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/v1/debt/getDebt/${id}`);
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
  const token = localStorage.getItem("token");
  useEffect(() => {
    // dispatch(getAllDebt());
    if (user) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await api.get(`/v1/debt/${user?.user._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const data = await res.data;
          setDebt(data);
          setLoading(false);
        } catch (error) {
          setLoading(false);

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

// extract data based on payment status

export const useGetPaymentStatus = ({
  paymentStatus,
}: {
  paymentStatus: string;
}) => {
  const [groupDebt, setGroupDebt] = useState<DebtData[]>([]);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const res = await api.post(`/v1/debt/checkPaymentStatus?limit=5`, {
          paymentStatus,
        });
        const data = await res.data;

        setGroupDebt(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrMsg(error.message);
        } else {
          setErrMsg("Request Failed");
        }
      }
    };

    fetchPaymentStatus();
  }, []);

  return { groupDebt, errMsg };
};

export const useGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get("/v1/auth");
        const data = await res.data;

        setAllUsers(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          setError(error?.response?.data.msg);
        } else {
          setError("Request failed");
        }
      }
    };

    getAllUsers();
  }, []);

  return { allUsers, setAllUsers, loading, error };
};

export const usePagination = ({
  data,
  page,
}: {
  data: DebtData[] | undefined ;
  page: number;
}) => {
  const dataValue = data || [];
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = page;

  const pageCount = Math.ceil(dataValue?.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = dataValue?.slice(offset, offset + itemsPerPage);

  return { handlePageClick, pageCount, currentItems, dataValue };
};


export const useCheckPasswordCriteria = (password:string) =>{
  const criteria = {
    hasLowerCase: /[a-z]/.test(password),
    hasUpperCase: /[A-Z]/.test(password),
    hasDigit: /\d/.test(password),
    hasSpecialChar: /[@$!%*?&.]/.test(password),
    hasMinLength: password.length >= 8 && password.length <= 12,
  };
return {criteria}
}