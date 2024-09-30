import  { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../pages/Loading";
import ErrorMessage from "../../pages/ErrorMessage";
import EditDebtPage from "./EditDebtPage";
import { CreateDebt } from "../../lib/types";
import api from "../../utils/api";

const EditDebt = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState<CreateDebt>({
    lender: "",
    borrower: "",
    debtAmount: 0,
    interestRate: 0,
    amount: 0,
    paymentStart: "",
    installment: 1,
    description: "",

    paymentPlan: [{ paymentDate: "", paymentAmount: 0, paymentStatus: false }],
  });

  useEffect(() => {
    const fetchDebtId = async () => {
      setLoading(true);

      try {
        const res = await api.get(`/v1/debt/getDebt/${id}`);
        const data = await res.data;
        setFormData(data);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrMsg(error.response?.data.msg);
        } else {
          setErrMsg("request failed");
        }
      }
    };

    fetchDebtId();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (errMsg) {
    return <ErrorMessage message={errMsg} />
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="border-b pb-2 m-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold  ">Edit Debt</h2>
        <Link
          className="btn btn-sm"
          to="/debts"
        >
          Return Debt
        </Link>
      </div>

      <EditDebtPage id={id} formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default EditDebt;
