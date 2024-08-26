
import { Link } from "react-router-dom";

const ProfileBreadcrumps = () => {
  return (
    <div>
      <div className="border-b border-base-300 pb-5">
        <h2 className="text-3xl font-medium tracking-wider capitalize text-slate-500">
          User Information
        </h2>
      </div>
      <div className="breadcrumbs text-md font-bold  my-4 ">
        <ul>
          <li>
            <Link to="/profile">User Information</Link>
          </li>
          <li>
            <Link to="/profile/change-password">
              Change Password
            </Link>
          </li>
          <li>
            <Link to="/profile/contactPreference">
              Contact Preferences
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileBreadcrumps;
