import { ChangeEvent, FormEvent } from "react";
import { Filter } from "../../../lib/types";
import { useNavigate } from "react-router-dom";

interface FilterProps {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}


const UsersDebtSearch = ({ filter, setFilter }: FilterProps) => {
const navigate = useNavigate()
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };
  
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("lender", filter?.lender);
      urlParams.set("borrower", filter?.borrower);
      urlParams.set("paymentStatus", filter?.paymentStatus);

      const searchQuery = urlParams.toString();
      
      navigate(`/dashboard/users/debts?${searchQuery}`);
      
      console.log(searchQuery, "search")
    };

  return (
    <div className="m-4 bg-slate-50 rounded-lg ">
      <form className="grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-4  p-4 gap-2" onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-gray-500 tracking-wider font-semibold">
              Lender
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter Lender"
            name="lender"
            value={filter?.lender ?? undefined}
            className="input input-bordered input-sm rounded-lg w-full max-w-xs"
            onChange={handleChange}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-gray-500 tracking-wider font-semibold">
              Borrower
            </span>
          </label>
          <input
            type="text"
            name="borrower"
            value={filter?.borrower ?? undefined}
            placeholder="Enter Borrower"
            className="input input-bordered input-sm rounded-lg w-full max-w-xs"
            onChange={handleChange}
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label htmlFor="payment" className="label">
            <span className="label-text text-gray-500 tracking-wider font-semibold">
              Payment Status
            </span>
          </label>
          <select
            value={filter.paymentStatus ?? undefined}
            name="paymentStatus"
            className="select select-bordered select-sm text-xs"
            onChange={handleChange}
          >
            <option disabled>Pick one</option>
            <option>Unpaid</option>
            <option>Partially Paid</option>
            <option>Paid</option>
          </select>
        </div>

        <div className="flex gap-2 mt-9 ">
          <button
            className="btn btn-sm w-24 bg-blue-600 rounded-lg  hover:bg-blue-700  text-gray-50  
          "
          >
            Filter
          </button>
          <button className="w-24 bg-rose-500 hover:bg-rose-600 duration-150  ease-linear btn btn-sm text-gray-50 rounded-lg">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsersDebtSearch;
