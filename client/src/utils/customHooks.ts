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
        const res = await api.post(`/v1/debt/checkPaymentStatus`, {
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
