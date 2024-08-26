import { DebtData, User } from "../../lib/types";
import { useEffect, useState } from "react";
import axios from "axios";
import UserAccountStatus from "./UserAccountStatus";
import UserDebtStatus from "./UserDebtStatus";

import ErrorMessage from "../../pages/ErrorMessage";

const UserDetailDebtInfo = ({ userDetail }: { userDetail: User | null }) => {
  const [debt, setDebt] = useState<DebtData[] >([]);
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    if (userDetail?._id) {
      const getUserDebt = async () => {
        try {
          const res = await axios.get(`/api/v1/debt/${userDetail?._id}`);
          const data: DebtData[] =  res.data;
          setDebt(data);
       
        } catch (error) {
          if (axios.isAxiosError(error)) {
    setErrMsg(error.response?.data.msg);
          } else {
          setErrMsg("request failed");
          }
        }
      };

      getUserDebt();
    }
  }, [userDetail?._id]);
  
  if(errMsg){
    return <ErrorMessage message={errMsg}/>
  }

  return (
    <div className="md:col-span-9 space-y-6">
      <UserAccountStatus userDetail={userDetail} />

      <UserDebtStatus debt={debt} />
    </div>
  );
};

export default UserDetailDebtInfo;
