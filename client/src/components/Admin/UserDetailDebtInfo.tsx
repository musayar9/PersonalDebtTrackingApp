import { DebtData, User } from "../../lib/types";
import { useEffect, useState } from "react";
import axios from "axios";
import UserAccountStatus from "./UserAccountStatus";
import UserDebtStatus from "./UserDebtStatus";

const UserDetailDebtInfo = ({ userDetail }: { userDetail: User | null }) => {
  const [debt, setDebt] = useState<DebtData[] >([]);

  useEffect(() => {
    if (userDetail?._id) {
      const getUserDebt = async () => {
        try {
          const res = await axios.get(`/api/v1/debt/${userDetail?._id}`);
          const data: DebtData[] =  res.data;
          setDebt(data);
          console.log(data, "user detail data");
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log(error.response?.data.msg);
          } else {
            console.log("request failed");
          }
        }
      };

      getUserDebt();
    }
  }, [userDetail?._id]);

  return (
    <div className="md:col-span-7 space-y-6">
      <UserAccountStatus userDetail={userDetail} />

      <UserDebtStatus debt={debt} />
    </div>
  );
};

export default UserDetailDebtInfo;
