import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,

  NavbarToggle,
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
import axios from "axios";
export function NavbarComponent() {
  const { user } = useAppSelector((state: { user: UsersState }) => state?.user);
  const { pathname } = useLocation();

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
        const res = await axios.get(
          `/api/v1/auth/${recieverMessage?.senderId}`
        );
        const data = await res.data;

        if (pathname !== "/chat" && recieverMessage._id !== data._id) {
          dispatch(setInComingMessage([...inComingMessage, recieverMessage]));
        }
      };

      senderUser();
    }
  }, [recieverMessage]);
  


  return (
    <Navbar className="border-b border-slate-300" rounded>
      <NavbarBrand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Personal Debt Tracking
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
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
          <div className="flex items-center gap-2">
            <MessageNotifications />
            <Notifications />
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={user?.user.profilePicture}
                  rounded
                  className="object-cover"
                />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">{user.user.username}</span>
                <span className="block truncate text-sm font-medium">
                  {user.user.email}
                </span>
              </DropdownHeader>
              <DropdownItem>
                <Link to="/dashboard?tab=dash">Dashboard</Link>
              </DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Earnings</DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={handleSignOut}>Sign out</DropdownItem>
            </Dropdown>
          </div>
        )}

        <NavbarToggle />
      </div>
      {/* <NavbarCollapse>
        <Link to="/">Home</Link>
      </NavbarCollapse> */}
    </Navbar>
  );
}
