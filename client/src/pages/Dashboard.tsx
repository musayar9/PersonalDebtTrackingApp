import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import Profile from "../components/profile/Profile";
import ProfileChangePassword from "../components/profile/ProfileChangePassword";
import ProfileContactPreference from "../components/profile/ProfileContactPreference";
import Debt from "../components/debt/Debt";
import DebtForm from "../components/debt/DebtForm";
import DashboardArea from "../components/dashboard/DashboardArea";
import Users from "../components/Admin/Users.tsx";
import UsersDebts from "../components/debt/UsersDebts.tsx";


const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar />
      </div>

      {tab === "profile" && <Profile />}

      {tab === "profile/change-password" && <ProfileChangePassword />}
      {tab === "profile/contactPreference" && <ProfileContactPreference />}

      {tab === "users" && <Users/>}

      {tab === "debt" && <Debt />}
      {tab === "debt/create_debt" && <DebtForm />}
      {tab === "users/debts" && <UsersDebts/>}
      {/* {tab === "debt/payment_debt/:debtId/debt/:paymentId" && <PaymentPage />} */}

      {tab === "dash" && <DashboardArea />}
    </div>
  );
};

export default Dashboard;
