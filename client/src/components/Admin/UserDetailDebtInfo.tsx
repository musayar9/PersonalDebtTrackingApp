
import { FaX } from 'react-icons/fa6';
import { User } from '../../lib/types';
import { FaCheck } from 'react-icons/fa';

const UserDetailDebtInfo = ({userDetail}:{userDetail:User | null}) => {


  return (
    <div className="md:col-span-7 ">
      <div className="shadow-sm">
        <div className="flex items-start flex-col border rounded-lg gap-4 p-8">
          <h2 className="text-xl font-semibold text-gray-500">
            Account Status
          </h2>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="table  w-[40vw] md:w-[50vw] ">
              <thead className="bg-slate-50">
                <tr>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Status</th>
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
                      className="border border-none w-24 text-slate-400"
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
                      {userDetail ? "verified" : "unverified"}
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
          
          
          <div className='overflow-x-auto'>
          
          
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailDebtInfo