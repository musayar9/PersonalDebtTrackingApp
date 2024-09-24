
import { Outlet, useLocation } from "react-router-dom";
import DashboardArea from "../components/dashboard/DashboardArea";
import Sidebar from "../components/Sidebar.tsx";


const Dashboard = () => {
  const location = useLocation();


  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full ml-16 md:ml-56 mt-14">
      {location.pathname === "/" && <DashboardArea/>}
      <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;
