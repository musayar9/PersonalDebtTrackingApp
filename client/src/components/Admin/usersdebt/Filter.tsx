const UsersDebtSearch = () => {
  return (
    <div className="m-4 bg-slate-50 rounded-lg ">
      <form className="grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-4  p-4 gap-2">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-gray-500 tracking-wider font-semibold">
              Lender
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter Lender"
            className="input input-bordered input-sm rounded-lg w-full max-w-xs"
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
            placeholder="Enter Borrower"
            className="input input-bordered input-sm rounded-lg w-full max-w-xs"
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label htmlFor="payment" className="label">
          
          
            <span className="label-text text-gray-500 tracking-wider font-semibold">
              Payment Status
            </span>
          </label>
          <select name="payment" className="select select-bordered select-sm text-xs">
            {/* <option disabled selected>
              Pick one
            </option> */}
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
