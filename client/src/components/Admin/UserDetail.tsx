import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../pages/Loading";
import ErrorMessage from "../../pages/ErrorMessage";
import UserDetailInfo from "./UserDetailInfo";
import { User } from "../../lib/types";
import UserDetailDebtInfo from "./UserDetailDebtInfo";

const UserDetail = () => {
  const { userId } = useParams();
  console.log(userId, "params");

  const [userDetail, setUserDetail] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserId = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/v1/auth/${userId}`);
        const data: User = await res.data;
        setLoading(false);
        setUserDetail(data);
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.msg);
        } else {
          setError("Request Failed");
        }
      }
    };

    getUserId();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  console.log(userDetail, "userDetail");
  return (
    <div className="max-w-6xl mx-auto my-8">
        <div className="border-b border-slate-200  p-2 flex justify-between">
        <h2 className="text-2xl font-semibold text-gray-600">User Detail Page</h2>
        <Link className="btn btn-sm" to="/dashboard?tab=users">Return Users Page</Link>
        </div>
    
      <div className="grid gap-4 p-4  md:grid-cols-10">
       
        <UserDetailInfo userDetail={userDetail} />

        <UserDetailDebtInfo userDetail={userDetail} />
      </div>
    </div>
  );
};

export default UserDetail;
