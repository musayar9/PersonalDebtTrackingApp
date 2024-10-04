import {

  Navbar,
  NavbarBrand,
} from "flowbite-react";
import { CiUser } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Notifications from "./Notifications";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { signOut } from "../../redux/dataFetch";
import { UsersState } from "../../lib/types";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import {
  addMessage,
  setDeleteInComingMessage,
  setInComingMessage,
  deleteMessage,
} from "../../redux/messageSlice";
import MessageNotifications from "./MessageNotifications";

import api from "../../utils/api";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { toggleTheme } from "../../redux/themeSlice";
export function NavbarComponent() {
  const { user } = useAppSelector((state: { user: UsersState }) => state?.user);
  const { pathname } = useLocation();
  const { theme } = useAppSelector((state) => state.theme);
  console.log(theme);
  const { recieverMessage, inComingMessage } = useAppSelector(
    (state) => state?.message
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const handleSignOut = async () => {
    const userId = user?.user?._id;

    if (user && userId) {
      await dispatch(signOut({ id: userId }));
      dispatch(setDeleteInComingMessage([]));
      dispatch(deleteMessage(null));

      navigate("/login");
    }
  };

  const socket = useRef<Socket | null>(null);
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current?.on("recieve-message", (data) => {
      dispatch(addMessage(data));
    });
  }, []);

  useEffect(() => {
    if (recieverMessage) {
      const senderUser = async () => {
        const res = await api.get(`/v1/auth/${recieverMessage?.senderId}`);
        const data = await res.data;

        if (pathname !== "/chat" && recieverMessage._id !== data._id) {
          dispatch(setInComingMessage([...inComingMessage, recieverMessage]));
        }
      };

      senderUser();
    }
  }, [recieverMessage]);

  return (
    <Navbar className="navbar bg-base-100 border-b shadow-none w-full mb-12 z-20 flex  left-0 top-0 fixed border-slate-300  ">
      <NavbarBrand>
        <span className="self-center  text-xl font-semibold ">
          Personal Debt Tracking
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
              <div className="flex items-center justify-center mr-2">
              {/* this hidden checkbox controls the state */}

              <button
                type="button"
                className="transform  duration-150 ease-in"
                // defaultChecked={isDarkTheme}
                onClick={() => dispatch(toggleTheme())}
              >
                {theme === "light" ? <BsSunFill /> : <BsMoonFill />}
              </button>
            </div>
        {!user?.user ? (
        
          <div className="dropdown dropdown-hover  group">
            <div
              tabIndex={0}
              className="hover:text-emerald-500 font-semibold group  group-hover:text-emerald-500 flex items-center justify-center gap-2"
            >
              <CiUser size={24} />
              <span>Login / Register</span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 w-44  rounded-md z-[1]  p-2 shadow-md gap-2"
            >
              <li>
                <Link
                  to="/login"
                  className=" px-4 py-2  border  flex items-center justify-center rounded-md border-slate-300 hover:border-white hover:text-slate-50 hover:bg-emerald-400 "
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="px-4 py-2 border rounded-md border-slate-300 flex items-center justify-center  hover:border-white hover:text-slate-50 hover:bg-emerald-400 "
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <div
              className={`${
                pathname !== "/twoFactorAuth" ? "flex" : "hidden"
              }  items-center gap-2`}
            >

              <MessageNotifications />
              <Notifications />

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="User Settings" src={user?.user.profilePicture} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm border dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2"
                >
                  <li className="flex item-center flex-col  border-b ">
                    <span>{user?.user.username}</span>
                    <span>{user?.user.email}</span>
                  </li>

                  <li>
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="profile" className="justify-between">
                      Profile
                    </Link>
                  </li>

                  <li>
                    <button onClick={handleSignOut}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
      {/* <NavbarCollapse>
        <Link to="/">Home</Link>
      </NavbarCollapse> */}
    </Navbar>
  );
}
