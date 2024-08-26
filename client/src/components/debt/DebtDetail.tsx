import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DebtData } from "../../lib/types";
import DebtDetailTable from "./DebtDetailTable";
import DebtDetailItem from "./DebtDetailItem";
import Loading from "../../pages/Loading";
import ErrorMessage from "../../pages/ErrorMessage";

import { useAppSelector } from "../../redux/hooks";

const DebtDetail = () => {
  const { id, userId } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const [debt, setDebt] = useState<DebtData>();
  const [loading, setLoading] = useState(false);
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
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (errMsg) {
    return <ErrorMessage message={errMsg} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="border-b border-slate-400 m-4 pb-2 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-500  capitalize">
          {debt && debt.description}
        </h2>
        {userId === user?.user._id ? (
          <Link className="btn btn-sm" to="/debts">
            Return Debt
          </Link>
        ) : (
          <Link className="btn btn-sm" to={`/users/user_detail/${userId}`}>
            Return User Detail
          </Link>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <DebtDetailTable id={id} />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <DebtDetailItem debt={debt} />
        </div>
      </div>
    </div>
  );
};

export default DebtDetail;
