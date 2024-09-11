import { FaUsers } from "react-icons/fa";
import { FcDebt } from "react-icons/fc";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { PiInvoiceBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signOut } from "../redux/dataFetch";
import { IoCreate } from "react-icons/io5";

const Sidebar = () => {
  // const [activeLink, setActiveLink] = useState(0);

  // const handleLinkClick = (index: number) => {
  //   setActiveLink(index);
  // };

  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const SIDEBAR_LINKS = [
    { id: 1, path: "/", name: "Dashboard", icon: MdOutlineSpaceDashboard },
    { id: 2, path: "profile", name: "Profile", icon: HiUser },
    { id: 3, path: "/users", name:`${user?.user?.isAdmin ? "Users":"Admins"}`, icon: FaUsers },
    { id: 4, path: "/allUsers/debts", name: "All Debts", icon: PiInvoiceBold },
    { id: 5, path: "/debts", name: "Debts", icon: FcDebt },
    { id: 5, path: "/create_debt", name: "Create Debt", icon: IoCreate },
  ];

  const handleSignOut = async () => {
    if (user && user?.user) {
      dispatch(signOut({ id: user?.user._id }));
    }
  };

  return (
    <div className="w-16 md:w-56  fixed z-10 md:z-0  h-screen border-r pt-9  bg-[#ffffff]">
      {/* Navigation Links */}
      <ul className="mt-12 space-y-6 px-4">
        {SIDEBAR_LINKS.map((link, index) => (
          <li
            key={index}
            // className={`font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${
            //   activeLink === index ? "bg-indigo-100 text-indigo-500" : ""
            // }`}
          >
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `flex justify-center md:justify-start items-center md:space-x-5 font-medium rounded-md py-2 px-5  hover:bg-gray-100  hover:duration-100 ease-in hover:text-indigo-500 ${
                  isActive ? "bg-indigo-100 text-indigo-500" : ""
                }`
              }
            >
              <span>{<link.icon />}</span>
              <span className="text-sm text-gray-500 hidden md:flex">
                {link.name}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
      {/* Navigation Links */}

      <div className="w-full absolute bottom-5 space-y-3 left-0 px-4 py-2 cursor-pointer text-center">
        <button
          className="flex items-center justify-center space-x-2 text-xs text-white py-2 px-5 w-full bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full hover:opacity-80"
          onClick={handleSignOut}
        >
          <span>
            <HiArrowSmRight size={18} />
          </span>
          <span className="hidden md:flex "> Sign Out</span>
        </button>
        <p className="flex items-center justify-center  space-x-2 text-xs text-white py-2 px-5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full">
          {" "}
          <span>?</span> <span className="hidden md:flex">Need Help</span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
