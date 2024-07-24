import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import Profile from "../components/Profile";
import Debt from "../components/Debt";
import DashboardArea from "../components/DashboardArea";
import ProfileChangePassword from "../components/ProfileChangePassword";
import ProfileContactPreference from "../components/ProfileContactPreference";
import DebtForm from "../components/DebtForm";


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

      {tab === "debt" && <Debt />}
      {tab === "debt/create_debt" && <DebtForm />}

      {tab === "dash" && <DashboardArea />}
    </div>
  );
};

export default Dashboard;
