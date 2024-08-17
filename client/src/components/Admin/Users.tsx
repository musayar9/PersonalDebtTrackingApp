import axios from "axios";
import { useGetAllUsers } from "../../utils/customHooks.ts";
import { calculateAge } from "../../utils/functions.ts";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import Loading from "../../pages/Loading.tsx";
import ErrorMessage from "../../pages/ErrorMessage.tsx";
import AlertMessage from "../AlertMessage.tsx";
import { MdErrorOutline } from "react-icons/md";
import { IoFileTraySharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export const Users = () => {
  const { allUsers, setAllUsers, loading, error } = useGetAllUsers();
  const [errMsg, setErrMsg] = useState("");

  const handleDeleteUser = async ({ id }: { id: string | undefined }) => {
    try {
      const res = await axios.delete(`/api/v1/auth/${id}`);
      const data = await res.data;
      const deleteUser = allUsers.filter((d) => d._id !== id);
      setAllUsers(deleteUser);

return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrMsg(error.response?.data.msg);
      } else {
        setErrMsg("Request Failed");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center mx-auto">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  
  
  
  return (
    <div className="w-full p-8">
      <>
        {allUsers?.length > 0 ? (
          <>
             
          
            <div className="border-b border-slate-400 m-4">
              <h2 className="text-2xl text-gray-600 font-semibold my-2">Users</h2>
            </div>
            <div className="mx-auto max-w-6xl ">
              <div className="overflow-x-auto ">
                <table className="table table-sm">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Profile P.</th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Age</th>
                      <th>Admin</th>
                      <th>Delete</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers?.map((item, index) => (
                      <tr
                        key={item._id}
                        className="text-gray-700 font-semibold text-sm"
                      >
                        <th>{index + 1}</th>
                        <td>
                          <img
                            className={"w-8 h-8 rounded-full object-contain"}
                            src={item?.profilePicture}
                            alt={item.username}
                          />
                        </td>
                        <td className="">
                          {item?.name} {item.surname}
                        </td>
                        <td>{item?.username}</td>
                        <td>{item.email}</td>
                        <td>{calculateAge(item?.birthdate)}</td>
                        <td>
                          {item?.isAdmin ? (
                            <FaCheck className="text-emerald-500" />
                          ) : (
                            <FaX className="text-rose-600" />
                          )}
                        </td>
                        <td>
                          <button
                            disabled={item?.isAdmin}
                            onClick={() => handleDeleteUser({ id: item?._id })}
                            className={`${
                              item?.isAdmin
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            } btn btn-xs    rounded-md text-rose-500 text-center m-4 cursor-pointer hover:text-rose-600 duration-150 ease-linear`}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                        <Link className=" text-emerald-500" to={`/dashboard/user_detail/${item?._id}`}>Detail</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {errMsg && (
                  <AlertMessage
                    message={errMsg}
                    color="bg-rose-500"
                    icon={<MdErrorOutline size={28} />}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          <div>
            <div className="flex items-center justify-center flex-col mx-auto -mt-28 ">
              <IoFileTraySharp size={96} />
              <p className="text-xl text-gray-400 font-semibold">
                You have no registered user
              </p>

            
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Users;
