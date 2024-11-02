import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../pages/Loading";
import ErrorMessage from "../../pages/ErrorMessage";
import UserDetailInfo from "./UserDetailInfo";
import { User } from "../../lib/types";
import UserDetailDebtInfo from "./UserDetailDebtInfo";
import api from "../../utils/api";
import { useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";
import { RiArrowGoBackLine } from "react-icons/ri";

const UserDetail = () => {
  const { t } = useTranslation();
  const { userId } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const [userDetail, setUserDetail] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserId = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/v1/auth/${userId}`);
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
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="max-w-6xl mx-auto my-8 p-4">
      <div className="border-b border-slate-200  p-2 flex justify-between">
        <h2 className="text-xl font-semibold">
          {user?.user.isAdmin
            ? `${t("user_detail_page")}`
            : `${t("admin_detail_page")}`}
        </h2>
        <Link className="btn btn-circle" to="/users">
          {/* {user?.user.isAdmin
            ? `${t("return_user_page")}`
            : `${t("return_admin_page")}`} */}
          <RiArrowGoBackLine />
          {/* <span>Return Page</span> */}
        </Link>
      </div>

      <div className="grid gap-4 p-4  md:grid-cols-12">
        <UserDetailInfo userDetail={userDetail} />

        <UserDetailDebtInfo userDetail={userDetail} />
      </div>
    </div>
  );
};

export default UserDetail;
