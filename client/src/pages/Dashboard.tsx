import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
// import DashSidebar from "../components/DashSidebar";
// import Profile from "../components/profile/Profile";
// import ProfileChangePassword from "../components/profile/ProfileChangePassword";
// import ProfileContactPreference from "../components/profile/ProfileContactPreference";
// import Debt from "../components/debt/Debt";
// import DebtForm from "../components/debt/DebtForm";
import DashboardArea from "../components/dashboard/DashboardArea";
// import Users from "../components/Admin/Users.tsx";
// import UsersDebts from "../components/Admin/usersdebt/UsersDebts.tsx";
import Sidebar from "../components/Sidebar.tsx";
// import { NavbarComponent } from "../components/navbar/Navbar.tsx";

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
console.log(tab)
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full ml-16 md:ml-56 mt-14">{/* <DashSidebar /> */}
      {/* <NavbarComponent/> */}
      {location.pathname === "/" && <DashboardArea/>}
      
      <Outlet/>
      </div>

      {/* {tab === "profile" && <Profile />}

      {tab === "profile/change-password" && <ProfileChangePassword />}
      {tab === "profile/contactPreference" && <ProfileContactPreference />}

      {tab === "users" && <Users />}

      {tab === "debt" && <Debt />}
      {tab === "debt/create_debt" && <DebtForm />}
      {tab === "users/debts" && <UsersDebts />} */}
      {/* {tab === "debt/payment_debt/:debtId/debt/:paymentId" && <PaymentPage />} */}

      {/* {tab === "dash" && <DashboardArea />} */}
    </div>
  );
};

export default Dashboard;
