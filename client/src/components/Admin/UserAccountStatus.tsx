
import { User } from '../../lib/types';
import { FaCheck } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';


const UserAccountStatus = ({ userDetail }: { userDetail: User | null }) => {


  return (
    <div className="shadow-sm">
      <div className="flex  flex-col border rounded-lg gap-4 p-8">
        <h2 className="text-xl font-semibold text-gray-500">Account Status</h2>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="table  ">
            <thead className="bg-slate-50">
              <tr>
                <th>Email</th>
                <th>Password</th>
                <th>Status</th>
                <th>Two Factor Auth</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-slate-500">{userDetail?.email}</td>
                <td>
                  <input
                    type="password"
                    maxLength={6}
                    value={"******"}
                    disabled
                    className="border border-none w-24 text-slate-500"
                  />
                </td>
                <td>
                  <span
                    className={`${
                      userDetail?.verifyAccount
                        ? "bg-emerald-300 text-emerald-600"
                        : "bg-red-300 text-red-600"
                    } font-semibold  px-6 py-1 text-sm  rounded-full`}
                  >
                    {userDetail?.verifyAccount ? "Verified" : "Unverified"}
                  </span>
                </td>

                <td>
                  <span
                    className={`${
                      userDetail?.isTwoFA
                        ? " text-emerald-600"
                        : " text-red-600"
                    } font-semibold  px-6 py-1 text-sm  rounded-full`}
                  >
                    {" "}
                    {userDetail?.isTwoFA ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  {userDetail?.isAdmin ? (
                    <FaCheck className="text-emerald-500" />
                  ) : (
                    <FaX className="text-rose-600" />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserAccountStatus