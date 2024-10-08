import React from 'react'

const oldNavbar = () => {
  return (

  )import {
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

import api from "../../utils/api";
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
    <Navbar
      className="border-b shadow-none w-full mb-12 z-20 flex  left-0 top-0 fixed border-slate-300 bg-black"
      
    >
      <NavbarBrand href="https://flowbite-react.com">
        <span className="self-center  text-xl font-semibold ">
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
          <div
            className={`${
              pathname !== "/twoFactorAuth" ? "flex" : "hidden"
            }  items-center gap-2`}
          >
            <MessageNotifications />
            <Notifications />
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"import {
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

import api from "../../utils/api";
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
    <div className=" navbar bg-base-100  z-10 md:z-20 p-2 ps-8  flex left-0 top-0 fixed border-b  border-slate-300">

        <div className="flex-1">
          <span className="self-center  text-xl font-semibold ">
            Personal Debt Tracking
          </span>
        </div>
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
            <div
              className={`${
                pathname !== "/twoFactorAuth" ? "flex" : "hidden"
              }  items-center gap-2`}
            >
              <MessageNotifications />
              <Notifications />
              <div className="flex-none">
                <div className="dropdown dropdown-end ">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content border border-slate-200 bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <Link to="/profile" className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </Link>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                     <button onClick={handleSignOut}>Logout</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

  );
}

                  img={user?.user.profilePicture}
                  rounded
                  className="object-cover"
                />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">{user?.user.username}</span>
                <span className="block truncate text-sm font-medium">
                  {user?.user.email}
                </span>
              </DropdownHeader>
              <DropdownItem>
                <Link to="/">Dashboard</Link>
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

}

export default oldNavbar