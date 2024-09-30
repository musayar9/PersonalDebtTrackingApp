import React from 'react'

const NavbarEdit = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>

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
            className="menu menu-sm border dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li className="flex item-center flex-col">
              <span>{user?.user.username}</span>
              <span>{user?.user.email}</span>
            </li>

            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <a className="justify-between">Profile</a>
            </li>

            <li>
              <button onClick={handleSignOut}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavbarEdit

            <Dropdown
            
              className={`${
                theme === "light" || "bg-base-200 border-none"
              } rounded-xl`}
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={user?.user.profilePicture}
                  rounded
                  className="object-cover "
                />
              }
            >
              <DropdownHeader>
                <span
                  className={`block text-sm ${
                    theme === "light" || "text-white"
                  }`}
                >
                  {user?.user.username}
                </span>
                <span
                  className={`block truncate text-sm font-medium  ${
                    theme === "light" || "text-white"
                  }`}
                >
                  {user?.user.email}
                </span>
              </DropdownHeader>
              <DropdownItem className={`${theme === "light" || "text-white hover:bg-base-300"}`}>
                <Link to="/">Dashboard</Link>
              </DropdownItem>
              <DropdownItem className={`${theme === "light" || "text-white"}`}>
                <Link to="Profile">Profile</Link>
              </DropdownItem>

              <DropdownDivider />
              <DropdownItem className={`${theme==="light" || "text-white"}`} onClick={handleSignOut}>Sign out</DropdownItem>
            </Dropdown>