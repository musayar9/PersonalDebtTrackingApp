import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { FcDebt } from "react-icons/fc";
import {
  HiArrowSmRight,

  HiUser,

} from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signOut } from "../redux/dataFetch";

const DashSidebar = () => {
  const { user } = useAppSelector((state) => state.user);

  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useAppDispatch();
  const handleSignOut = async () => {
    if (user && user?.user) {
    
      dispatch(signOut({ id: user.user._id }));
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-2">
          <Link to="/dashboard?tab=dash">
            <Sidebar.Item
              active={tab === "dash" || !tab}
              icon={MdOutlineSpaceDashboard}
              as="div"
            >
              Dashboard
            </Sidebar.Item>{" "}
          </Link>

          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
              as="div"
              labelColor="dark"
            >
              Profile
            </Sidebar.Item>{" "}
          </Link>

          <Link to="/dashboard?tab=users">
            <Sidebar.Item
                active={tab === "users"}
                icon={FaUsers}
                label={"Admin"}
                as="div"
                labelColor="dark"
            >
              Users
            </Sidebar.Item>{" "}
          </Link>


          <Link to="/dashboard?tab=debt">
            <Sidebar.Item
              active={tab === "debt"}
              icon={FcDebt}
              as="div"
              labelColor="dark"
            >
              Debt
            </Sidebar.Item>{" "}
          </Link>
          
          
          <Sidebar.Item
            icon={HiArrowSmRight}
            as="div"
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Sign-Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
