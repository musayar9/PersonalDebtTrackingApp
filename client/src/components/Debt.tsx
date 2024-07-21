import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllDebt } from "../redux/debtFetch";
import { Link } from "react-router-dom";

const Debt = () => {
  const { debt } = useAppSelector((state) => state.debt);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllDebt());
  }, []);

  console.log(debt);

  return (
    <div className="w-full p-8">
      <div className="bg-[#f3f4f6] p-4 rounded-md shadow-sm flex items-center  justify-between">
        <h2 className="font-semibold text-2xl tracking-wider pl-4 text-slate-600">
          Debt Tracking Tables
        </h2>
        <Link
          className="bg-slate-200 hover:bg-slate-300 hover:text-gray-900 duration-150 ease-linear px-4 py-3 rounded-lg font-semibold text-gray-700"
          to="/create-debt"
        >
          Create Debt
        </Link>
      </div>
    </div>
  );
};

export default Debt;
